"use client";

import { useMemo, useState } from "react";
import FastestPathRouteDetails, {
  RouteSummary,
} from "../fastest_path_route/FastestPathRouteDetails";

const FastestPathSearch = () => {
  const [startLocation, setStartLocation] = useState("Lausanne");
  const [destination, setDestination] = useState("Geneve");
  const [departureDate, setDepartureDate] = useState("2026-02-03");
  const [departureTime, setDepartureTime] = useState("10:55");
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const routes = useMemo<RouteSummary[]>(
    () => [
      {
        id: "route-1",
        line: "IC5",
        direction: "Direction Geneve",
        from: { time: "08:17", name: "Lausanne", platform: "voie 8" },
        to: { time: "10:00", name: "Geneve", platform: "voie 3" },
        duration: "1:45",
        segments: [
          {
            id: "seg-1",
            line: "IC5",
            direction: "Direction Geneve",
            travelTime: "1h 45m",
            stops: [
              { time: "08:17", name: "Lausanne", platform: "voie 8" },
              { time: "09:03", name: "Morges" },
              { time: "09:28", name: "Nyon" },
              { time: "10:00", name: "Geneve", platform: "voie 3" },
            ],
          },
        ],
      },
      {
        id: "route-2",
        line: "IC5",
        direction: "Direction Geneve",
        from: { time: "08:17", name: "Lausanne", platform: "voie 8" },
        to: { time: "10:00", name: "Geneve", platform: "voie 4" },
        duration: "1:45",
        segments: [
          {
            id: "seg-2",
            line: "IC5",
            direction: "Direction Geneve",
            travelTime: "1h 06m",
            stops: [
              { time: "08:17", name: "Lausanne", platform: "voie 8" },
              { time: "09:23", name: "Zuerich" },
            ],
            transferAfter: "2min transfer",
          },
          {
            id: "seg-3",
            line: "IC5",
            direction: "Direction Geneve",
            travelTime: "39m",
            stops: [
              { time: "09:30", name: "Zuerich", platform: "voie 4" },
              { time: "10:00", name: "Geneve", platform: "voie 4" },
            ],
          },
        ],
      },
      {
        id: "route-3",
        line: "IC5",
        direction: "Direction Geneve",
        from: { time: "08:47", name: "Lausanne", platform: "voie 1" },
        to: { time: "10:32", name: "Geneve", platform: "voie 2" },
        duration: "1:45",
        segments: [
          {
            id: "seg-4",
            line: "IC5",
            direction: "Direction Geneve",
            travelTime: "1h 45m",
            stops: [
              { time: "08:47", name: "Lausanne", platform: "voie 1" },
              { time: "09:14", name: "Rolle" },
              { time: "09:46", name: "Gland" },
              { time: "10:32", name: "Geneve", platform: "voie 2" },
            ],
          },
        ],
      },
    ],
    []
  );

  const selectedRoute = routes.find((route) => route.id === selectedRouteId) ?? null;

  return (
    <section className="relative w-full max-w-5xl">
      <div className={`space-y-5 ${selectedRoute ? "lg:pr-[360px]" : ""}`}>
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex flex-col items-center pt-2">
              <div className="h-4 w-4 rounded-full border border-neutral-500 bg-white" />
              <div className="h-10 w-px bg-neutral-300" />
              <div className="h-4 w-4 rounded-full border border-neutral-500 bg-white" />
            </div>
            <div className="flex-1 space-y-3">
              <input
                className="w-full rounded-xl border border-transparent bg-neutral-50 px-4 py-3 text-base text-neutral-700 outline-none transition focus:border-neutral-300"
                placeholder="Starting location"
                value={startLocation}
                onChange={(event) => setStartLocation(event.target.value)}
              />
              <div className="h-px w-full bg-neutral-200" />
              <input
                className="w-full rounded-xl border border-transparent bg-neutral-50 px-4 py-3 text-base text-neutral-700 outline-none transition focus:border-neutral-300"
                placeholder="Destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white px-6 py-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <input
                type="date"
                className="w-full rounded-xl border border-transparent bg-neutral-50 px-4 py-3 text-sm text-neutral-600 outline-none focus:border-neutral-300"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
              />
            </div>
            <div className="hidden h-10 w-px bg-neutral-200 sm:block" />
            <div className="flex-1">
              <input
                type="time"
                className="w-full rounded-xl border border-transparent bg-neutral-50 px-4 py-3 text-sm text-neutral-600 outline-none focus:border-neutral-300"
                value={departureTime}
                onChange={(event) => setDepartureTime(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Results
        </div>

        <div className="rounded-[32px] bg-white px-4 py-2 shadow-sm">
          {routes.map((route) => (
            <button
              key={route.id}
              type="button"
              onClick={() => setSelectedRouteId(route.id)}
              className={`w-full rounded-2xl px-4 py-4 text-left transition hover:bg-neutral-50 ${
                selectedRouteId === route.id ? "bg-neutral-50" : ""
              }`}
              aria-pressed={selectedRouteId === route.id}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <TrainIcon />
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="rounded-full border border-red-400 px-2 py-0.5 font-semibold text-red-500">
                        {route.line}
                      </span>
                      <span>{route.direction}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-neutral-800">
                      {route.from.time}
                    </div>
                    <div className="text-xs text-neutral-500">{route.from.name}</div>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative h-4 w-full">
                      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-neutral-300" />
                      <div className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-neutral-500 bg-white" />
                      <div className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-neutral-500 bg-white" />
                    </div>
                    <div className="text-xs text-neutral-500">{route.duration}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-neutral-800">
                      {route.to.time}
                    </div>
                    <div className="text-xs text-neutral-500">{route.to.name}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-px w-full bg-neutral-200" />
            </button>
          ))}
        </div>
      </div>

      {selectedRoute && (
        <FastestPathRouteDetails
          route={selectedRoute}
          onClose={() => setSelectedRouteId(null)}
        />
      )}
    </section>
  );
};

const TrainIcon = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 text-blue-600">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 10h10" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="18" r="1.5" fill="currentColor" />
      <circle cx="15" cy="18" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

export default FastestPathSearch;
