import { atom, map } from "nanostores";
import type { FilterType } from "src/models/enums";
import type { Character, Episode, ResultInfo } from "./models/interfaces";

export const filters = map<Record<FilterType, string>>({} as any);
export const results = atom<Array<Character | Episode | Location>>([]);
export const resultInfo = atom<ResultInfo>({} as ResultInfo);
