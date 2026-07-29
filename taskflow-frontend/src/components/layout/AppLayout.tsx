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
  User,
  Plus,
} from "lucide-react";

import Header from "./Header";
import DashboardHeader from "./DashboardHeader";
import SprintBoard from "@/components/dashboard/SprintBoard";
import StatsSection from "../dashboard/StatsSection";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState } from "react";

const projects = [
  {
    name: "University",
    color: "bg-blue-500",
  },
  {
    name: "Personal",
    color: "bg-emerald-500",
  },
  {
    name: "Projects",
    color: "bg-violet-500",
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
        className="border-r border-slate-200"
      >

        <SidebarHeader className="px-5 py-6">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900">

              <CheckSquare className="h-4 w-4 text-white" />

            </div>

            <div className="flex flex-col">

              <span className="text-base font-semibold tracking-tight text-slate-900">
                TaskFlow
              </span>

              <span className="text-xs text-slate-400">
                Personal workspace
              </span>

            </div>

          </div>

        </SidebarHeader>


        <SidebarContent className="px-3">

          {/* Workspace */}

          <div className="mb-7">

            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>

            <div className="space-y-1">

              <SidebarMenuButton
                isActive
                className="h-10 rounded-lg px-3 text-slate-700 data-active:bg-slate-100 data-active:text-slate-900"
              >

                <LayoutDashboard className="h-4 w-4" />

                <span>
                  Overview
                </span>

              </SidebarMenuButton>


              <SidebarMenuButton
                className="h-10 rounded-lg px-3 text-slate-600"
              >

                <CheckSquare className="h-4 w-4" />

                <span>
                  Tasks
                </span>

                <span className="ml-auto text-xs text-slate-400">
                  {tasks.length}
                </span>

              </SidebarMenuButton>


              <SidebarMenuButton
                className="h-10 rounded-lg px-3 text-slate-600"
              >

                <CalendarDays className="h-4 w-4" />

                <span>
                  Calendar
                </span>

              </SidebarMenuButton>

            </div>

          </div>


          {/* Projects */}

          <div>

            <div className="mb-2 flex items-center justify-between px-3">

              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Spaces
              </p>

              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >

                <Plus className="h-3.5 w-3.5" />

              </button>

            </div>


            <div className="space-y-1">

              {projects.map((project) => (

                <button
                  key={project.name}
                  type="button"
                  className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >

                  <span
                    className={`h-2.5 w-2.5 rounded-full ${project.color}`}
                  />

                  <span>
                    {project.name}
                  </span>

                </button>

              ))}

            </div>

          </div>

        </SidebarContent>


        {/* Footer */}

        <SidebarFooter className="border-t border-slate-200 p-3">

          <SidebarMenuButton
            className="h-10 rounded-lg px-3 text-slate-600"
          >

            <Settings className="h-4 w-4" />

            <span>
              Settings
            </span>

          </SidebarMenuButton>


          <SidebarMenuButton
            className="h-11 rounded-lg px-3 text-slate-700"
          >

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200">

              <User className="h-3.5 w-3.5 text-slate-600" />

            </div>

            <div className="flex min-w-0 flex-col">

              <span className="truncate text-sm font-medium">
                Your workspace
              </span>

              <span className="truncate text-xs text-slate-400">
                Personal account
              </span>

            </div>

          </SidebarMenuButton>

        </SidebarFooter>

      </Sidebar>


      {/* =========================
          MAIN APPLICATION
      ========================== */}

      <SidebarInset className="bg-slate-50">

        <Header
          addTask={addTask}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />


        <main className="flex-1">

          <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">

            <DashboardHeader />

            <div className="mt-8">

              <StatsSection
                tasks={filteredTasks}
              />

            </div>


            <SprintBoard
              tasks={filteredTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />

          </div>

        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}