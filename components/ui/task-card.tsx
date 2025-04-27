"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Checkbox } from "./checkbox";
import { SquarePen, Trash2 } from "lucide-react";
import { Badge } from "./badge";
import FormatDate from "./format-date";
import DeleteTask from "../delete-task";
import { UpdateStatus } from "../update-task";
import { useState } from "react";

const TaskCard = ({ e, update }) => {

  const [status, setStatus] = useState(e.status);

  const handleStatus = ()=>{
    if(status === "PROGRESS"){
      setStatus("COMPLETED")
    }else{
      setStatus("PROGRESS")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="grid gap-4">
        <Badge
          className={`${
            e.priority === "LOW"
              ? "bg-main"
              : e.priority === "MEDIUM"
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
        >
          {e.priority}
        </Badge>
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Checkbox className="border-black border-2 w-6 h-6" status={e.status} onStatusChange={handleStatus}/>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure to change status?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will change your task&apos;s status
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => UpdateStatus( status, e.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="">
            <CardTitle className="text-xl">{e.title}</CardTitle>
            <CardDescription className="text-base">
              {e.description}
            </CardDescription>
          </div>
          <div className="ml-auto flex gap-4">
            <SquarePen onClick={update} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 />
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => DeleteTask(e.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm flex">
            <span className="font-semibold mr-1">Deadline:</span>
            {FormatDate(e.deadline)}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default TaskCard;
