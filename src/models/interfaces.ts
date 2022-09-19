export interface ResultInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  url: string;
  created: string;
  episode: Array<string>;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

export interface CharacterResponse {
  info: ResultInfo;
  results: Array<Character>;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
  url: string;
  created: string;
}

export interface EpisodeResult {
  info: ResultInfo;
  results: Array<Episode>;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
  url: string;
  created: string;
}

export interface LocationResult {
  info: ResultInfo;
  results: Array<Location>;
}
