import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import { ArrowRight } from "lucide-react";
import { PRIORITY_STYLES } from "./PriorityBadge";

interface UpcomingSectionProps {
    tasks: Task[];
}

export default function UpcomingSection({ tasks }: UpcomingSectionProps) {
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

    const priorityOrder: Record<Task["priority"], number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...upcomingTasks].sort((a, b) => {
        const dateCompare = a.dueDate.localeCompare(b.dueDate);
        if (dateCompare !== 0) return dateCompare;
        return (priorityOrder[a.priority] ?? 999) - (priorityOrder[b.priority] ?? 999);
    });

    const displayTasks = sortedTasks.slice(0, 10);

    return (
        <section className="mt-8">
            <div className="mb-4 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-text-tertiary" />
                <h2 className="text-base font-semibold text-foreground">
                    Upcoming
                </h2>
                {sortedTasks.length > 0 && (
                    <span className="ml-auto text-xs font-medium text-text-tertiary">
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
                            <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                View all {sortedTasks.length} upcoming →
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Card className="border-dashed border-border-subtle bg-surface-2 p-6 text-center shadow-none">
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
            return `In ${daysUntil} days`;
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const priorityDotClass = PRIORITY_STYLES[task.priority]?.dot || PRIORITY_STYLES.Low.dot;

    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-2 px-3.5 py-2.5 shadow-xs transition-all duration-150 hover:border-border-strong hover:bg-surface-3">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                    {task.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
                    {task.project && (
                        <span className="rounded-md bg-surface-3 px-1.5 py-0.5 border border-border-subtle">
                            {task.project}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2.5">
                <div className={`h-2 w-2 rounded-full ${priorityDotClass}`} />
                <span className="text-xs text-text-tertiary whitespace-nowrap font-medium">
                    {formatDate(task.dueDate)}
                </span>
            </div>
        </div>
    );
}