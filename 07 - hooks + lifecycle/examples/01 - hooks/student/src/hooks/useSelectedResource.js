import { useState } from "react";

const KEY = 'selectedResource';

// a useState custom hook
export default function useSelectedResource() {

    const [selectedResource, setSelectedResource] = useState(
        () => {
            const stored = sessionStorage.getItem(KEY);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch {
                    return null;
                }
            }
            return null;
        }
    );

    function updateSelectedResource(resource) {
        
        setSelectedResource(resource);

        if (resource === null) {
            sessionStorage.removeItem(KEY, resource);
        } else {
            sessionStorage.setItem(
                KEY,
                JSON.stringify(resource)
            );
        }
    }

    return [selectedResource, updateSelectedResource];
}