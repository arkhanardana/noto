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

import PostTask from "./post-task";

type Priority = "LOW" | "MEDIUM" | "HIGH";

const AddTask = ({ onClose }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [add, setAdd] = useState<Date>(new Date());
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-text">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-text">
                Title
              </Label>
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
              <Label htmlFor="desc" className="text-text">
                Description
              </Label>
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
                <Select onValueChange={setPriority}>
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
                  <form>
                    <DialogTrigger asChild>
                      <Button>{FormatDate(add)}</Button>
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
                      <p className="text-center mt-2 text-sm text-text">
                        Selected date:{" "}
                        {date ? FormatDate(date) : FormatDate(add)}
                      </p>
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
        <Button onClick={onClose} variant="neutral" className="text-text">
          Cancel
        </Button>
        <Button
          onClick={() =>
            PostTask(
              title,
              desc,
              "PROGRESS",
              priority,
              add.toISOString(),
              onClose
            )
          }
          type="submit"
          disabled={!title || !desc || !priority || !add}
        >
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddTask;
