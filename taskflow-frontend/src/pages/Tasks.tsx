import { useState, useEffect } from "react";
import type { Task } from "@/types/task";
import { useOutletContext, useSearchParams } from "react-router-dom";

import TaskDialog from "@/components/dashboard/TaskDialog";

import TaskFilters, {
    applyFilters,
    applySorting,
    extractProjects,
    type TaskFilterValues,
} from "@/components/tasks/TaskFilters";

import TaskGroup from "@/components/tasks/TaskGroup";
import EmptyState from "@/components/tasks/EmptyState";

import { CheckSquare, SearchX } from "lucide-react";

type TaskContext = {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    searchTerm: string;
};

const STATUS_GROUPS: {
    key: Task["status"];
    label: string;
    dotColor: string;
    defaultOpen: boolean;
}[] = [
        {
            key: "To Do",
            label: "To Do",
            dotColor: "bg-slate-400",
            defaultOpen: true,
        },
        {
            key: "In Progress",
            label: "In Progress",
            dotColor: "bg-sky-500",
            defaultOpen: true,
        },
        {
            key: "Review",
            label: "Review",
            dotColor: "bg-amber-400",
            defaultOpen: true,
        },
        {
            key: "Done",
            label: "Done",
            dotColor: "bg-emerald-500",
            defaultOpen: false,
        },
    ];

export default function Tasks() {
    const {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        searchTerm,
    } = useOutletContext<TaskContext>();

    const [searchParams, setSearchParams] = useSearchParams();
    const projectFromUrl = searchParams.get("project");

    const [filters, setFilters] = useState<TaskFilterValues>(() => ({
        status: "All",
        priority: "All",
        project: projectFromUrl || "All",
    }));

    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            project: projectFromUrl || "All",
        }));
    }, [projectFromUrl]);

    const handleFiltersChange = (newFilters: TaskFilterValues) => {
        setFilters(newFilters);
        if (newFilters.project !== (projectFromUrl || "All")) {
            if (newFilters.project === "All") {
                setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.delete("project");
                    return next;
                });
            } else {
                setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.set("project", newFilters.project);
                    return next;
                });
            }
        }
    };

    const handleClearFilters = () => {
        setFilters({
            status: "All",
            priority: "All",
            project: "All",
        });
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete("project");
            return next;
        });
    };

    const [sortBy, setSortBy] = useState("dueDate");

    // 1. Search (from header)
    const searched = tasks.filter((task) => {
        if (!searchTerm) return true;
        const s = searchTerm.toLowerCase();
        return (
            task.title.toLowerCase().includes(s) ||
            task.description.toLowerCase().includes(s) ||
            task.project.toLowerCase().includes(s) ||
            task.assignee.toLowerCase().includes(s)
        );
    });

    // 2. Filter
    const filtered = applyFilters(searched, filters);

    // 3. Sort
    const sorted = applySorting(filtered, sortBy);

    // Projects for filter dropdown (from ALL tasks, not filtered)
    const allProjects = extractProjects(tasks);

    const hasActiveFilters =
        filters.status !== "All" ||
        filters.priority !== "All" ||
        filters.project !== "All";

    const activeTasks = tasks.filter((t) => t.status !== "Done").length;

    // No tasks at all
    if (tasks.length === 0) {
        return (
            <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
                {/* Page Header */}
                <div className="flex items-center justify-between border-b border-border-subtle pb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Tasks
                        </h1>
                        <p className="mt-1.5 text-sm text-text-secondary">
                            Manage everything you need to accomplish
                        </p>
                    </div>
                    <TaskDialog mode="create" addTask={addTask} />
                </div>

                <EmptyState
                    icon={CheckSquare}
                    title="No tasks yet"
                    description="Create your first task to start organising what you need to accomplish."
                    actionLabel="+ New Task"
                    onAction={() => {
                        // Trigger TaskDialog programmatically is complex;
                        // the button is already visible in the header
                    }}
                />
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
            {/* Page Header */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Tasks
                    </h1>
                    <p className="mt-1.5 text-sm text-text-secondary">
                        {activeTasks} active · {tasks.length} total
                    </p>
                </div>
                <TaskDialog mode="create" addTask={addTask} />
            </div>

            {/* Filter Bar */}
            <div className="mt-6">
                <TaskFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    projects={allProjects}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />
            </div>

            {/* Task Groups */}
            <div className="mt-6 space-y-6">
                {sorted.length === 0 ? (
                    <EmptyState
                        icon={SearchX}
                        title="No tasks found"
                        description={
                            hasActiveFilters || searchTerm
                                ? "Try adjusting your filters or search terms."
                                : "No tasks match the current view."
                        }
                        actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
                        onAction={hasActiveFilters ? handleClearFilters : undefined}
                    />
                ) : (
                    STATUS_GROUPS.map((group) => {
                        const groupTasks = sorted.filter(
                            (t) => t.status === group.key
                        );
                        return (
                            <TaskGroup
                                key={group.key}
                                title={group.label}
                                tasks={groupTasks}
                                dotColor={group.dotColor}
                                defaultOpen={group.defaultOpen}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}