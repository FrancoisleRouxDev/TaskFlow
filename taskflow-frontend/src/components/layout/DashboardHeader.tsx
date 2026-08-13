import { getGreeting, getTimeContext } from "@/lib/greetings";

export default function DashboardHeader() {
  const greeting = getGreeting();
  const timeContext = getTimeContext();

  return (
    <div className="border-b border-border-subtle pb-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {greeting}
      </h1>
      <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
        {timeContext}
      </p>
    </div>
  );
}