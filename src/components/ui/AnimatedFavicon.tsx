"use client";

import { useEffect } from "react";

import faviconJ from "@/app/faviconj.png";
import faviconA from "@/app/favicona.png";
import faviconM from "@/app/faviconm.png";

const frames = [faviconJ.src, faviconA.src, faviconM.src];

export function AnimatedFavicon() {
    useEffect(() => {
        let index = 0;

        const updateFavicon = () => {
            document
                .querySelectorAll("link[data-animated-favicon]")
                .forEach((el) => el.remove());

            const link = document.createElement("link");

            link.rel = "icon";
            link.type = "image/png";
            link.setAttribute("data-animated-favicon", "true");

            link.href = frames[index];

            document.head.appendChild(link);

            index = (index + 1) % frames.length;
        };

        updateFavicon();

        const interval = window.setInterval(updateFavicon, 1000);

        return () => {
            window.clearInterval(interval);

            document
                .querySelectorAll("link[data-animated-favicon]")
                .forEach((el) => el.remove());
        };
    }, []);

    return null;
}