import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";

const PersonalDetail = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="font-bold text-lg">Personal Details</div>
      <p>Get Started with the basic information</p>
    </div>
  );
};

export default PersonalDetail;
