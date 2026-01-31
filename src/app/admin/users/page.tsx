"use client";

import { useEffect, useState } from "react";
import { AdminService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PaginationControls } from "@/components/ui/PaginationControls";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadUsers();
    }, [page]);

    const loadUsers = async () => {
        try {
            const response = await AdminService.getAllUsers(page, 10);
            setUsers(response.data);
            setTotalPages(response.meta?.totalPages || 1);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load users",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (userId: string, newStatus: string) => {
        try {
            await AdminService.updateUserStatus(userId, newStatus);
            toast({ title: "Success", description: "User status updated successfully" });
            loadUsers();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user status",
                variant: "destructive",
            });
        }
    };

    const getRoleBadge = (role: string) => {
        const colors: Record<string, string> = {
            ADMIN: "bg-purple-100 text-purple-800",
            PROVIDER: "bg-blue-100 text-blue-800",
            CUSTOMER: "bg-green-100 text-green-800",
        };
        return (
            <Badge className={colors[role] || "bg-gray-100 text-gray-800"}>
                {role}
            </Badge>
        );
    };

    const getStatusBadge = (status: string) => {
        return status === "ACTIVE" ? (
            <Badge className="bg-green-100 text-green-800">Active</Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800">Suspended</Badge>
        );
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
                <p className="text-muted-foreground">Manage system users and their access.</p>
            </div>

            <div className="rounded-md border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Joined</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Select
                                            value={user.status}
                                            onValueChange={(value) => handleStatusChange(user.id, value)}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ACTIVE">Active</SelectItem>
                                                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {users.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No users found.</p>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Total Users</div>
                    <div className="text-2xl font-bold">{users.length}</div>
                </div>
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <div className="text-2xl font-bold">
                        {users.filter(u => u.status === "ACTIVE").length}
                    </div>
                </div>
                <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Providers</div>
                    <div className="text-2xl font-bold">
                        {users.filter(u => u.role === "PROVIDER").length}
                    </div>
                </div>
            </div>
        </div>
    );
}
