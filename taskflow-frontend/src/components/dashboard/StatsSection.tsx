import StatsCard from "./StatsCard";
import type { Task } from "@/types/task";

import {
    CheckCircle,
    AlertCircle,
    Clock,
    ListTodo,
} from "lucide-react";

interface StatsSectionProps {
    tasks: Task[];
}

export default function StatsSection({
    tasks,
}: StatsSectionProps) {

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(task => task.status === "Done").length;

    const today = new Date().toISOString().split("T")[0];

    const overdueCount = tasks.filter(task => {
        if (task.status === "Done") return false;
        if (!task.dueDate) return false;
        return task.dueDate < today;
    }).length;

    const dueThisWeek = tasks.filter(task => {
        if (task.status === "Done") return false;
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        const weekFromNow = new Date();
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        return taskDate <= weekFromNow && taskDate > new Date(today);
    }).length;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="Total Tasks"
                value={totalTasks}
                subtitle="All tasks"
                icon={ListTodo}
            />

            <StatsCard
                title="Completed"
                value={completedTasks}
                subtitle={`${totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)}% complete`}
                icon={CheckCircle}
                iconColor="text-emerald-400"
            />

            <StatsCard
                title="Due This Week"
                value={dueThisWeek}
                subtitle="Next 7 days"
                icon={Clock}
                iconColor="text-blue-400"
            />

            <StatsCard
                title="Overdue"
                value={overdueCount}
                subtitle={overdueCount === 0 ? "All clear" : "Needs attention"}
                icon={AlertCircle}
                iconColor={overdueCount === 0 ? "text-emerald-400" : "text-orange-400"}
            />

        </div>
    );
}