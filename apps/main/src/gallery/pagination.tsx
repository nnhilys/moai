import { useCallback, useState } from "react";
import { Pagination } from "../core";

export const GallerPagination = (): JSX.Element => {
  const [page, setPage_] = useState(5);
  const setPage = useCallback((page: number): Promise<void> => {
    return new Promise((resolve) => {
      setPage_(page);
      window.setTimeout(() => resolve(), 1000);
    });
  }, []);

  return <Pagination value={page} setValue={setPage} max={10} min={1} />;
};
