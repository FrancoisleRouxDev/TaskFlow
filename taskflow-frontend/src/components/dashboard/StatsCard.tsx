import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-primary",
}: StatsCardProps) {
  return (
    <Card className="border-border-subtle bg-surface-2 shadow-xs transition-all duration-150 hover:border-border-strong hover:bg-surface-3">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {value}
          </h2>

          <p className="mt-1 text-xs text-text-tertiary">
            {subtitle}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-surface-3">
          <Icon className={`h-4.5 w-4.5 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
}