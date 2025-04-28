"use client";

import { ChangeEvent, useState } from "react";
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

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PROGRESS" | "COMPLETED";
  deadline: Date;
};

interface TaskCardProps {
  e: Task;
  onClose: () => void;
}

type Priority = "LOW" | "MEDIUM" | "HIGH";

const EditTask = ({ onClose, e }: TaskCardProps) => {
  const [date, setDate] = useState<Date>(e.deadline);
  const [title, setTitle] = useState(e.title);
  const [desc, setDesc] = useState(e.description);
  const [priority, setPriority] = useState<Priority>(e.priority);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value as Priority);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-text">Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-text">
              Title
            </Label>
            <Input
              id="title"
              type="text"
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
              <Label className="text-text">Priority</Label>
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
              <Label className="text-text">Deadline</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">{FormatDate(date)}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Set Date</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        setDate(selectedDate);
                      }
                    }}
                    disabled={(d) => d <= new Date()}
                    className="flex justify-center"
                  />
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="neutral">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Done</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 flex ml-auto">
        <Button onClick={onClose} variant="neutral" className="text-text">
          Cancel
        </Button>
        <Button
          onClick={() =>
            UpdateTask(title, desc, e.status, priority, date, onClose, e.id)
          }
          type="submit"
          disabled={!title || !desc || !priority || !date}
        >
          Update Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditTask;
