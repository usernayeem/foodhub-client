import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface OverviewCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    href?: string;
    trend?: {
        value: string;
        positive: boolean;
    };
}

export function OverviewCard({ title, value, icon: Icon, description, trend, href }: OverviewCardProps) {
    const content = (
        <Card className={`overflow-hidden transition-all border-border/50 bg-card/50 backdrop-blur-sm ${href ? "hover:shadow-lg hover:border-primary/50 cursor-pointer group" : "hover:shadow-md"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-lg transition-colors ${href ? "bg-primary/10 group-hover:bg-primary/20" : "bg-primary/10"}`}>
                    <Icon className="h-4 w-4 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {trend && (
                            <span className={trend.positive ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                                {trend.value}
                            </span>
                        )}
                        {description && ` ${description}`}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}

export function DashboardOverview({ stats }: { stats: OverviewCardProps[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <OverviewCard key={i} {...stat} />
            ))}
        </div>
    );
}
