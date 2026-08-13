import { getGreeting, getTimeContext } from "@/lib/greetings";

export default function DashboardHeader() {
  const greeting = getGreeting();
  const timeContext = getTimeContext();

  return (
    <div className="border-b border-border-subtle pb-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-foreground">
        {greeting}
      </h1>

      {/* Context */}
      <p className="mt-2 text-sm text-text-secondary">
        {timeContext}
      </p>
    </div>
  );
}