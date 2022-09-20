import { useStore } from "@nanostores/react";
import type { FC } from "react";
import {
  FILTER_AREA_TITLE,
  SEARCH_EMPTY_LIST_CAPS_IMAGE_PATH,
  SEARCH_FILTERED_LIST_CAPS_IMAGE_PATH,
  SEARCH_FULL_LIST_CAPS_IMAGE_PATH,
} from "src/models/constants";
import type { FilterType } from "src/models/enums";
import { filters, resultInfo } from "src/store";
import Filter from "./filter";

const FilterArea: FC<FilterAreaProps> = ({ filters: filterItems }) => {
  const $resultInfo = useStore(resultInfo);
  const $filters = useStore(filters);

  const getStateCaps = () => {
    if (Object.values($filters)?.every((x) => x === "")) {
      return SEARCH_FULL_LIST_CAPS_IMAGE_PATH;
    } else if ($resultInfo.count === 0) {
      return SEARCH_EMPTY_LIST_CAPS_IMAGE_PATH;
    } else if (Object.keys($filters).length > 0) {
      return SEARCH_FILTERED_LIST_CAPS_IMAGE_PATH;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full md:w-80 h-full">
      <h2 className="text-with-shadow text-5xl font-poppins font-bold">
        {FILTER_AREA_TITLE}
      </h2>
      <div>
        {filterItems.map((filter) => (
          <Filter key={filter} type={filter as FilterType} />
        ))}
      </div>
      <img
        src={getStateCaps()}
        alt="List caps"
        className="mt-auto hidden md:block"
      />
    </div>
  );
};

interface FilterAreaProps {
  filters: Array<string>;
}

export default FilterArea;
