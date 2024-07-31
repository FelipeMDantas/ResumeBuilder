import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ResumeCardItem = ({ resume }) => {
  return (
    <>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center 
        justify-center h-[280px] rounded-t-lg border-t-4 hover:scale-105 transition-all hover:shadow-md 
        shadow-primary"
          style={{ borderColor: resume?.themeColor }}
        >
          <img src="/cv.png" width={80} height={80} />
        </div>
        <h2 className="text-center my-1 group-hover:scale-105">
          {resume.title}
        </h2>
      </Link>
      <div
        className="border p-3 flex justify-between text-white"
        style={{ background: resume?.themeColor }}
      >
        <h2 className="text-sm">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ResumeCardItem;
