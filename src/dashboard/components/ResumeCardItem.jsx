import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div
        className="p-14  bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg 
        border-t-4"
        style={{ borderColor: resume?.themeColor }}
      >
        <img src="/cv.png" width={80} height={80} />
      </div>
      <h2 className="text-center my-1 group-hover:scale-105">{resume.title}</h2>
    </Link>
  );
};

export default ResumeCardItem;
