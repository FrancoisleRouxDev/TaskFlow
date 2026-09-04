import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import PriorityBadge from "./PriorityBadge";
import EditTaskDialog from "./EditTaskDialog";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  index: number;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

function formatRelativeDate(dateString: string): { label: string; className: string } {
  if (!dateString) return { label: "", className: "text-text-tertiary" };

  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const taskDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (taskDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return {
      label: diffDays === -1 ? "Yesterday" : `${Math.abs(diffDays)}d overdue`,
      className: "text-destructive",
    };
  }
  if (diffDays === 0) {
    return { label: "Today", className: "text-primary" };
  }
  if (diffDays === 1) {
    return { label: "Tomorrow", className: "text-text-secondary" };
  }
  if (diffDays <= 7) {
    return { label: `In ${diffDays} days`, className: "text-text-secondary" };
  }
  return {
    label: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    className: "text-text-tertiary",
  };
}

export default function TaskCard({
  task,
  index,
  updateTask,
  deleteTask,
}: TaskCardProps) {
  const [open, setOpen] = useState(false);

  const dueInfo = task.dueDate ? formatRelativeDate(task.dueDate) : null;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          <Card className="rounded-xl border border-sidebar-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/20">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {task.title}
                </h3>
                {task.project && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {task.project}
                  </p>
                )}
              </div>

              {dueInfo && (
                <div className="flex items-center gap-2 text-xs">
                  <span className={`font-medium ${dueInfo.className}`}>
                    {dueInfo.label}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <PriorityBadge priority={task.priority} />

                {task.assignee && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {task.assignee.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <EditTaskDialog
            open={open}
            onOpenChange={setOpen}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </Draggable>
  );
}