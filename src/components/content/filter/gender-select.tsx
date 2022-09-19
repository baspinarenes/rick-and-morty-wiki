import type { FC } from "react";

const GenderSelect: FC<GenderSelectProps> = ({ changeFilter }) => {
  return (
    <select
      name="gender"
      className="w-full mb-2 py-2 px-5"
      onChange={changeFilter}
      defaultValue="gender"
    >
      <option value="gender" disabled>
        Gender
      </option>
      <option value="">All</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
      <option value="genderless">Genderless</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};

interface GenderSelectProps {
  changeFilter: (e: any) => void;
}

export default GenderSelect;
