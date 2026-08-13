import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { Event } from "@/types/task";

interface EventCardProps {
    event: Event;
}

/**
 * Event card component for displaying events on the dashboard
 * Events are distinct from tasks: they represent "what is happening"
 * rather than "what needs to be done"
 */
export default function EventCard({ event }: EventCardProps) {
    const getCategoryColor = (category?: string) => {
        switch (category?.toLowerCase()) {
            case "work":
                return "bg-blue-500/20 text-blue-300";
            case "personal":
                return "bg-emerald-500/20 text-emerald-300";
            case "health":
                return "bg-rose-500/20 text-rose-300";
            case "social":
                return "bg-purple-500/20 text-purple-300";
            default:
                return "bg-slate-500/20 text-slate-300";
        }
    };

    return (
        <Card className="border border-border-subtle bg-gradient-to-br from-surface-2 to-surface-3 p-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                    {event.name}
                </h3>
            </div>

            {/* Category Badge */}
            {event.category && (
                <div className="mt-2">
                    <span
                        className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${getCategoryColor(
                            event.category
                        )}`}
                    >
                        {event.category}
                    </span>
                </div>
            )}

            {/* Time and Location Info */}
            <div className="mt-3 space-y-1">
                {event.time && (
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.time}</span>
                    </div>
                )}

                {event.description && (
                    <p className="text-xs text-text-tertiary line-clamp-2">
                        {event.description}
                    </p>
                )}
            </div>

            {/* Date Footer */}
            <div className="mt-3 pt-2 border-t border-border-subtle">
                <p className="text-xs text-text-tertiary">
                    {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        weekday: "short",
                    })}
                </p>
            </div>
        </Card>
    );
}
