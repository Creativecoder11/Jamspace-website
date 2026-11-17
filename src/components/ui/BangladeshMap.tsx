import Image from "next/image";
import { locations } from "@/lib/data/locations";

export default function BangladeshMap({ className = "" }: { className?: string }) {
  return (
    // The wrapper takes the image's exact aspect ratio, so the % marker
    // positions always line up with the dots on the map.
    <div className={`relative w-full ${className}`}>
      <Image
        src="/icons/Dhaka Map.svg"
        alt="Map of Dhaka showing the areas we've worked in"
        width={2349}
        height={3463}
        className="block h-auto w-full"
      />

      {locations.map((location) => (
        <div
          key={location.name}
          className="absolute flex -translate-x-1/2 -translate-y-[2px] flex-col items-center"
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
        >
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#E92A7B]" />
          <span className="mt-0.5 whitespace-nowrap text-[10px] leading-none text-white">
            {location.name}
          </span>
        </div>
      ))}
    </div>
  );
}
