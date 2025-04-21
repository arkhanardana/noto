import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { LogOut } from "lucide-react"
  
  export default function Profile() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Log out<LogOut className="w-4 h-4 inline-block ml-2"/> </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
  