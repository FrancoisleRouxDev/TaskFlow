import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Task } from "@/types/task";

export interface TaskFilterValues {
    status: string;
    priority: string;
    project: string;
}

interface TaskFiltersProps {
    filters: TaskFilterValues;
    onFiltersChange: (filters: TaskFilterValues) => void;
    projects: string[];
    sortBy: string;
    onSortChange: (sort: string) => void;
}

const STATUS_OPTIONS = ["All", "To Do", "In Progress", "Review", "Done"] as const;
const PRIORITY_OPTIONS = ["All", "Critical", "High", "Medium", "Low"] as const;
const SORT_OPTIONS = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "title", label: "Title" },
    { value: "created", label: "Date Created" },
] as const;

export default function TaskFilters({
    filters,
    onFiltersChange,
    projects,
    sortBy,
    onSortChange,
}: TaskFiltersProps) {
    const hasActiveFilters =
        filters.status !== "All" ||
        filters.priority !== "All" ||
        filters.project !== "All";

    const clearFilters = () => {
        onFiltersChange({ status: "All", priority: "All", project: "All" });
    };

    return (
        <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <Select
                value={filters.status}
                onValueChange={(value) =>
                    onFiltersChange({ ...filters, status: value })
                }
            >
                <SelectTrigger className="h-8 w-auto min-w-[110px] text-xs">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                            {s === "All" ? "All Status" : s}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select
                value={filters.priority}
                onValueChange={(value) =>
                    onFiltersChange({ ...filters, priority: value })
                }
            >
                <SelectTrigger className="h-8 w-auto min-w-[110px] text-xs">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    {PRIORITY_OPTIONS.map((p) => (
                        <SelectItem key={p} value={p}>
                            {p === "All" ? "All Priority" : p}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Project Filter */}
            <Select
                value={filters.project}
                onValueChange={(value) =>
                    onFiltersChange({ ...filters, project: value })
                }
            >
                <SelectTrigger className="h-8 w-auto min-w-[110px] text-xs">
                    <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Projects</SelectItem>
                    {projects.map((p) => (
                        <SelectItem key={p} value={p}>
                            {p}
                        </SelectItem>
                    ))}
                    {filters.project !== "All" && !projects.includes(filters.project) && (
                        <SelectItem key={filters.project} value={filters.project}>
                            {filters.project}
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>

            {/* Separator */}
            <div className="h-5 w-px bg-border-subtle mx-0.5" />

            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs">
                    <span className="text-text-tertiary mr-1">Sort:</span>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                            {s.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={clearFilters}
                    className="text-text-tertiary hover:text-foreground"
                >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                </Button>
            )}
        </div>
    );
}

/** Apply filters to a task array */
export function applyFilters(
    tasks: Task[],
    filters: TaskFilterValues
): Task[] {
    return tasks.filter((task) => {
        if (filters.status !== "All" && task.status !== filters.status)
            return false;
        if (filters.priority !== "All" && task.priority !== filters.priority)
            return false;
        if (filters.project !== "All" && task.project !== filters.project)
            return false;
        return true;
    });
}

/** Sort a task array by the given key */
export function applySorting(tasks: Task[], sortBy: string): Task[] {
    const sorted = [...tasks];
    const priorityOrder: Record<string, number> = {
        Critical: 0,
        High: 1,
        Medium: 2,
        Low: 3,
    };

    switch (sortBy) {
        case "dueDate":
            return sorted.sort((a, b) => {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return a.dueDate.localeCompare(b.dueDate);
            });
        case "priority":
            return sorted.sort(
                (a, b) =>
                    (priorityOrder[a.priority] ?? 999) -
                    (priorityOrder[b.priority] ?? 999)
            );
        case "title":
            return sorted.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        case "created":
            return sorted.reverse();
        default:
            return sorted;
    }
}

/** Extract unique non-empty project names from tasks */
export function extractProjects(tasks: Task[]): string[] {
    const set = new Set<string>();
    for (const t of tasks) {
        if (t.project && t.project.trim()) {
            set.add(t.project.trim());
        }
    }
    return Array.from(set).sort();
}