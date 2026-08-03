"use client";

import Image from "next/image";

const locations = [
  {
    name: "Jolshiri",
    x: "93.5%",
    y: "23%",
  },
  {
    name: "Nikunjo",
    x: "75.6%",
    y: "30.5%",
  },
  {
    name: "Bashundhara",
    x: "83.4%",
    y: "36.6%",
  },
  {
    name: "Banani",
    x: "50.1%",
    y: "36.5%",
  },
  {
    name: "Mirpur DOHS",
    x: "32.3%",
    y: "36.5%",
  },
  {
    name: "Gulshan",
    x: "55.8%",
    y: "42.5%",
  },
  {
    name: "Rampura",
    x: "65.7%",
    y: "55.9%",
  },
  {
    name: "Dhanmondi",
    x: "38%",
    y: "66.6%",
  },
];

export default function BangladeshMap() {
  return (
    <div className="relative w-full">
      {/* Map */}
      <Image
        src="/icons/map.svg"
        alt="Bangladesh map"
        width={600}
        height={600}
        className="h-60 md:h-100 w-full object-contain"
      />

      {/* Locations */}
      {locations.map((location) => (
        <div
          key={location.name}
          className="absolute"
          style={{
            left: location.x,
            top: location.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Pink Marker */}
          <div className="flex flex-col items-center">
            {/* Pin */}
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#ff3b8d]" />

            {/* Label */}
            <span className="whitespace-nowrap text-[10px] -mt-1 text-white">
              {location.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}