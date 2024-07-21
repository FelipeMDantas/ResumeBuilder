import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "../../../../service/AIModal";
import { toast } from "sonner";

const prompt =
  "Position title: {positionTitle}. Provide me with 5-7 bullet points regarding the experience section in my resume" +
  " (neither add experience levels nor return me a JSON array). Give me a result in HTML tags.";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please add a position title.");
      setLoading(false);

      return;
    }

    const aiPrompt = prompt.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );
    const result = await AIChatSession.sendMessage(aiPrompt);
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          onClick={generateSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate with AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
