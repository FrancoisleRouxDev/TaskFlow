import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import { Calendar } from "lucide-react";
import PriorityBadge from "./PriorityBadge";

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
    const today = new Date().toISOString().split("T")[0];

    const todaysTasks = tasks.filter(
        (task) => task.dueDate && task.dueDate.startsWith(today)
    );

    const priorityOrder: Record<Task["priority"], number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...todaysTasks].sort(
        (a, b) =>
            (priorityOrder[a.priority] ?? 999) - (priorityOrder[b.priority] ?? 999)
    );

    return (
        <section className="mt-8">
            <div className="mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-text-tertiary" />
                <h2 className="text-base font-semibold text-foreground">
                    Today's Focus
                </h2>
                {sortedTasks.length > 0 && (
                    <span className="ml-auto text-xs font-medium text-text-tertiary">
                        {sortedTasks.length}{" "}
                        {sortedTasks.length === 1 ? "task" : "tasks"}
                    </span>
                )}
            </div>

            {sortedTasks.length > 0 ? (
                <div className="space-y-2.5">
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
                <Card className="border-dashed border-border-subtle bg-surface-2 p-6 text-center shadow-none">
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

function TodayTaskCard({
    task,
    updateTask,
}: TodayTaskCardProps) {
    const isCompleted = task.status === "Done";

    return (
        <Card className="flex items-start gap-3.5 border-border-subtle bg-surface-2 p-3.5 shadow-xs transition-all duration-150 hover:border-border-strong hover:bg-surface-3">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => {
                    updateTask({
                        ...task,
                        status: e.target.checked ? "Done" : "To Do",
                    });
                }}
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-border-strong accent-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1"
            />

            <div className="flex-1 min-w-0">
                <p
                    className={`text-sm font-medium leading-snug ${
                        isCompleted
                            ? "line-through text-text-tertiary"
                            : "text-text-primary"
                    }`}
                >
                    {task.title}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <PriorityBadge priority={task.priority} />

                    {task.project && (
                        <span className="rounded-md bg-surface-3 px-2 py-0.5 text-xs text-text-secondary border border-border-subtle">
                            {task.project}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
}