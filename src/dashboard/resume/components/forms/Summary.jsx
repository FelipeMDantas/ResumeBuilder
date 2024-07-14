import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModal";

const prompt = "I am a {jobTitle}. Give me a resume summary within 5 lines.";

const Summary = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();

  useEffect(() => {
    summary && setResumeInfo({ ...resumeInfo, summary: summary });
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const internalPrompt = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(internalPrompt);

    setAiGenerateSummaryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };

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
            className="border-primary text-primary flex gap-2"
            type="button"
            onClick={() => GenerateSummaryFromAI()}
          >
            <Brain className="h-4 w-4" />
            Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div>
              <h2 className="font-bold my-1">Level: {item?.experience}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
