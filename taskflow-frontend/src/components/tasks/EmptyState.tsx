import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-surface-3">
                <Icon className="h-5 w-5 text-text-tertiary" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-foreground">
                {title}
            </h3>

            <p className="mt-1.5 max-w-sm text-sm text-text-secondary leading-relaxed">
                {description}
            </p>

            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    className="mt-5"
                    size="sm"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}