import type { FC } from "react";
import { GENDER_FILTER_SELECT_PLACEHOLDER } from "src/models/constants";

const optionData = {
  All: "",
  Female: "female",
  Male: "male",
  Genderless: "genderless",
  Unknown: "unknown",
};

const GenderSelect: FC<GenderSelectProps> = ({ changeFilter }) => {
  return (
    <select
      name="gender"
      className="w-full mb-2 py-2 px-5"
      onChange={changeFilter}
      defaultValue="gender"
    >
      <option value="gender" disabled>
        {GENDER_FILTER_SELECT_PLACEHOLDER}
      </option>
      {Object.entries(optionData).map(([text, value]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

interface GenderSelectProps {
  changeFilter: (e: any) => void;
}

export default GenderSelect;
