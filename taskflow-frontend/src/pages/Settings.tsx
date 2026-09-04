import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Settings() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Settings
                </h1>

                <p className="mt-1 text-sm text-text-secondary">
                    Customize how TaskFlow looks and behaves.
                </p>
            </div>

            <section className="rounded-xl border border-border-subtle bg-surface-1 p-6">
                <div>
                    <h2 className="font-medium text-foreground">
                        Appearance
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        Choose how TaskFlow looks.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                    <button
                        type="button"
                        onClick={() => setTheme("light")}
                        className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${theme === "light"
                                ? "border-primary bg-primary/10"
                                : "border-border-subtle hover:bg-surface-3"
                            }`}
                    >
                        <Sun className="h-5 w-5" />

                        <div>
                            <p className="text-sm font-medium">
                                Light
                            </p>

                            <p className="text-xs text-text-secondary">
                                Bright and clean
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setTheme("dark")}
                        className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${theme === "dark"
                                ? "border-primary bg-primary/10"
                                : "border-border-subtle hover:bg-surface-3"
                            }`}
                    >
                        <Moon className="h-5 w-5" />

                        <div>
                            <p className="text-sm font-medium">
                                Dark
                            </p>

                            <p className="text-xs text-text-secondary">
                                Calm and easier on the eyes
                            </p>
                        </div>
                    </button>
                </div>
            </section>
        </div>
    );
}