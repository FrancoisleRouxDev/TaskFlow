import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarInset,
} from "../ui/sidebar";

import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Settings,
  Plus,
} from "lucide-react";

import Header from "./Header";
import DashboardHeader from "./DashboardHeader";
import TodaySection from "@/components/dashboard/TodaySection";
import UpcomingSection from "@/components/dashboard/UpcomingSection";
import StatsSection from "../dashboard/StatsSection";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState } from "react";

const pages = [
  {
    name: "University",
    color: "bg-blue-500",
  },
  {
    name: "Personal",
    color: "bg-emerald-500",
  },
  {
    name: "Work",
    color: "bg-purple-500",
  },
];

export default function WorkspaceLayout() {

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useLocalStorage();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {

    const search = searchTerm.toLowerCase();

    return (
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search) ||
      task.project.toLowerCase().includes(search) ||
      task.assignee.toLowerCase().includes(search)
    );

  });

  return (
    <SidebarProvider>

      {/* =========================
          SIDEBAR
      ========================== */}

      <Sidebar
        collapsible="offcanvas"
        className="border-r border-border-subtle bg-surface-1"
      >

        <SidebarHeader className="border-b border-border-subtle px-5 py-6">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">

              <CheckSquare className="h-4 w-4 text-primary-foreground" />

            </div>

            <div className="flex flex-col">

              <span className="text-base font-semibold tracking-tight text-foreground">
                TaskFlow
              </span>

              <span className="text-xs text-text-tertiary">
                Personal organization
              </span>

            </div>

          </div>

        </SidebarHeader>


        <SidebarContent className="px-3">

          {/* Main Navigation */}

          <div className="mb-8">

            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              Dashboard
            </p>

            <div className="space-y-1">

              <SidebarMenuButton
                isActive
                className="h-9 rounded-lg px-3 text-text-secondary data-active:bg-sidebar-accent data-active:text-foreground"
              >

                <LayoutDashboard className="h-4 w-4" />

                <span>
                  Dashboard
                </span>

              </SidebarMenuButton>


              <SidebarMenuButton
                className="h-9 rounded-lg px-3 text-text-secondary hover:bg-sidebar-accent hover:text-foreground"
              >

                <CheckSquare className="h-4 w-4" />

                <span>
                  Tasks
                </span>

                <span className="ml-auto text-xs text-text-tertiary">
                  {tasks.length}
                </span>

              </SidebarMenuButton>


              <SidebarMenuButton
                className="h-9 rounded-lg px-3 text-text-secondary hover:bg-sidebar-accent hover:text-foreground"
              >

                <CalendarDays className="h-4 w-4" />

                <span>
                  Calendar
                </span>

              </SidebarMenuButton>

            </div>

          </div>


          {/* My Pages */}

          <div>

            <div className="mb-3 flex items-center justify-between px-3">

              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                My Pages
              </p>

              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-sidebar-accent hover:text-foreground"
                title="Create new page"
              >

                <Plus className="h-3.5 w-3.5" />

              </button>

            </div>


            <div className="space-y-1">

              {pages.map((page) => (

                <button
                  key={page.name}
                  type="button"
                  className="flex h-8 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-text-secondary transition-colors hover:bg-sidebar-accent hover:text-foreground"
                >

                  <span
                    className={`h-2 w-2 rounded-full ${page.color}`}
                  />

                  <span className="flex-1">
                    {page.name}
                  </span>

                </button>

              ))}

            </div>

          </div>

        </SidebarContent>


        {/* Footer */}

        <SidebarFooter className="border-t border-border-subtle p-3">

          <SidebarMenuButton
            className="h-9 rounded-lg px-3 text-text-secondary hover:bg-sidebar-accent hover:text-foreground"
          >

            <Settings className="h-4 w-4" />

            <span>
              Settings
            </span>

          </SidebarMenuButton>


          <SidebarMenuButton
            className="h-10 rounded-lg px-3 text-text-secondary hover:bg-sidebar-accent hover:text-foreground"
          >

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">

              F

            </div>

            <div className="flex min-w-0 flex-col">

              <span className="truncate text-xs font-medium text-foreground">
                Francois
              </span>

              <span className="truncate text-xs text-text-tertiary">
                Personal
              </span>

            </div>

          </SidebarMenuButton>

        </SidebarFooter>

      </Sidebar>


      {/* =========================
          MAIN APPLICATION
      ========================== */}

      <SidebarInset className="bg-background">

        <Header
          addTask={addTask}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />


        <main className="flex-1">

          <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-8 lg:px-10">

            {/* Greeting and Context */}
            <DashboardHeader />

            {/* Statistics */}
            <div className="mt-8">
              <StatsSection tasks={filteredTasks} />
            </div>

            {/* Today's Focus */}
            <TodaySection
              tasks={filteredTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />

            {/* Upcoming */}
            <UpcomingSection tasks={filteredTasks} />

          </div>

        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}