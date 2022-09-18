import { RICK_AND_MORTY_API_BASE_URL } from "src/models/constants";
import type {
  Character,
  CharacterResponse,
  Episode,
  EpisodeResponse,
  Location,
  LocationResponse,
} from "src/models/interfaces";

export async function getRickAndMortyCategories(): Promise<Array<string>> {
  const response = await fetch(RICK_AND_MORTY_API_BASE_URL);
  const data = await response.json();

  return Object.keys(data);
}

export async function getRickAndMortyCharacter(ids: Array<number>) {
  const response = await fetch(
    `${RICK_AND_MORTY_API_BASE_URL}/character/${ids}`
  );

  return response.json();
}

export async function getRickAndMortyEntitiesWithParams(
  category: string,
  params: Record<string, string>
) {
  if (params.name) {
    params.name = params.name.replaceAll("-", " ");
  }

  const filterParams = new URLSearchParams(params);
  const response = await fetch(
    `${RICK_AND_MORTY_API_BASE_URL}/${category}/?${filterParams}`
  );

  return response.json();
}

export async function getRickAndMortyCharactersWithParams(
  params: Record<string, string>
): Promise<Array<Character>> {
  const response: CharacterResponse = await getRickAndMortyEntitiesWithParams(
    "character",
    params
  );

  return response.results;
}

export async function getRickAndMortyEpisodesWithParams(
  params: Record<string, string>
): Promise<Array<Episode>> {
  const response: EpisodeResponse = await getRickAndMortyEntitiesWithParams(
    "episode",
    params
  );
  return response.results;
}

export async function getRickAndMortyLocationsWithParams(
  params: Record<string, string>
): Promise<Array<Location>> {
  const response: LocationResponse = await getRickAndMortyEntitiesWithParams(
    "location",
    params
  );
  return response.results;
}

export async function getEpisodeName(
  url: string
): Promise<{ name: string; air_date: string; episode: string }> {
  const response = await fetch(url);
  const result: Episode = await response.json();

  return {
    name: result.name,
    air_date: result.air_date,
    episode: result.episode,
  };
}
