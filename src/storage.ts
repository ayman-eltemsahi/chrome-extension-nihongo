// export const getItem = (key: string) =>
//   new Promise((res) => chrome.storage.local.get([key], (result) => res(result?.[key])));

// export const setItem = (key: string, value: string) =>
//   new Promise((res) => chrome.storage.local.set({ [key]: value }, () => res(value)));

// MOCKED
export const getItem = async (_key: string) => undefined;

// MOCKED
export const setItem = async (_key: string, value: string) => value;
