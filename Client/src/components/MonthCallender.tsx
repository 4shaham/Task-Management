import React from 'react'

function MonthCallender() {
  return (
    <div className="grid grid-cols-7 border-t border-l">
    {/* Day headers */}
    {[
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].map((day) => (
      <div key={day} className="p-2 border-r border-b bg-gray-50">
        <span className="text-sm text-gray-600">{day}</span>
      </div>
    ))}

    {/* Calendar days */}
    {Array.from({ length: 35 }, (_, i) => (
      <div
        key={i}
        className="h-32 p-2 border-r border-b hover:bg-gray-50"
      >
        <span className="text-sm">{(i % 31) + 1}</span>
        {i === 14 && (
          <div className="mt-1">
            <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1">
              9:00 AM - Team Meeting
            </div>
            <div className="bg-green-100 text-green-800 text-xs p-1 rounded">
              2:00 PM - Project Review
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
  )
}

export default MonthCallender
