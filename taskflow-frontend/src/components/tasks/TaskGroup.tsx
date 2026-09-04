import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Task } from "@/types/task";
import TaskListCard from "./TaskListCard";

interface TaskGroupProps {
    title: string;
    tasks: Task[];
    dotColor: string;
    defaultOpen?: boolean;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

export default function TaskGroup({
    title,
    tasks,
    dotColor,
    defaultOpen = true,
    updateTask,
    deleteTask,
}: TaskGroupProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    if (tasks.length === 0) return null;

    return (
        <div>
            {/* Group Header */}
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="group flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left transition-colors hover:bg-surface-3 cursor-pointer"
            >
                <ChevronDown
                    className={`h-3.5 w-3.5 text-text-tertiary transition-transform duration-200 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                />

                <div className={`h-2 w-2 rounded-full ${dotColor}`} />

                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {title}
                </span>

                <span className="rounded-md border border-border-subtle bg-surface-3 px-1.5 py-0.5 text-xs text-text-tertiary font-medium">
                    {tasks.length}
                </span>
            </button>

            {/* Task List with Smooth Transition */}
            <div
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-1.5" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden space-y-2 pl-1">
                    {tasks.map((task) => (
                        <TaskListCard
                            key={task.id}
                            task={task}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}