import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";

const Summary = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    summary && setResumeInfo({ ...resumeInfo, summary: summary });
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    toast("Details updated");

    const data = { data: { summary: summary } };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        enabledNext(true), setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="font-bold text-lg">Summary</div>
      <p>Add a summary for your job title</p>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary"
          >
            Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <div className="mt-2 flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default Summary;
