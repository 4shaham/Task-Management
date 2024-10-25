import { Button } from "@material-tailwind/react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { Input, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { increment, setDateOf } from "../redux/slice/dateSlice";
import { addTask, getAllEmpoyees } from "../api/user";
import IUser from "../interface/Iuser";

const ManagerSideBar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const [employeeSearch, setEmployeeSearch] = useState<string>("");
  const [employees, setEmployees] = useState<IUser[]>([]);
  //
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedEmployees: [],
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const selectedDate = useSelector((state: any) => state.dateReducer.date);

  // const [tasks, setTasks]=useState([
  //   { id: 1, title: "Complete project", due: "Today", completed: false },
  //   { id: 2, title: "Team meeting", due: "Tomorrow", completed: false },
  //   { id: 3, title: "Review docs", due: format(addMonths(new Date(), 1), 'MMM dd'), completed: false },
  // ]);

  useEffect(() => {
    const hadndleFn = async () => {
      try {
        const response = await getAllEmpoyees();
        setEmployees(response.data.employees);
      } catch (error) {}
    };
    hadndleFn();
  }, []);

  // Calendar Navigation
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Get days for current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days for calendar grid
  const startDate = startOfMonth(currentDate);
  const startWeek = startOfMonth(startDate);
  const endWeek = endOfMonth(monthEnd);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const calendarDays = eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  });

  // Handle date selection
  const handleDateSelect = (date: any) => {
    dispatch(setDateOf(date));
  };

  // const handleSearchChange = async(e:React.ChangeEvent<HTMLInputElement>) => {

  //   // Your logic here
  //     setEmployeeSearch(e.target.value)
  //     // const response=await getAllEmpoyees()
  //     // setEmployees(response.data.employees)
  //     console.log(employees)

  // };

  const handleSubmit = async(e: any) => {

    try {
      e.preventDefault();
      // Handle form submission
      console.log(formData);
      await addTask(formData.title,formData.description,formData.selectedEmployees,new Date(formData.startDate),new Date(formData.endDate),formData.startTime
        ,formData.endTime
      )
      handleOpen();
      alert("successfully added task") 
    } catch (error) {
         
        console.log(error)

    }



  };

  const toggleEmployee = (employeeId: any) => {
    setFormData((prev: any) => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter((id: any) => id !== employeeId)
        : [...prev.selectedEmployees, employeeId],
    }));
  };

  return (
    <aside className="w-64 p-4 border-r border-gray-200 h-[calc(100vh-64px)] flex flex-col bg-white">
      {/* Create Button */}
      <Button
        onClick={handleOpen}
        className="mb-6 shadow-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3"
      >
        <Plus className="h-5 w-5" />
        Create
      </Button>

      <Dialog open={open} handler={handleOpen} size="lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-xl font-medium">
            Create New Task
          </DialogHeader>

          <DialogBody className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {/* Task Title */}
              <div>
                <Input
                  label="Task Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full"
                  required
                  crossOrigin={"crors"}
                />
              </div>

              {/* Task Description */}

              <div>
                <Textarea
                  label="Task Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full"
                  required
                />
              </div>

              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employees
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto">
                  {employees.map((employee) => (
                    <div
                      key={employee._id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                        formData.selectedEmployees.includes(
                          employee._id as never
                        )
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      }`}
                      onClick={() => toggleEmployee(employee._id)}
                    >
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">
                        {employee.managerId}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date & Time */}
                <div className="space-y-4">
                  <div>
                    <Input
                      type="date"
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full"
                      crossOrigin={"cr"}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      label="Start Time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }))
                      }
                      className="w-full"
                      required
                      crossOrigin={"hdi"}
                    />
                  </div>
                </div>

                {/* End Date & Time */}
                <div className="space-y-4">
                  <div>
                    <Input
                      type="date"
                      label="End Date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="w-full"
                      required
                      crossOrigin={"hi"}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      label="End Time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          endTime: e.target.value,
                        }))
                      }
                      className="w-full"
                      required
                      crossOrigin={"hii"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter className="space-x-2">
            <Button variant="text" color="red" onClick={handleOpen}>
              Cancel
            </Button>
            <Button variant="gradient" color="green" type="submit">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Custom Calendar */}
      <div className="bg-white rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-gray-900">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex gap-1">
            <Button
              onClick={prevMonth}
              variant="text"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <Button
              onClick={nextMonth}
              variant="text"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-center text-xs text-gray-500 font-medium py-1"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day, idx) => (
            <button
              key={idx}
              onClick={() => handleDateSelect(day)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-full
                ${
                  !isSameMonth(day, currentDate)
                    ? "text-gray-400"
                    : "text-gray-700"
                }
                ${
                  isSameDay(day, selectedDate)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }
                ${
                  isSameDay(day, new Date()) && !isSameDay(day, selectedDate)
                    ? "border border-blue-600"
                    : ""
                }
              `}
            >
              {format(day, "d")}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date Display */}
      <div className="mb-6 px-2">
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarIcon className="h-4 w-4" />
          <span className="text-sm font-medium">
            Selected: {format(selectedDate, "MMMM d, yyyy")}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default ManagerSideBar;
