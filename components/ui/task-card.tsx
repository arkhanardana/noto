"use client"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


import { Checkbox } from "./checkbox";
import { SquarePen, Trash2 } from "lucide-react";
import { Badge } from "./badge";
import FormatDate from "./format-date";

  const TaskCard = ({e}) => {
    return (
        <Card className="w-full">
        <CardHeader className="grid gap-4">
            <Badge className={`${e.priority === "LOW" ? "bg-main" : e.priority === "MEDIUM" ? "bg-yellow-400" : "bg-red-400"}`}>{e.priority}</Badge>
          <div className="flex items-center gap-4">

            <Checkbox className="border-black border-2 w-6 h-6"/>
            <div className="">                
          <CardTitle className="text-xl">{e.title}</CardTitle>
          <CardDescription className="text-base">
      {e.description}
    </CardDescription>
            </div>
            <div className="ml-auto flex gap-4">
                <SquarePen/>
                <Trash2/>
            </div>
          </div>
        <div className="flex items-center">
                
            <p className="text-sm flex"><span className="font-semibold mr-1">Deadline:</span>{FormatDate(e.deadline)}</p>
            </div>
        </CardHeader>
      </Card>
      
    )
  }
  
  export default TaskCard