import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([{ name: "", rating: 0 }]);

  const handleChange = (index, name, value) => {};

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="font-bold text-lg">Skills</div>
      <p>Add your top professional skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between">
            <div>
              <label className="text-xs">Name</label>
              <Input
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full"
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
    </div>
  );
};

export default Skills;
