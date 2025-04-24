"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import Priority from "./priority";
import FormatDate from "./ui/format-date";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddTask = ({onClose}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [add, setAdd] = useState<Date | undefined>(new Date())

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" type="name" placeholder="My Title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Priority />
              </div>
              <div className="grid gap-2">
                <Label>Deadline</Label>
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <FormatDate dateString={add} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader>
                        <DialogTitle>Set Date</DialogTitle>
                      </DialogHeader>
                      <Calendar
                        mode="single"
                        selected={add}
                        onSelect={setDate}
                        disabled={(date) => date <= new Date()}
                        className="flex justify-center"
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="neutral" onClick={()=>setAdd(new Date())}>Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                          <Button onClick={()=>setAdd(date)}>Add Date</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="gap-2 flex ml-auto">
        <Button onClick={onClose} variant="neutral" className="">
          Cancel
        </Button>
        <Button onClick={onClose} type="submit" className="">
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddTask;
