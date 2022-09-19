import type React from "react";

const StatusSelect: React.FC<StatusSelectProps> = ({ changeFilter }) => {
  return (
    <select
      name="status"
      className="w-full mb-2 py-2 px-5 appearance-none"
      onChange={changeFilter}
      defaultValue="status"
    >
      <option value="status" disabled>
        Status
      </option>
      <option value="">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};

interface StatusSelectProps {
  changeFilter: (e: any) => void;
}

export default StatusSelect;
