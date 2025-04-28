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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import UpdateTask from "./update-task";

type Priority = "LOW" | "MEDIUM" | "HIGH";

const EditTask = ({ onClose, e }) => {
  const [date, setDate] = useState<Date | undefined>(e.deadline);
  const [add, setAdd] = useState(e.deadline);
  const [title, setTitle] = useState(e.title);
  const [desc, setDesc] = useState(e.description);
  const [priority, setPriority] = useState<Priority>(e.priority);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value as Priority); // Type assertion
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="name"
                placeholder="My Title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={desc}
                onChange={handleDescChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select onValueChange={handlePriorityChange} value={priority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="LOW">LOW</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Deadline</Label>
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button className="w-full">{FormatDate(add)}</Button>
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
                          <Button
                            variant="neutral"
                            onClick={() => setAdd(new Date())}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button onClick={() => setAdd(date)}>
                            Add Deadline
                          </Button>
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
        <Button
          onClick={() =>
            UpdateTask(title, desc, e.status, priority, add, onClose, e.id)
          }
          type="submit"
          className=""
        >
          Update Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditTask;
