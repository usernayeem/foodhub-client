"use client";

import { useEffect, useState } from "react";
import { AdminService } from "@/services/api";
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
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

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

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            // Fetching a larger limit to showcase internal pagination if needed, 
            // or we can rely on server-side pagination by passing page.
            const response = await AdminService.getAllUsers(1, 100); 
            setUsers(response.data);
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

    const columns = [
        {
            header: "User",
            accessorKey: "name",
            render: (row: User) => (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{row.name}</span>
                </div>
            )
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Role",
            accessorKey: "role",
            render: (row: User) => {
                const colors: Record<string, string> = {
                    ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
                    PROVIDER: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                    CUSTOMER: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                };
                return (
                    <Badge className={colors[row.role] || "bg-gray-100 text-gray-800"}>
                        {row.role}
                    </Badge>
                );
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            render: (row: User) => (
                <Badge variant={row.status === "ACTIVE" ? "success" : "destructive"}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: "Joined",
            accessorKey: "createdAt",
            render: (row: User) => new Date(row.createdAt).toLocaleDateString()
        },
        {
            header: "Actions",
            accessorKey: "id",
            render: (row: User) => (
                <Select
                    value={row.status}
                    onValueChange={(value) => handleStatusChange(row.id, value)}
                >
                    <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    </SelectContent>
                </Select>
            )
        }
    ];

    const stats = [
        {
            title: "Total Users",
            value: users.length,
            icon: UserIcon,
        },
        {
            title: "Active Users",
            value: users.filter(u => u.status === "ACTIVE").length,
            icon: Shield,
        },
        {
            title: "Providers",
            value: users.filter(u => u.role === "PROVIDER").length,
            icon: UserIcon,
        },
        {
            title: "Customers",
            value: users.filter(u => u.role === "CUSTOMER").length,
            icon: UserIcon,
        }
    ];

    if (isLoading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading users data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    Users Management
                </h1>
                <p className="text-muted-foreground">Manage system users and their access levels.</p>
            </div>

            <DashboardOverview stats={stats} />

            <DashboardTable 
                title="System Users" 
                data={users} 
                columns={columns} 
                searchKey="name"
                pageSize={10}
            />
        </div>
    );
}
