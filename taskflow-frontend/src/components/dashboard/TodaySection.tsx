import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import { Calendar } from "lucide-react";

interface TodaySectionProps {
    tasks: Task[];
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

export default function TodaySection({
    tasks,
    updateTask,
    deleteTask,
}: TodaySectionProps) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Filter tasks due today
    const todaysTasks = tasks.filter(
        (task) => task.dueDate && task.dueDate.startsWith(today)
    );

    // Sort by priority (High > Medium > Low > Critical comes last for visual grouping)
    const priorityOrder = { High: 0, Medium: 1, Low: 2, Critical: 3 };
    const sortedTasks = [...todaysTasks].sort(
        (a, b) =>
            (priorityOrder[a.priority] ?? 999) - (priorityOrder[b.priority] ?? 999)
    );

    return (
        <section className="mt-8">
            <div className="mb-5 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-foreground">
                    Today
                </h2>
                {sortedTasks.length > 0 && (
                    <span className="ml-auto text-sm text-text-tertiary">
                        {sortedTasks.length}{" "}
                        {sortedTasks.length === 1 ? "task" : "tasks"}
                    </span>
                )}
            </div>

            {sortedTasks.length > 0 ? (
                <div className="space-y-2">
                    {sortedTasks.map((task, index) => (
                        <TodayTaskCard
                            key={task.id}
                            task={task}
                            index={index}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </div>
            ) : (
                <Card className="border-dashed border-border-subtle bg-surface-2 p-6 text-center">
                    <p className="text-sm text-text-tertiary">
                        No tasks scheduled for today
                    </p>
                </Card>
            )}
        </section>
    );
}

interface TodayTaskCardProps {
    task: Task;
    index: number;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

/**
 * Compact task card for Today section
 * Displays: completion checkbox, title, priority, time (if available)
 */
function TodayTaskCard({
    task,
    updateTask,
}: TodayTaskCardProps) {
    const isCompleted = task.status === "Done";

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical":
                return "bg-red-500/20 text-red-300";
            case "High":
                return "bg-orange-500/20 text-orange-300";
            case "Medium":
                return "bg-yellow-500/20 text-yellow-300";
            case "Low":
                return "bg-slate-500/20 text-slate-300";
            default:
                return "bg-slate-500/20 text-slate-300";
        }
    };

    return (
        <Card className="flex items-start gap-3 border-border-subtle bg-surface-2 p-3 transition-colors hover:bg-surface-3">
            {/* Completion Checkbox */}
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => {
                    updateTask({
                        ...task,
                        status: e.target.checked ? "Done" : "To Do",
                    });
                }}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-border-strong accent-primary"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p
                    className={`text-sm font-medium leading-tight ${
                        isCompleted
                            ? "line-through text-text-tertiary"
                            : "text-text-primary"
                    }`}
                >
                    {task.title}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {/* Priority Badge */}
                    <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${getPriorityColor(
                            task.priority
                        )}`}
                    >
                        {task.priority}
                    </span>

                    {/* Category Badge */}
                    {task.project && (
                        <span className="rounded-md bg-surface-3 px-2 py-1 text-xs text-text-secondary">
                            {task.project}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
}
