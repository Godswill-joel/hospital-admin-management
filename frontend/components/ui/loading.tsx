"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

export default function ProgressLoader() {
    const [progress, setProgress] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const [trackWidth, setTrackWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (trackRef.current) {
                setTrackWidth(trackRef.current.offsetWidth);
            }
        };

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let restart: NodeJS.Timeout;

        const startLoop = () => {
            let value = 0;
            let step = 0;

            setProgress(0);

            interval = setInterval(() => {
                step++;

                value += step < 4 ? 18 : step < 8 ? 8 : 3;

                if (value >= 100) {
                    value = 100;
                }

                setProgress(value);

                if (value >= 100) {
                    clearInterval(interval);

                    restart = setTimeout(startLoop, 1400);
                }
            }, 220);
        };

        startLoop();

        return () => {
            clearInterval(interval);
            clearTimeout(restart);
        };
    }, []);

    const maxTranslate = Math.max(trackWidth - 20 - 22, 0);
    const translate = (maxTranslate * progress) / 100;

    return (
        <div className="grid w-60 gap-2.5">
            <div
                ref={trackRef}
                className="relative flex h-7 items-center px-[10px]"
            >
                {/* Progress Bar */}
                <progress
                    value={progress}
                    max={100}
                    className="h-1 w-full overflow-hidden rounded-full
  [&::-webkit-progress-bar]:rounded-full
  [&::-webkit-progress-bar]:bg-muted
  [&::-webkit-progress-value]:rounded-full
  [&::-webkit-progress-value]:bg-gradient-to-r
  [&::-webkit-progress-value]:from-primary
  [&::-webkit-progress-value]:to-accent
  [&::-moz-progress-bar]:bg-gradient-to-r
  [&::-moz-progress-bar]:from-primary
  [&::-moz-progress-bar]:to-accent"
                />

                {/* Start Pin */}
                <span className="absolute left-[7px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_color-mix(in_oklab,var(--primary)_55%,transparent)]" />
                {/* End Pin */}
                <span className="absolute right-[7px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent/40" />

                {/* Moving Plane */}
                <span
                    style={{
                        transform: `translateX(${translate}px) translateY(-50%)`,
                    }}
                    className="absolute left-[10px] top-1/2 grid h-[22px] w-[22px] place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-primary-foreground shadow-lg transition-transform duration-200 motion-reduce:transition-none"
                >
                    <Send
                        size={13}
                        strokeWidth={1.8}
                        className="rotate-[-25deg]"
                    />
                </span>
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Preparing your tour
            </span>

            <span className="font-mono text-xs font-bold tracking-wide text-foreground">
                {Math.round(progress)}%
            </span>
        </div>
    );
}