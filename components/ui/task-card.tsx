import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Checkbox } from "./checkbox";
import { SquarePen, Trash2, Calendar } from "lucide-react";
import { Badge } from "./badge";

  const TaskCard = () => {
    return (
        <Card className="w-full">
            <Badge className="bg-main">Low</Badge>
            {/* <Badge className="bg-yellow-400">Medium</Badge>
            <Badge className="bg-red-400">High</Badge> */}
        <CardHeader className="flex items-center gap-4">
            <Checkbox className="border-black border-2 w-6 h-6"/>
            <div className="">                
          <CardTitle>My title</CardTitle>
          <CardDescription>
      My Description
    </CardDescription>
            </div>
            <div className="ml-auto flex gap-4">
                <SquarePen/>
                <Trash2/>
            </div>
        </CardHeader>
        <div className="flex items-center">
                <Calendar className="w-4 h-4"/>
            <p className="text-sm">Deadline: 12th April 2025</p>
            </div>
      </Card>
      
    )
  }
  
  export default TaskCard