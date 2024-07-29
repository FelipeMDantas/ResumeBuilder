import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([{ name: "", rating: 0 }]);
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;

    setSkillsList(newEntries);
  };

  const addSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const removeSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);

    const data = {
      data: { skills: skillsList.map(({ id, ...rest }) => rest) },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
        toast("Server Error. Try again.");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillsList });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="font-bold text-lg">Skills</div>
      <p>Add your top professional skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between border rounded-lg p-3 mb-2">
            <div>
              <label className="text-xs">Name</label>
              <Input
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full"
                defaultValue={item.name}
              />
            </div>

            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" className="text-primary" onClick={addSkill}>
            + Add Skill
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeSkill}
          >
            - Remove Skill
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
