import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="deadline">Deadline</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="recent">Recent</SelectItem>
          <SelectItem value="old">Old</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
