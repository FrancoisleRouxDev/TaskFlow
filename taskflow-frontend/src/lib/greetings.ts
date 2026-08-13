/**
 * Greeting utilities for the Dashboard
 * Provides time-based greetings and contextual messages
 */

export function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export function getTimeContext(): string {
    const now = new Date();
    const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
    const date = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const hour = now.getHours();

    if (hour < 12) {
        return `${dayOfWeek}, ${date} · Here's what you need to do today`;
    } else if (hour < 18) {
        return `${dayOfWeek}, ${date} · Keep up the momentum`;
    } else {
        return `${dayOfWeek}, ${date} · Take a look at what's ahead`;
    }
}
