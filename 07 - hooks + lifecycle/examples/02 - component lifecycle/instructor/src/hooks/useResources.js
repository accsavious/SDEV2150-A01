import { useEffect, useState } from 'react';


const API_BASE_URL = 'http://localhost:3000';  // our local backend REST API


export function useResources() {
    console.log("firing hook!!!");
    // 1. state
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // so we can conditionally render e.g. loading msg
    const [error, setError]         = useState(null);  // so we can conditionally render error msgs

    // 2. fetch function
    async function fetchResources(signal) {
      // If I'm initiating a fetch, loading/error states should reset
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/resources`,
          {signal}
        );

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

    // 3. effect
    useEffect(
        // param 1: the callback
        () => {
          const controller = new AbortController();
          fetchResources(controller.signal);
          return () => {
            controller.abort();
          };
        },
        // param 2: dependency array
        []  // -> only fire effect when page loads
    );

    // 4. function to refresh data
    function refetch() {
      const controller = new AbortController();
        // from this hook, I also want to return a way to refresh resources
      fetchResources(controller.signal);
    }

    // I'm returning an overall object from this hook that contains:
    return { resources, isLoading, error, refetch };
}