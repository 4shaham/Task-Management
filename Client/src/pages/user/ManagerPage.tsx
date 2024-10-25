import ManagerSideBar from "../../components/ManagerSideBar";
import CallenderController from "../../components/CallenderController";
import DayView from "../../components/CallenderDay";
import MonthCallender from "../../components/MonthCallender";
import WeakCallender from "../../components/WeakCallender";
import { useEffect, useState } from "react";
import { getAllTask } from "../../api/user";
import { useSelector } from "react-redux";
import IEvens from "../../interface/events";

const GoogleCalendarUI = () => {

  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const callBack = (val: "day" | "week" | "month") => {
    setViewMode(val);
  };
  const selectedDate = useSelector((state: any) => state.dateReducer.date);

  const [tasks,setTasks]=useState<any>()

  useEffect(() => {

    const handleFn = async () => {
      let endDate = selectedDate;
      if (viewMode === "month") {
        const startDate = new Date(selectedDate);
        endDate = new Date(startDate.setDate(startDate.getDate() + 30));
      } else if (viewMode === "week") {
        const startDate = new Date(selectedDate);
        endDate = new Date(startDate.setDate(startDate.getDate() + 7));
      } else if (viewMode === "day") {
        endDate = new Date(selectedDate);
      }
       const response=await getAllTask(selectedDate,endDate);
       const tasks: IEvens[] = response.data.task as IEvens[];

       const map: Map<string, IEvens[]> = new Map();

       for(const task of tasks) {
        if(viewMode === "day") {
          if(map.has(task.startTime)) {
            const tasksArray = map.get(task.startTime);
            tasksArray?.push(task);
          }else {
            map.set(task.startTime, [ task ]);
          }
        }
       }
      //  console.log(response.data.task)
       setTasks(Array.from(map));
    };
    handleFn();

  },[selectedDate,viewMode]);



  return (
    <div className="min-h-screen bg-white mt-3">
      <div className="flex">
        <ManagerSideBar />

        {/* Main Calendar Area */}
        <main className="flex-1 p-4">

          <CallenderController callBack={callBack} />

          
          {viewMode == "month" && <MonthCallender />}

          {viewMode == "day" && <DayView events={tasks} />}

          {viewMode == "week" && <WeakCallender />}

          {/* Calendar Grid */}
        </main>
      </div>
    </div>
  );
};

export default GoogleCalendarUI;
