import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  hasAutoOverlay: boolean;
  homeCity: string;
  tempScale: OpenWeatherTempScale;
}

export type LocalStorageKeys = keyof LocalStorage;

export const setStoredCities = (cities: string[]): Promise<void> => {
  const values: LocalStorage = {
    cities,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
};

export const getStoredCities = (): Promise<string[]> => {
  const keys: LocalStorageKeys[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (response: LocalStorage) => {
      resolve(response.cities);
    });
  });
};

export const setStoredOptions = (
  options: LocalStorageOptions
): Promise<void> => {
  const values: LocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
};

export const getStoredOptions = (): Promise<LocalStorageOptions> => {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (response: LocalStorage) => {
      resolve(response.options);
    });
  });
};
