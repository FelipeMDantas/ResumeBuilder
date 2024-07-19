import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RichTextEditor from "../RichTextEditor";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const Experience = () => {
  const [exprienceList, setExperienceList] = useState([formField]);

  const handleChange = (event, index) => {
    const newEntries = exprienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;

    setExperienceList(newEntries);
  };

  const addExperience = () => {
    setExperienceList([...exprienceList, formField]);
  };

  const removeExperience = () => {
    setExperienceList((exprienceList) => exprienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = exprienceList.slice();
    newEntries[index][name] = e.target.value;

    setExperienceList(newEntries);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <div className="font-bold text-lg">Professional Experience</div>
        <p>Add your previous job experience</p>
        <div>
          {exprienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    type="date"
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    type="date"
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
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
              onClick={addExperience}
            >
              + Add Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeExperience}
            >
              - Remove Experience
            </Button>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;