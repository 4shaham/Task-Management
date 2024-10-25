import React from "react";
import Task from "./Task";

interface IEvens {
  title: string;
  startTime: string;
  endTime: string;
  // Add other properties as needed
}

interface Ta {
  _id: string;
  task: IEvens[];
}

interface Props {
  events: Ta[];
}

const DayView: React.FC<Props> = ({ events }) => {
  // Generate time slots for day view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // Helper function to check if a task belongs in a time slot
  const isTaskInTimeSlot = (task: IEvens, timeSlot: string) => {
    const taskHour = task.startTime.split(":")[0];
    const slotHour = timeSlot.split(":")[0];
    return taskHour === slotHour;
  };

  // Helper function to get all tasks for a specific time slot
  const getTasksForTimeSlot = (timeSlot: string) => {
    return events.filter((event) => {
      return event.task.some((task) => isTaskInTimeSlot(task, timeSlot));
    });
  };



  return (
    <div className="flex flex-1 h-[calc(100vh-200px)] overflow-y-auto">
      {/* Time column */}
      <div className="w-16 flex-shrink-0 border-r bg-gray-50">
        {timeSlots.map((time) => (
          <div
            key={time}
            className="h-20 border-b text-xs text-gray-500 text-right pr-2 pt-1 sticky left-0"
          >
            {time}
          </div>
        ))}
      </div>

      {/* Events column */}
      <div className="flex-1 relative">
        <div className="absolute w-full">
          {timeSlots.map((time) => {
            const tasksInSlot = getTasksForTimeSlot(time);
            return (
              <div
                key={time}
                className="h-20 border-b border-gray-100 relative hover:bg-gray-50"
              >
                {tasksInSlot.length > 0 && (
                  <div className="grid grid-cols-7 w-full h-full gap-1 p-1">
                    {tasksInSlot.map((event) =>
                      event.task
                        .filter((task) => isTaskInTimeSlot(task, time))
                        .map((task: any) => (
                          <Task task={task} />

                          //   <div
                          //     key={`${event._id}-${taskIndex}`}
                          //     className={`rounded p-2 ${getBackgroundColor(task.startTime)}
                          //       transition-all duration-200 hover:shadow-md cursor-pointer
                          //       flex flex-col justify-between`}
                          //   >
                          //     <div className="flex flex-col flex-1">
                          //       <div className="text-sm font-medium truncate">
                          //         {task.title}
                          //       </div>
                          //       <div className="text-xs mt-1 opacity-75">
                          //         {task.startTime} - {task.endTime}
                          //       </div>
                          //     </div>
                          //   </div>
                        ))
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Current time indicator */}
          <div
            className="absolute w-full border-t-2 border-red-400 z-10"
            style={{
              top: `${
                new Date().getHours() * 80 + (new Date().getMinutes() / 60) * 80
              }px`,
            }}
          >
            <div className="w-3 h-3 bg-red-400 rounded-full -mt-1.5 -ml-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
