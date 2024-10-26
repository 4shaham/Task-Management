import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ManagerSideBar from "../../components/ManagerSideBar";
import CallenderController from "../../components/CallenderController";
import DayView from "../../components/CallenderDay";
import MonthCallender from "../../components/MonthCallender";
import WeakCallender from "../../components/WeakCallender";
import { getAllTask } from "../../api/user";



const GoogleCalendarUI = () => {

  // const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  // const v:"day" | "week" | "month"=useSelector((state:any)=>state.viewReducer.status)
  console.log("viewMode","djfkdjkfjdkj")
  // const callBack = useCallback((val: "day" | "week" | "month") => {
  //   // setViewMode(val);
  // }, []);

  const viewMode=useSelector((state:any)=>state?.viewReduxer.status)  
  const selectedDate = useSelector((state: any) => state.dateReducer.date) || new Date();
  
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const handleFn = async () => {
      setIsLoading(true);

      let startDate = new Date(selectedDate);
      let endDate = new Date(selectedDate);

      // Set start and end dates based on view mode
      if (viewMode === "month") {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0); // Last day of the month
      } else if (viewMode === "week") {
        const dayOfWeek = selectedDate.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate.setDate(selectedDate.getDate() - daysToMonday);
        endDate.setDate(startDate.getDate() + 6);
      }

      try {
        const response = await getAllTask(startDate, endDate, viewMode);
        setTasks(response.data.task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleFn();
  }, [selectedDate,viewMode]);

  // Loading screen
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white mt-3">
      <div className="flex">
        <ManagerSideBar />

       <main className="flex-1 p-4">
          <CallenderController  />
          {viewMode === "month" && <MonthCallender event={tasks as any} />}
          {viewMode === "day" && <DayView events={tasks} />}
          {viewMode === "week" && <WeakCallender event={tasks} />}
        </main>
      </div>
    </div>
  );
};

export default React.memo(GoogleCalendarUI);
