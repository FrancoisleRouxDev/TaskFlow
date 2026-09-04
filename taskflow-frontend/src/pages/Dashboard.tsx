import { useOutletContext } from "react-router-dom";
import type { Task } from "@/types/task";

import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import TodaySection from "@/components/dashboard/TodaySection";
import UpcomingSection from "@/components/dashboard/UpcomingSection";
import SprintBoard from "@/components/dashboard/SprintBoard";

type DashboardContext = {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    searchTerm: string;
};

export default function Dashboard() {
    const {
        tasks,
        updateTask,
        deleteTask,
    } = useOutletContext<DashboardContext>();

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
            <DashboardHeader />

            <div className="mt-8">
                <StatsSection tasks={tasks} />
            </div>

            <TodaySection
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />

            <UpcomingSection tasks={tasks} />

            <SprintBoard
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}