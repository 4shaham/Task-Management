import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ManagerSideBar from "../../components/ManagerSideBar";
import CallenderController from "../../components/CallenderController";
import DayView from "../../components/CallenderDay";
import MonthCallender from "../../components/MonthCallender";
import WeakCallender from "../../components/WeakCallender";
import { getAllTask } from "../../api/user";

interface IEvens {
  title: string;
  startTime: string;
  endTime: string;
}

interface Ta {
  _id: string;
  task: IEvens[];
}

const GoogleCalendarUI = () => {
  // const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  // const v:"day" | "week" | "month"=useSelector((state:any)=>state.viewReducer.status)
  console.log("viewMode", "djfkdjkfjdkj");
  // const callBack = useCallback((val: "day" | "week" | "month") => {
  //   // setViewMode(val);
  // }, []);

  const viewMode = useSelector((state: any) => state?.viewReduxer.status);
  const selectedDate =
    useSelector((state: any) => state.dateReducer.date) || new Date();

  const [tasks, setTasks] = useState<any[]>([]);
  const [dayCallander, setDayCallnder] = useState<Ta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFn = async () => {
      setIsLoading(true);
      console.log(isLoading)
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

        if (viewMode == "day") {
          const response = await getAllTask(startDate, endDate, viewMode);
          setDayCallnder(response.data.task);
        } else {
          const response = await getAllTask(startDate, endDate, viewMode);
          setTasks(response.data.task);
        }

      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleFn();
  }, [selectedDate, viewMode]);

  return (
    <div className="min-h-screen bg-white mt-3">
      <div className="flex">
        <ManagerSideBar />
        <main className="flex-1 p-4">
          <CallenderController />
          {viewMode === "month" && <MonthCallender event={tasks as any} />}
          {viewMode === "day" && <DayView events={dayCallander} />}
          {viewMode === "week" && <WeakCallender event={tasks} />}
        </main>
      </div>
    </div>
  );
};

export default React.memo(GoogleCalendarUI);
