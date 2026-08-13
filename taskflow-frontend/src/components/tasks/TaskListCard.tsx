import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import PriorityBadge from "@/components/dashboard/PriorityBadge";
import EditTaskDialog from "@/components/dashboard/EditTaskDialog";

interface TaskListCardProps {
    task: Task;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

export default function TaskListCard({
    task,
    updateTask,
    deleteTask,
}: TaskListCardProps) {
    const [editOpen, setEditOpen] = useState(false);
    const isCompleted = task.status === "Done";

    const formatDueDate = (dateString: string) => {
        if (!dateString) return null;

        const date = new Date(dateString);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const taskDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diffDays = Math.round(
            (taskDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays < 0) {
            return {
                label: diffDays === -1 ? "Yesterday" : `${Math.abs(diffDays)}d overdue`,
                className: "text-destructive",
            };
        }
        if (diffDays === 0) {
            return { label: "Today", className: "text-primary" };
        }
        if (diffDays === 1) {
            return { label: "Tomorrow", className: "text-text-secondary" };
        }
        if (diffDays <= 7) {
            return { label: `In ${diffDays} days`, className: "text-text-secondary" };
        }
        return {
            label: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            className: "text-text-tertiary",
        };
    };

    const dueInfo = task.dueDate ? formatDueDate(task.dueDate) : null;

    return (
        <>
            <Card
                className="group flex items-start gap-3.5 border-border-subtle bg-surface-2 p-3.5 shadow-xs cursor-pointer transition-all duration-150 hover:border-border-strong hover:bg-surface-3"
                onClick={() => setEditOpen(true)}
            >
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => {
                        e.stopPropagation();
                        updateTask({
                            ...task,
                            status: e.target.checked ? "Done" : "To Do",
                        });
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border-strong accent-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/40"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3">
                        <p
                            className={`text-sm font-medium leading-snug ${
                                isCompleted
                                    ? "line-through text-text-tertiary"
                                    : "text-text-primary"
                            }`}
                        >
                            {task.title}
                        </p>

                        {dueInfo && (
                            <span
                                className={`shrink-0 text-xs font-medium whitespace-nowrap ${
                                    isCompleted
                                        ? "text-text-tertiary"
                                        : dueInfo.className
                                }`}
                            >
                                {dueInfo.label}
                            </span>
                        )}
                    </div>

                    {/* Description preview */}
                    {task.description && (
                        <p
                            className={`mt-1 text-xs leading-relaxed truncate ${
                                isCompleted
                                    ? "text-text-tertiary"
                                    : "text-text-secondary"
                            }`}
                        >
                            {task.description}
                        </p>
                    )}

                    {/* Metadata row */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <PriorityBadge priority={task.priority} />

                        {task.project && (
                            <span className="rounded-md border border-border-subtle bg-surface-3 px-2 py-0.5 text-xs text-text-secondary">
                                {task.project}
                            </span>
                        )}
                    </div>
                </div>
            </Card>

            <EditTaskDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        </>
    );
}