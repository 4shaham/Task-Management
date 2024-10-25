import IEvens from "../interface/events";


// Generate time slots for day/week view
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

interface Props{
   events:IEvens[]
}

const DayView:React.FC<Props>=({events})=>(

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
    <div className="flex-1 relative">
      <div className="absolute w-full">
        {timeSlots.map((time) => (
          <div key={time} className="h-20 border-b border-gray-100 relative">
            
            {events.map(
              (event) =>
                event.startTime === time && (
                  <div
                    key={event._id}
                    className={`absolute w-[95%] mx-2 p-2 rounded  bg-blue-100 text-blue-800 shadow-sm`}
                    style={{
                      top: "0",
                      minHeight: "60px",
                    }}
                  >
                    <div className="text-sm font-medium">{event.title}</div>
                    <div className="text-xs">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DayView;
