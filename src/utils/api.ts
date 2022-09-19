import { RICK_AND_MORTY_API_BASE_URL } from "src/models/constants";
import type {
  Character,
  CharacterResponse,
  Episode,
  EpisodeResult,
  Location,
  LocationResult,
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
  params?: Record<string, string>
) {
  const filterParams = new URLSearchParams(params);
  const response = await fetch(
    `${RICK_AND_MORTY_API_BASE_URL}/${category}/?${filterParams}`
  );

  return response.json();
}

export async function getRickAndMortyCharactersWithParams(id: string) {
  const response = await fetch(
    `${RICK_AND_MORTY_API_BASE_URL}/character/${id}`
  );
  return response.json();
}

export async function getRickAndMortyEpisodesWithParams(id: string) {
  const response = await fetch(`${RICK_AND_MORTY_API_BASE_URL}/episode/${id}`);
  return response.json();
}

export async function getRickAndMortyLocationsWithParams(id: string) {
  const response = await fetch(`${RICK_AND_MORTY_API_BASE_URL}/location/${id}`);
  return response.json();
}

export async function getEpisodeData(url: string): Promise<{
  id: number;
  url: string;
  name: string;
  air_date: string;
  episode: string;
}> {
  const response = await fetch(url);
  const result: Episode = await response.json();

  return {
    id: result.id,
    url: result.url,
    name: result.name,
    air_date: result.air_date,
    episode: result.episode,
  };
}
