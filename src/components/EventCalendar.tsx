"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Weekly Team Sync",
    time: "10:00 AM - 11:00 AM",
    description: "Discuss weekly progress and blockers with the team.",
  },
  {
    id: 2,
    title: "Design Review",
    time: "2:00 PM - 3:30 PM",
    description: "UI/UX evaluation with product and frontend team.",
  },
  {
    id: 3,
    title: "Client Call",
    time: "5:00 PM - 6:00 PM",
    description: "Present project updates and gather feedback.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white rounded-2xl w-full h-full p-6 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[440px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[18px] font-semibold text-gray-800">Calendar</h1>
        <Image
          src="/moreDark.png"
          alt="More options"
          width={24}
          height={24}
          className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        />
      </div>

      {/* CALENDAR */}
      <div className="rounded-xl overflow-hidden border border-gray-200 mb-5">
        <Calendar
          onChange={onChange}
          value={value}
          locale="en-US"
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2)
          }
          className="w-full custom-calendar"
        />
      </div>

      {/* EVENTS */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] font-semibold text-gray-800">Events</h2>
      </div>

      <div className="flex flex-col gap-4">
        {events.map((event, i) => (
          <div
            key={event.id}
            className={`p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${
              i % 2 === 0 ? "border-t-lamaSky" : "border-t-lamaYellow"
            } border-t-[4px]`}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[15px] font-semibold text-gray-700">
                {event.title}
              </h3>
              <span className="text-[12px] text-gray-400">{event.time}</span>
            </div>
            <p className="text-[13px] text-gray-500">{event.description}</p>
          </div>
        ))}
      </div>

      {/* CUSTOM STYLES */}
      <style jsx global>{`
        .custom-calendar {
          background-color: white;
          border: none;
          font-family: 'Helvetica Neue', sans-serif;
          padding-bottom: 6px; /* Отступ снизу под датами */
        }

        .custom-calendar .react-calendar__navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .custom-calendar .react-calendar__navigation button {
          background: none;
          border: none;
          color: #333;
          font-weight: 600;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
          cursor: pointer;
        }

        .custom-calendar .react-calendar__navigation button:hover {
          background-color: #f3f4f6;
        }

        .custom-calendar .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-size: 11px;
          color: #9ca3af;
          padding-bottom: 4px;
        }

        .custom-calendar .react-calendar__tile {
          padding: 12px;
          font-size: 14px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .custom-calendar .react-calendar__tile--now {
          background: #e0f2fe !important;
          color: #0369a1;
          font-weight: bold;
        }

        .custom-calendar .react-calendar__tile--active {
          background: #3b82f6 !important;
          color: white !important;
        }

        .custom-calendar .react-calendar__tile:hover {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default EventCalendar;
