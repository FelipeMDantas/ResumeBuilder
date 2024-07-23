import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const Education = () => {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;

    setEducationalList(newEntries);
  };

  const onSave = () => {};

  const addEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList });
  }, [educationalList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="font-bold text-lg">Education</div>
      <p>Add your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} />
              </div>

              <div>
                <label>Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)} />
              </div>

              <div>
                <label>Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addEducation}
          >
            + Add Education
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeEducation}
          >
            - Remove Education
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Education;
