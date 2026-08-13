interface PriorityBadgeProps {
  priority: "Low" | "Medium" | "High" | "Critical";
}

export const PRIORITY_STYLES: Record<PriorityBadgeProps["priority"], { badge: string; text: string; dot: string }> = {
  Low: {
    badge: "bg-slate-500/20 text-slate-300",
    text: "text-slate-400",
    dot: "bg-slate-400",
  },
  Medium: {
    badge: "bg-yellow-500/20 text-yellow-300",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
  },
  High: {
    badge: "bg-orange-500/20 text-orange-300",
    text: "text-orange-400",
    dot: "bg-orange-400",
  },
  Critical: {
    badge: "bg-red-500/20 text-red-300",
    text: "text-red-400",
    dot: "bg-red-400",
  },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low;
  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium ${style.badge}`}>
      {priority}
    </span>
  );
}