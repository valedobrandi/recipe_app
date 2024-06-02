import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const request = await fetch(url);
        const response = await request.json();
        setData(response);
      } catch (err) {
        if (err instanceof Error) setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, loading, setData, setError, setLoading };
}

export default useFetch;
