import type React from "react";
import { STATUS_FILTER_SELECT_PLACEHOLDER } from "src/models/constants";

const optionData = {
  All: "",
  Alive: "alive",
  Dead: "dead",
  Unknown: "unknown",
};

const StatusSelect: React.FC<StatusSelectProps> = ({ changeFilter }) => {
  return (
    <select
      name="status"
      className="w-full mb-2 py-2 px-5 appearance-none"
      onChange={changeFilter}
      defaultValue="status"
    >
      <option value="status" disabled>
        {STATUS_FILTER_SELECT_PLACEHOLDER}
      </option>
      {Object.entries(optionData).map(([text, value]) => (
        <option value={value}>{text}</option>
      ))}
    </select>
  );
};

interface StatusSelectProps {
  changeFilter: (e: any) => void;
}

export default StatusSelect;
