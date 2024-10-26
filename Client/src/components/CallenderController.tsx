import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight} from "lucide-react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { format} from "date-fns";
import { dicrement, increment } from "../redux/slice/dateSlice";
import { setView } from "../redux/slice/viewSlice";




const CallenderController =() => {

  const [menuData,setMenuData] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let ar: any = localStorage.getItem("selected");

    if (ar != null) {
      ar = ["week", "day", "month"];
    }
    setMenuData(ar);
  },[]);

  const selectedDate = useSelector((state: any) => state?.dateReducer.date);
  const va=useSelector((state:any)=>state?.viewReduxer.status)
  console.log("data shahahm salam fi1233445", selectedDate);

  const hanldeClickMenu = (values: string, index: number) => {
    
    console.log(index)
    dispatch(setView(values))

    // setMenuData((prevState) => {
    //   const newMenuData = [...prevState];

    //   let temp = newMenuData[0];
    //   newMenuData[0] = newMenuData[index + 1];
    //   newMenuData[index + 1] = temp;

    //   localStorage.setItem("selected", JSON.stringify(newMenuData));
    //   return newMenuData;
    // });
    // callBack(values as "day" | "week" | "month");

  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300">
          Today
        </Button>
        <div className="flex gap-1">
          <Button onClick={() => dispatch(dicrement(va))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => dispatch(increment(va))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-xl font-medium">
          {format(selectedDate, "MMM dd yyyy")}
        </h2>
      </div>
      <div className="flex gap-2">
        <Menu>
          <MenuHandler>
            <Button>{va}</Button>
          </MenuHandler>
          <MenuList>
            {menuData?menuData:["week", "day", "month"].map((values, index) => (
              <MenuItem onClick={() => hanldeClickMenu(values, index)}>
                {values}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default  React.memo(CallenderController)
