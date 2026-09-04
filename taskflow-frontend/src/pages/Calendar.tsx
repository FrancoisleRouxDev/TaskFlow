import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import PriorityBadge from "@/components/dashboard/PriorityBadge";
import EditTaskDialog from "@/components/dashboard/EditTaskDialog";

type CalendarContext = {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    searchTerm: string;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday = 0, Sunday = 6
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month fill
    for (let i = startDow - 1; i >= 0; i--) {
        const d = new Date(year, month, -i);
        days.push({ date: d, isCurrentMonth: false });
    }

    // Current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }

    // Next month fill (always complete to 6 rows × 7)
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
        days.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
    }

    return days;
}

function toDateKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function CalendarPage() {
    const {
        tasks,
        updateTask,
        deleteTask,
    } = useOutletContext<CalendarContext>();

    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [editTask, setEditTask] = useState<Task | null>(null);

    const days = getMonthDays(viewYear, viewMonth);
    const todayKey = toDateKey(today);

    // Build task lookup by date
    const tasksByDate = new Map<string, Task[]>();
    for (const task of tasks) {
        if (!task.dueDate) continue;
        const key = task.dueDate.slice(0, 10);
        if (!tasksByDate.has(key)) tasksByDate.set(key, []);
        tasksByDate.get(key)!.push(task);
    }

    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const goToPrev = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const goToNext = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const goToToday = () => {
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
        setSelectedDate(todayKey);
    };

    const selectedTasks = selectedDate ? (tasksByDate.get(selectedDate) ?? []) : [];

    const formatSelectedDate = (dateStr: string) => {
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
            {/* Page Header */}
            <div className="border-b border-border-subtle pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Calendar
                </h1>
                <p className="mt-1.5 text-sm text-text-secondary">
                    View your tasks across the month
                </p>
            </div>

            {/* Calendar Controls */}
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={goToPrev}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <h2 className="min-w-[160px] text-center text-base font-semibold text-foreground">
                        {monthLabel}
                    </h2>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={goToNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={goToToday}
                    className="text-xs"
                >
                    Today
                </Button>
            </div>

            {/* Calendar Grid */}
            <div className="mt-4 rounded-xl border border-border-subtle bg-surface-1 overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b border-border-subtle">
                    {WEEKDAYS.map((day) => (
                        <div
                            key={day}
                            className="px-2 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Day Cells */}
                <div className="grid grid-cols-7">
                    {days.map((day, i) => {
                        const key = toDateKey(day.date);
                        const dayTasks = tasksByDate.get(key) ?? [];
                        const isToday = key === todayKey;
                        const isSelected = key === selectedDate;

                        return (
                            <button
                                type="button"
                                key={i}
                                onClick={() => setSelectedDate(isSelected ? null : key)}
                                className={`
                                    relative flex min-h-[80px] sm:min-h-[100px] flex-col items-start p-1.5 sm:p-2
                                    border-b border-r border-border-subtle
                                    text-left transition-colors duration-100
                                    hover:bg-surface-3
                                    ${!day.isCurrentMonth ? "bg-surface-0/50" : "bg-surface-1"}
                                    ${isSelected ? "ring-2 ring-inset ring-primary/40 bg-primary/5" : ""}
                                `}
                            >
                                {/* Day Number */}
                                <span
                                    className={`
                                        inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium
                                        ${isToday
                                            ? "bg-primary text-primary-foreground font-semibold"
                                            : day.isCurrentMonth
                                                ? "text-text-primary"
                                                : "text-text-tertiary"
                                        }
                                    `}
                                >
                                    {day.date.getDate()}
                                </span>

                                {/* Task Dots / Previews */}
                                {dayTasks.length > 0 && (
                                    <div className="mt-1 flex w-full flex-col gap-0.5">
                                        {dayTasks.slice(0, 2).map((task) => (
                                            <div
                                                key={task.id}
                                                className={`
                                                    truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-tight
                                                    ${task.status === "Done"
                                                        ? "bg-emerald-500/15 text-emerald-400 line-through"
                                                        : task.priority === "Critical"
                                                            ? "bg-red-500/15 text-red-400"
                                                            : task.priority === "High"
                                                                ? "bg-orange-500/15 text-orange-400"
                                                                : "bg-primary/10 text-primary"
                                                    }
                                                `}
                                            >
                                                {task.title}
                                            </div>
                                        ))}
                                        {dayTasks.length > 2 && (
                                            <span className="px-1.5 text-[10px] font-medium text-text-tertiary">
                                                +{dayTasks.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Detail Panel */}
            {selectedDate && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="mb-3 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-text-tertiary" />
                        <h3 className="text-sm font-semibold text-foreground">
                            {formatSelectedDate(selectedDate)}
                        </h3>
                        <span className="ml-auto text-xs text-text-tertiary font-medium">
                            {selectedTasks.length}{" "}
                            {selectedTasks.length === 1 ? "task" : "tasks"}
                        </span>
                    </div>

                    {selectedTasks.length > 0 ? (
                        <div className="space-y-2">
                            {selectedTasks.map((task) => (
                                <Card
                                    key={task.id}
                                    className="flex items-start gap-3.5 border-border-subtle bg-surface-2 p-3.5 shadow-xs cursor-pointer transition-all duration-150 hover:border-border-strong hover:bg-surface-3"
                                    onClick={() => setEditTask(task)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.status === "Done"}
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

                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm font-medium leading-snug ${
                                                task.status === "Done"
                                                    ? "line-through text-text-tertiary"
                                                    : "text-text-primary"
                                            }`}
                                        >
                                            {task.title}
                                        </p>

                                        {task.description && (
                                            <p className="mt-1 text-xs text-text-secondary truncate">
                                                {task.description}
                                            </p>
                                        )}

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <PriorityBadge priority={task.priority} />

                                            {task.project && (
                                                <span className="rounded-md border border-border-subtle bg-surface-3 px-2 py-0.5 text-xs text-text-secondary">
                                                    {task.project}
                                                </span>
                                            )}

                                            <span className="rounded-md border border-border-subtle bg-surface-3 px-2 py-0.5 text-xs text-text-tertiary">
                                                {task.status}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-dashed border-border-subtle bg-surface-2 p-6 text-center shadow-none">
                            <p className="text-sm text-text-tertiary">
                                No tasks scheduled for this day
                            </p>
                        </Card>
                    )}
                </div>
            )}

            {/* Edit Task Dialog */}
            {editTask && (
                <EditTaskDialog
                    open={!!editTask}
                    onOpenChange={(open) => {
                        if (!open) setEditTask(null);
                    }}
                    task={editTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            )}
        </div>
    );
}