import { Input } from "@/components/ui/input";
import { useState } from "react";

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

  const handleChange = (event, index) => {};

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <div className="font-bold text-lg">Professional Experience</div>
        <p>Add your previous job experience</p>
      </div>
      {exprienceList.map((item, index) => (
        <div>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
