import { useCallback, useEffect, useState } from "react";

export interface ISearchHistory {
  id: number;
  city: string;
  country: string;
  time: number;
}

const KEY = "SearchHistory";

const fromLocalStorage = (): ISearchHistory[] | null => {
  return JSON.parse(`${window.localStorage.getItem(KEY)}`);
};

const toLocalStorage = (h: ISearchHistory[] | null) => {
  if (h === null) {
    window.localStorage.removeItem(KEY);
    return;
  }

  try {
    window.localStorage.setItem(KEY, JSON.stringify(h));
  } catch (e) {
    console.error("This error might be caused by localStorage out of space", e);
  }
};

const useSearchHistory = () => {
  const [data, setData] = useState<ISearchHistory[]>([]);

  // load history from localStorage
  useEffect(() => {
    const h = fromLocalStorage();
    h && setData(h);
  }, []);

  const clear = useCallback(() => {
    setData([]);
    toLocalStorage(null);
  }, []);

  // prepend
  const add = useCallback((h: Omit<ISearchHistory, "id">) => {
    setData((prev) => {
      // first item has greatest id
      const id = prev.length ? prev[0].id + 1 : 0;
      const newH = [{ ...h, id }, ...prev];
      toLocalStorage(newH);
      return newH;
    });
  }, []);

  const remove = useCallback((id: ISearchHistory["id"]) => {
    setData((prev) => {
      const newH = prev.filter((h) => h.id !== id);
      toLocalStorage(newH);
      return newH;
    });
  }, []);

  return { data, clear, add, remove };
};

export default useSearchHistory;
