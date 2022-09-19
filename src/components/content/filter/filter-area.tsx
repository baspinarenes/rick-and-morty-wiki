import { useStore } from "@nanostores/react";
import type { FC } from "react";
import type { FilterType } from "src/models/enums";
import { filters, resultInfo, results } from "src/store";
import Filter from "./filter";

const FilterArea: FC<FilterAreaProps> = ({ filters: filterItems }) => {
  const $resultInfo = useStore(resultInfo);
  const $filters = useStore(filters);

  const getStateCaps = () => {
    if (
      Object.values($filters) &&
      Object.values($filters).every((x) => x === "")
    ) {
      return "/images/full-list-caps.png";
    } else if ($resultInfo.count === 0) {
      return "/images/empty-list-caps.png";
    } else if (Object.keys($filters).length > 0) {
      return "/images/filtered-list-caps.png";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-80 h-full">
      <h2 className="text-with-shadow text-5xl font-poppins">Filter</h2>
      <div>
        {filterItems.map((filter) => (
          <Filter key={filter} type={filter as FilterType} />
        ))}
      </div>
      <img src={getStateCaps()} alt="Full list caps" className="mt-auto" />
    </div>
  );
};

interface FilterAreaProps {
  filters: Array<string>;
}

export default FilterArea;
