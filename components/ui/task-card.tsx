import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Checkbox } from "./checkbox";
import { SquarePen, Trash2 } from "lucide-react";
import { Badge } from "./badge";

  const TaskCard = () => {
    return (
        <Card className="w-full">
        <CardHeader className="grid gap-4">
            <Badge className="bg-main">Low</Badge>
            {/* <Badge className="bg-yellow-400">Medium</Badge>
            <Badge className="bg-red-400">High</Badge> */}
          <div className="flex items-center gap-4">

            <Checkbox className="border-black border-2 w-6 h-6"/>
            <div className="">                
          <CardTitle className="text-xl">My title</CardTitle>
          <CardDescription className="text-base">
      My Description
    </CardDescription>
            </div>
            <div className="ml-auto flex gap-4">
                <SquarePen/>
                <Trash2/>
            </div>
          </div>
        <div className="flex items-center">
                
            <p className="text-sm flex"><span className="font-semibold mr-1">Deadline:</span>12th April 2025</p>
            </div>
        </CardHeader>
      </Card>
      
    )
  }
  
  export default TaskCard