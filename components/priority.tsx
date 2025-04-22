import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  

const Priority = () => {
  return (
    <Select>
    <SelectTrigger className="">
      <SelectValue placeholder="Level" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="high">High</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="low">Low</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default Priority