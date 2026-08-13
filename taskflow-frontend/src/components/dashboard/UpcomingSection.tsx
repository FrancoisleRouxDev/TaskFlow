import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import { ArrowRight } from "lucide-react";

interface UpcomingSectionProps {
    tasks: Task[];
}

export default function UpcomingSection({ tasks }: UpcomingSectionProps) {
    // Get date range: tomorrow to 14 days from now
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

    const upcomingTasks = tasks.filter((task) => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return taskDate >= tomorrow && taskDate <= twoWeeksLater;
    });

    // Sort by due date, then by priority
    const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...upcomingTasks].sort((a, b) => {
        const dateCompare = a.dueDate.localeCompare(b.dueDate);
        if (dateCompare !== 0) return dateCompare;
        return (priorityOrder[a.priority] ?? 999) - (priorityOrder[b.priority] ?? 999);
    });

    // Limit to 10 items to avoid overwhelming
    const displayTasks = sortedTasks.slice(0, 10);

    return (
        <section className="mt-8">
            <div className="mb-5 flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-foreground">
                    Upcoming
                </h2>
                {sortedTasks.length > 0 && (
                    <span className="ml-auto text-sm text-text-tertiary">
                        {sortedTasks.length}{" "}
                        {sortedTasks.length === 1 ? "task" : "tasks"}
                    </span>
                )}
            </div>

            {displayTasks.length > 0 ? (
                <div>
                    <div className="space-y-2">
                        {displayTasks.map((task) => (
                            <UpcomingTaskItem key={task.id} task={task} />
                        ))}
                    </div>

                    {sortedTasks.length > 10 && (
                        <div className="mt-4 text-center">
                            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                View all {sortedTasks.length} upcoming →
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Card className="border-dashed border-border-subtle bg-surface-2 p-6 text-center">
                    <p className="text-sm text-text-tertiary">
                        No tasks scheduled for the next two weeks
                    </p>
                </Card>
            )}
        </section>
    );
}

interface UpcomingTaskItemProps {
    task: Task;
}

function UpcomingTaskItem({ task }: UpcomingTaskItemProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        }

        const daysUntil = Math.ceil(
            (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysUntil <= 7) {
            return `${daysUntil} days`;
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical":
                return "text-red-400";
            case "High":
                return "text-orange-400";
            case "Medium":
                return "text-yellow-400";
            case "Low":
                return "text-slate-400";
            default:
                return "text-slate-400";
        }
    };

    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface-2 px-3 py-2 transition-colors hover:bg-surface-3">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                    {task.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
                    {task.project && (
                        <span className="rounded bg-surface-3 px-1.5 py-0.5">
                            {task.project}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Priority Dot */}
                <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority).replace("text-", "bg-")}`} />

                {/* Due Date */}
                <span className="text-xs text-text-tertiary whitespace-nowrap">
                    {formatDate(task.dueDate)}
                </span>
            </div>
        </div>
    );
}
