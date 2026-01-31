"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2, Pencil } from "lucide-react";
import { UserService } from "@/services/api";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().optional(), // Read-only
  role: z.string().optional(), // Read-only
  phone: z.string().optional(),
  address: z.string().optional(),
  image: z.string().optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  // Initialize form with session data
  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;
      reset({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        phone: user.phone || "",
        address: user.address || "",
        image: user.image || "",
      });
      if (user.image) setImagePreview(user.image);
    }
  }, [session, reset]);

  // Helper: Convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid File", description: "Select an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      toast({ title: "File Too Large", description: "Max size 1MB.", variant: "destructive" });
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    try {
      const base64 = await convertToBase64(file);
      setValue("image", base64);
    } catch {
      toast({ title: "Error", description: "Image processing failed.", variant: "destructive" });
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue("image", "");
  };

  const onSubmit = async (data: ProfileInput) => {
    setIsLoading(true);
    try {
      // 1. Update Profile Fields (Phone, Address, Name)
      await UserService.updateProfile({
        name: data.name,
        phone: data.phone,
        address: data.address,
      });

      // 2. Update Image if changed (using authClient for avatar as it handles that usually, 
      //    or if UserService handles it too. Assuming authClient.updateUser handles minimal info or name/image)
      //    Actually, we can use authClient for name/image sync and UserService for extended fields.
      //    Let's do both to be safe or rely on custom endpoint if it handles all.
      //    Based on backend controller, it calls `prisma.user.update` with `req.body`.
      //    So strictly calling UserService might be enough for all fields if the backend supports it.
      //    Let's stick to UserService for extended fields and user updates.

      // Also update name/image via authClient to keep session in sync immediately if possible
      await authClient.updateUser({
        name: data.name,
        image: data.image
      });

      toast({ title: "Profile Updated", description: "Your details have been saved." });
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Update failed.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSessionLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          /* EDIT MODE */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {imagePreview ? (
                  <img src={imagePreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover border" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No Img</span>
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-3 w-3" />
                </Button>
                <label htmlFor="upload-avatar" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full cursor-pointer hover:bg-primary/90">
                  <Upload className="w-4 h-4" />
                  <input id="upload-avatar" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...register("email")} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input {...register("role")} disabled className="bg-muted capitalize" />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input {...register("phone")} />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label>Address</Label>
                <Input {...register("address")} />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          /* VIEW MODE */
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name} className="w-24 h-24 rounded-full object-cover border" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <h3 className="mt-4 text-xl font-semibold">{session?.user?.name}</h3>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <div>
                <Label className="text-muted-foreground">Role</Label>
                <p className="font-medium capitalize">{(session?.user as any)?.role || "N/A"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Phone Number</Label>
                <p className="font-medium">{(session?.user as any)?.phone || "N/A"}</p>
              </div>

              <div className="md:col-span-2">
                <Label className="text-muted-foreground">Address</Label>
                <p className="font-medium">{(session?.user as any)?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
