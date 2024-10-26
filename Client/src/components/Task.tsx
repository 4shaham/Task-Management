import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
  IconButton,
} from "@material-tailwind/react";
import { Pencil, Trash2, Clock, Calendar, User} from "lucide-react";
import { useSelector } from "react-redux";

interface IEvens {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "completed" | "pending" | "in-progress";
  assignedTo?: string;
  priority?: "high" | "medium" | "low";
  dueDate?: string;
}

interface Props {
  task: IEvens;
  onUpdate?: (taskId: string, updatedData: Partial<IEvens>) => Promise<void>;
  onDelete?: (taskId: string) => Promise<void>;
}

const Task: React.FC<Props> = ({task,onUpdate,onDelete }) => {

  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [editedTask, setEditedTask] = React.useState<IEvens>(task);
  const role = useSelector(
    (state: any) => state.userReducer.userAuthStatus.role
  );

  const handleOpen = () => setOpen(!open);

  const getStatusColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

 


  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleSave = async () => {
    try {
      setLoading(true);
      if (onUpdate) {
        await onUpdate(task._id, editedTask);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {

    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setLoading(true);
        if (onDelete) {
          await onDelete(task._id);
        }
        handleOpen();
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setLoading(false);
      }
    }

  };


  const handleInputChange = (
    e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>{

    const { name, value } = e.target;
    setEditedTask((prev)=>({ ...prev,[name]:value}));

  };


  return (

    <div>

      {/* Task Card */}

      <div
        className={`rounded p-2 transition-all duration-200 hover:shadow-md cursor-pointer
          flex flex-col justify-between ${getStatusColor()}`}
        onClick={handleOpen}
      >
        <div className="flex flex-col flex-1">
          <div className="text-sm font-medium truncate">{task.title}</div>
          <div className="text-xs mt-1 opacity-75">
            {task.startTime} - {task.endTime}
          </div>
        </div>
      </div>

      {/* Task Modal */}

      <Dialog open={open} handler={handleOpen} size="lg">

        <DialogHeader className="flex justify-between items-center">

          <div className="flex items-center gap-4">

            {!isEditing ? (
              <>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}
                >
                  {task.status}
                </span>
              </>
            ) : (
              <Input
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                className="w-64"
                label="Task Title"
                crossOrigin={"crossorgin"}
              />
              
            )}
          </div>
          <div className="flex gap-2">
            {!isEditing && role=="Manager" && (
              <>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4" />
              </IconButton>
              <IconButton
              variant="text"
              color="red"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
              </>
              
            )}
            
          </div>
        </DialogHeader>

        <DialogBody className="overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Time and Date Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                {!isEditing ? (
                  <span>
                    {task.startTime} - {task.endTime}
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      name="startTime"
                      type="time"
                      value={editedTask.startTime}
                      onChange={handleInputChange}
                      label="Start Time"
                      crossOrigin={"crossorgin"}
                    />
                    <Input
                      name="endTime"
                      type="time"
                      value={editedTask.endTime}
                      onChange={handleInputChange}
                      label="End Time"
                      crossOrigin={"crossorgin"}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                {!isEditing ? (
                  <span>{task.dueDate || "No due date"}</span>
                ) : (
                  <Input
                    name="dueDate"
                    type="date"
                    value={editedTask.dueDate}
                    onChange={handleInputChange}
                    label="Due Date"
                    crossOrigin={"crossorgin"}
                  />
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <h4 className="font-medium">Description</h4>
              {!isEditing ? (
                <p className="text-gray-600">{task.description}</p>
              ) : (
                <Textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  label="Description"
                  rows={4}
                />
              )}
            </div>

            {/* Status and Priority Section */}
            {isEditing && (
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Status"
                  value={editedTask.status}
                  onChange={(value) =>
                    setEditedTask((prev) => ({ ...prev, status: value as any }))
                  }
                >
                  <Option value="pending">Pending</Option>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="completed">Completed</Option>
                </Select>
                
              </div>
            )}

            {/* Assignment Section */}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              {!isEditing ? (
                <span>{task.assignedTo || "Unassigned"}</span>
              ) : (
                <Input
                  name="assignedTo"
                  value={editedTask.assignedTo}
                  onChange={handleInputChange}
                  label="Assigned To"
                  crossOrigin={"crossorign"}
                />
              )}
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                color="red"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen}
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Task;