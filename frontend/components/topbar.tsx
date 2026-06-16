"use client"

import { Bell, Search, User, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { roleLabels } from "../data/data";


export function Topbar({ role }: { role: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        setMounted(true)
        setUserEmail(localStorage.getItem("userEmail") || "")
    }, [])

    useEffect(() => {
        console.log("Current theme:", theme);
      }, [theme]);


    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <div className="h-16  text-black bg-[#F5F5DC] border-b border-border flex items-center justify-between p-6">
            <div className="flex items-center gap-4 flex-1">
                <div className="hidden md:flex items-center gap-2 bg-[#F1E9D2] rounded-lg px-3 py-2 w-64">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input type="text" placeholder="Search..." className="bg-transparent border-0 outline-none text-sm" />
                </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F5F5DC]">
                {mounted && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        title={theme === "dark" ? "Light mode" : "Dark mode"}
                    >
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                )}

                <Button variant="ghost" size="icon" title="Notifications">
                    <Bell className="w-5 h-5" />
                </Button>

                <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="text-sm ">
                        <p className="font-semibold text-[#00000]">{roleLabels[role as keyof typeof roleLabels]}</p>
                        <p className="text-xs text-muted-foreground">{userEmail}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
