import { useCallback, useEffect, useState } from "react";
import { get } from "../utils/api";

export function useGetList<
  T extends {
    id: number;
  }
>(url: string) {
  const [list, setList] = useState<T[]>([]);
  const [error, setError] = useState("");

  const fetchMore = useCallback(
    function () {
      setList((list) => {
        let last_id = list[list.length - 1]?.id || 0;
        get(`${url}?last_id=${last_id}&limit=3`)
          .catch((error) => ({ error: String(error) }))
          .then((json) => {
            console.log("fetch result:", json);
            if (json.error) {
              setError(json.error);
              return;
            }
            if (json.list) {
              setError("");
              setList((list) =>
                Array.from(
                  new Map(
                    [...list, ...json.list].map((item) => [item.id, item])
                  ).values()
                )
              );
              return;
            }
            setError("invalid response: " + JSON.stringify(json));
          });

        return list;
      });
    },
    [url]
  );

  useEffect(fetchMore, [fetchMore]);

  return { list, error, fetchMore };
}
