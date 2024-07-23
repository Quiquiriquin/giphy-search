import { GifCardType } from "../helpers/gif.translator";

const config = {
  BASE: "https://api.giphy.com/v1",
  API_KEY: "xN6xr9OAHV3Fqymd708Cwxx3y77sfk3N",
  DB: "http://localhost:3001",
};

export type StoredRecordType = {
  id: number;
  search: string;
};

export const SEARCH = (
  search: string,
  offset: number
): Promise<{ meta: any; pagination: any; data: GifCardType[] }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ans = await fetch(
        `${config.BASE}/gifs/search?q=${search}&api_key=${config.API_KEY}&offset=${offset}`
      );
      const data = await ans?.json();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

export const SAVE_SEARCH = (search: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ans = await fetch(`${config.DB}/search`, {
        method: "POST",
        body: JSON.stringify({ search }),
      });
      console.log(ans);
      const data = await ans?.json();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

export const GET_SAVED_SEARCH = (): Promise<{ data: StoredRecordType[] }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ans = await fetch(`${config.DB}/search`);
      const data = await ans?.json();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
