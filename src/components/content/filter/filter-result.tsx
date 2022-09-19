import { useStore } from "@nanostores/react";
import { FC, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { ResultInfo } from "src/models/interfaces";
import { filters, resultInfo, results } from "src/store";
import { getRickAndMortyEntitiesWithParams } from "src/utils/api";
import { beautifyText, unbeautifyText } from "src/utils/common";
import ItemCard from "../item-card";

const FilterResult: FC<FilterResultProps> = ({ category, data }) => {
  const scrollableDivRef = useRef(null);
  const $results: any = useStore(results);
  const $resultInfo: ResultInfo = useStore(resultInfo);

  useEffect(() => {
    let unbindListener: any;

    results.set(data.results);
    resultInfo.set(data.info);

    unbindListener = filters.subscribe(async (value) => {
      if (Object.keys(value).length > 0) {
        const result = await getRickAndMortyEntitiesWithParams(
          category.slice(0, category.length - 1),
          value
        );

        if (result.error) {
          results.set([]);
          resultInfo.set({
            count: 0,
            next: null,
            pages: 0,
            prev: null,
          });
        } else {
          if (scrollableDivRef.current) {
            (scrollableDivRef.current as HTMLElement).scrollTo({
              top: 0,
            });
          }

          results.set(result.results);
          resultInfo.set(result.info);
        }
      }
    });

    return () => {
      unbindListener();
    };
  }, []);

  const fetchMoreData = async () => {
    if ($resultInfo.next) {
      const response = await fetch($resultInfo.next);
      const result = await response.json();
      results.set([...$results, ...result.results]);
      resultInfo.set(result.info);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-with-shadow text-5xl font-poppins">
        List of {beautifyText(category)}
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
            className="info-card-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-14 pr-14"
          >
            {$results.map((item: any) => (
              <ItemCard
                key={item.id}
                name={item.name}
                image={item.image}
                url={`/${category}/${item.id}`}
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
