import { useEffect, useState } from "react";
const API_BASE_URL = "http://localhost:3000";
export default function useResourceEffect() {
  const [resources, setResources] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchResources(signal) {
    console.log("trust");
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/resources`, { signal });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResources(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchResources(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  function refetch() {
    // from this hook, I also want to return a way to refresh resources
    const controller = new AbortController();
    fetchResources(controller.signal);
  }
  // return an object that contains all the things
  return { resources, isLoading, error, refetch };
}
