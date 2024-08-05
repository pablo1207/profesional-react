import { useState } from "react";

export const useEventsData = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<any>([])

    const fetchEvents = async (params: string = '') => {
        try {
            const reponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params.length ? params : ''}`);
            const data = await reponse.json();
            setData(data);
            setIsLoading(false);
        } catch (error: any) {
            setError(error);
        }
    };

    return {
        events: data?._embedded?.events ?? [],
        isLoading,
        error,
        page: data.page || {},
        fetchEvents
    }
}



