import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

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

  const params = useParams();

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;

    setEducationalList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: { education: educationalList.map(({ id, ...rest }) => rest) },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server error. Please try again.");
      }
    );
  };

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
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>

              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                />
              </div>

              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                />
              </div>

              <div>
                <label>Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  type="date"
                  defaultValue={item?.startDate}
                />
              </div>

              <div className="col-span-2">
                <label>End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  type="date"
                  defaultValue={item?.endDate}
                />
              </div>

              <div>
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
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
