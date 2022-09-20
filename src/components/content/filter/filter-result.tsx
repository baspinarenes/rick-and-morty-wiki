import { useStore } from "@nanostores/react";
import { FC, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RESULT_AREA_TITLE } from "src/models/constants";
import type { ResultInfo } from "src/models/interfaces";
import { filters, resultInfo, results } from "src/store";
import { getRickAndMortyEntities } from "src/utils/api";
import { beautifyText } from "src/utils/common";
import ItemCard from "../item-card";

const FilterResult: FC<FilterResultProps> = ({ category, data }) => {
  const scrollableDivRef = useRef(null);
  const $results: any = useStore(results);
  const $resultInfo: ResultInfo = useStore(resultInfo);

  const scrollToTop = () => {
    if (scrollableDivRef.current) {
      (scrollableDivRef.current as HTMLElement).scrollTo({
        top: 0,
      });
    }
  };

  const fetchMoreData = async () => {
    if ($resultInfo.next) {
      const response = await fetch($resultInfo.next);
      const result = await response.json();
      results.set([...$results, ...result.results]);
      resultInfo.set(result.info);
    }
  };

  useEffect(() => {
    let unbindListener: any;

    results.set(data.results);
    resultInfo.set(data.info);

    unbindListener = filters.listen(async (newFilters) => {
      const result = await getRickAndMortyEntities(
        category.slice(0, category.length - 1),
        newFilters
      );

      if (result.error) {
        results.set([]);
        resultInfo.set({
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        });
      } else {
        scrollToTop();

        results.set(result.results);
        resultInfo.set(result.info);
      }
    });

    return () => {
      unbindListener();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-[calc(100vh-20px)] md:h-full">
      <h2 className="text-with-shadow text-5xl font-poppins font-bold">
        {RESULT_AREA_TITLE.replace("{title}", beautifyText(category))}
      </h2>
      <div>
        {$results.length} of {$resultInfo.count} items listed.
      </div>
      {$results.length !== 0 && (
        <div
          ref={scrollableDivRef}
          id="scrollableDiv"
          className="custom-scrollbar"
        >
          <InfiniteScroll
            dataLength={$results.length}
            next={fetchMoreData}
            hasMore={Boolean($resultInfo.next)}
            scrollableTarget="scrollableDiv"
            loader={undefined}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-14 pr-4 md:pr-14"
          >
            {$results.map((item: any) => (
              <ItemCard
                key={item.id}
                name={item.name}
                image={item.image}
                url={`/${category}/${item.id}`}
                episode={item.episode}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

interface FilterResultProps {
  category: string;
  data: any;
}

export default FilterResult;
