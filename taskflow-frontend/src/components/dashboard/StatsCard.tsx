import { Card, CardContent } from "../ui/card";
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
  iconColor = "text-indigo-400",
}: StatsCardProps) {
  return (
    <Card className="bg-surface-2 border-border-subtle shadow-none">
      <CardContent className="flex justify-between p-6">
        <div>
          <p className="text-sm text-text-secondary">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-foreground">
            {value}
          </h2>

          <p className="mt-2 text-sm text-text-tertiary">
            {subtitle}
          </p>
        </div>

        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardContent>
    </Card>
  );
}