import React, { useMemo } from "react";
import Task from "./Task";

interface IEvent {
  _id: {
    dayOfWeek: number; // 1-7 (Sunday-Saturday)
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
  };
  tasks: {
    title: string;
    description?: string;
    assignedTo: string[];
    startDate: Date;
    endDate?: Date;
    startTime: string;
    endTime: string;
  }[];
}

interface Props {
  event: IEvent[];
}

const WeakCallender: React.FC<Props> = ({ event }) => {
  // Generate week days
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Generate time slots for day/week view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // Filter tasks based on the day of the week and time
  const getTasksForDayAndTime = (dayIndex: number, time: string) => {
    return event
      .filter((dayEvent) => dayEvent._id.dayOfWeek === dayIndex + 1)
      .flatMap((dayEvent) => dayEvent.tasks)
      .filter((task) => task.startTime === time);
  };

  // Memoize tasks for each day and time
  const memoizedTasks = useMemo(() => {
    const tasksByTime = weekDays.map((_, dayIndex) =>
      timeSlots.map((time) => getTasksForDayAndTime(dayIndex, time))
    );
    return tasksByTime;
  }, [event, weekDays, timeSlots]);

  return (
    <div className="flex flex-1 h-[calc(100vh-200px)] overflow-y-auto">
      <div className="w-16 flex-shrink-0 border-r">
        {timeSlots.map((time) => (
          <div
            key={time}
            className="h-20 border-b text-xs text-gray-500 text-right pr-2 pt-1"
          >
            {time}
          </div>
        ))}
      </div>
      <div className="flex flex-1">
        {weekDays.map((day, dayIndex) => (
          <div key={day} className="flex-1 relative border-r">
            <div className="sticky top-0 bg-gray-50 p-2 border-b text-center">
              <div className="text-sm font-medium">{day}</div>
            </div>
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div
                  key={time}
                  className="h-20 border-b border-gray-100 relative"
                >
                  {memoizedTasks[dayIndex][timeIndex].map((task) => (
                    <Task task={task as any} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(WeakCallender);
