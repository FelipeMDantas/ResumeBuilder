import { MoreVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const ResumeCardItem = ({ resume }) => {
  const navigation = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);

  const onDelete = () => {}

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
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default ResumeCardItem;
