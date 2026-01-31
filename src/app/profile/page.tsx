"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (!isPending) {
            setIsCheckingAuth(false);
            if (!session) {
                router.push("/login?redirect=/profile");
            }
        }
    }, [session, isPending, router]);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // Redirect to login after sign out
                },
            },
        });
    };

    if (isPending || isCheckingAuth) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 space-y-8 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Account Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences and security.</p>
                </div>
                <div className="flex flex-col items-center gap-3">

                    <Button variant="destructive" size="sm" onClick={handleSignOut} className="gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <ProfileForm />
                </section>

                <Separator className="lg:hidden" />

                <section>
                    <h2 className="text-xl font-semibold mb-4">Security</h2>
                    <ChangePasswordForm />
                </section>
            </div>
        </div>
    );
}
