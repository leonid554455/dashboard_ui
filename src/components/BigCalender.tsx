"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";

// ✅ Локализатор для moment
const localizer = momentLocalizer(moment);

// ✅ Типы для кастомного тулбара
type CustomToolbarProps = {
  label: string;
  onView: (view: View) => void;
  view: View;
  views: View[];
};

const CustomToolbar = ({ label, onView, view, views }: CustomToolbarProps) => {
  return (
    <div className="rbc-toolbar flex items-center px-4 py-2 border-b border-gray-200">
      {/* Label слева, прижат к левому краю */}
      <div
        className="rbc-toolbar-label text-xl font-semibold text-gray-800 "
        style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, flexGrow: 1, textAlign: "left"}}
      >
        {label}
      </div>

      {/* Кнопки выбора вида справа */}
      <div className="rbc-btn-group flex space-x-2">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            className={`${view === v ? "rbc-active" : ""}`}
            onClick={() => onView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1).replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};


const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const views: View[] = ["work_week", "day"];

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div
      className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        backgroundColor: "white",
      }}
    >
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={views}
        view={view}
        onView={handleOnChangeView}
        components={{
          toolbar: (props) => <CustomToolbar {...props} views={views} />,
        }}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        style={{ height: "1060px", padding: "12px" }}
      />

      {/* ✅ Стили прямо в компоненте */}
      <style jsx global>{`
        .rbc-calendar {
          background-color: white;
        }

        .rbc-toolbar {
          padding: 10px 20px;
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
        }

        .rbc-toolbar-label {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
        }

        .rbc-btn-group button {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin: 0 4px;
          padding: 6px 12px;
          font-size: 14px;
          color: #374151;
          transition: all 0.2s ease;
        }

        .rbc-btn-group button:hover {
          background-color: #f3f4f6;
        }

        .rbc-btn-group button.rbc-active {
          background-color: #fae27c;
          color: #111827;
          font-weight: 600;
        }

        /* Сами события */
        .rbc-event {
          background-color: #fae27c !important;
          color: #333 !important;
          transform: translateX(-4px);
          border: none;
          border-radius: 8px;
          padding: 4px 8px;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 90%;
          height: 100%;
          overflow: hidden;
          transition: all 0.2s ease-in-out;

          transform-origin: center center;
        }

        .rbc-event:hover {
          transform: translateX(-4px) scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform-origin: center center;
        }

        .rbc-day-slot .rbc-event {
          margin-left: auto;
          margin-right: auto;
          float: none !important;
        }

        .rbc-time-slot {
          min-height: 40px;
        }

        .rbc-time-content > * + * {
          border-left: 1px solid #e5e7eb;
        }

        .rbc-time-header-content,
        .rbc-timeslot-group {
          border-color: #e5e7eb;
        }

        .rbc-time-gutter {
          font-size: 14px;
          color: #374151;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 4px;
          padding-right: 4px;
        }

        .rbc-time-gutter .rbc-timeslot-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .rbc-time-gutter .rbc-time-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 4px 0;
          font-size: 13px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default BigCalendar;
