import { useStore } from "@nanostores/react";
import type { FC } from "react";
import { FilterType } from "src/models/enums";
import { filters } from "src/store";
import { capitalize } from "src/utils/common";
import GenderSelect from "./gender-select";
import StatusSelect from "./status-select";

const Filter: FC<FilterProps> = ({ type }) => {
  const $filters = useStore(filters);

  const changeFilter = (e: any) => {
    filters.set({ ...$filters, [type]: e.target.value });
  };

  if (type === FilterType.GENDER) {
    return <GenderSelect changeFilter={changeFilter} />;
  }

  if (type === FilterType.STATUS) {
    return <StatusSelect changeFilter={changeFilter} />;
  }

  return (
    <input
      name={type}
      type="text"
      className="w-full mb-3 py-2 px-5"
      placeholder={capitalize(type)}
      autoComplete="off"
      onChange={changeFilter}
    />
  );
};

interface FilterProps {
  type: FilterType;
}

export default Filter;
