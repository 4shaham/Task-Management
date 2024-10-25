


function WeakCallender() {
  
    // Generate week days
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Sample events - replace with your actual events data
    const events = [
      {
        id: 1,
        title: 'Team Meeting',
        start: '09:00',
        end: '10:00',
        color: 'bg-blue-100 text-blue-800',
        day: 1
      },
      {
        id: 2,
        title: 'Project Review',
        start: '14:00',
        end: '15:30',
        color: 'bg-green-100 text-green-800',
        day: 3
      }
    ];
  
  
      // Generate time slots for day/week view
      const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = i.toString().padStart(2, '0');
        return `${hour}:00`;
      });  


  return (
    <div className="flex flex-1 h-[calc(100vh-200px)] overflow-y-auto">
             <div className="w-16 flex-shrink-0 border-r">
               {timeSlots.map((time) => (
                 <div key={time} className="h-20 border-b text-xs text-gray-500 text-right pr-2 pt-1">
                   {time}
                 </div>
               ))}
             </div>
             <div className="flex flex-1">
               {weekDays.map((day, dayIndex) => (
                 <div key={day} className="flex-1 relative border-r">
                   <div className="sticky top-0 bg-gray-50 p-2 border-b text-center">
                     <div className="text-sm font-medium">{day}</div>
                     {/* <div className="text-lg">{new Date(currentDate.getTime() + dayIndex * 24 * 60 * 60 * 1000).getDate()}</div> */}
                   </div>
                   <div className="relative">
                     {timeSlots.map((time) => (
                       <div key={time} className="h-20 border-b border-gray-100 relative">
                         {events.map((event) => (
                           event.start === time && event.day === dayIndex && (
                             <div
                               key={event.id}
                               className={`absolute w-[95%] mx-2 p-2 rounded ${event.color} shadow-sm`}
                               style={{
                                 top: '0',
                                 minHeight: '60px'
                               }}
                             >
                               <div className="text-sm font-medium">{event.title}</div>
                               <div className="text-xs">
                                 {event.start} - {event.end}
                               </div>
                             </div>
                           )
                         ))}
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </div>
  )
}

export default WeakCallender
