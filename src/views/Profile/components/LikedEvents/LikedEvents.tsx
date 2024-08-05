import { useEffect, useState } from "react"
import { LIKED_EVENTS_STORAGE_KEY } from "../../../../utils/constants";
import { EventData } from "../../../../interfaces";
import { EventItem } from "../../../../components/Events/components/EventItem";
import { useNavigate } from "react-router-dom";

const getResponseEvents = async (eventId: string): Promise<EventData> => {
    const response: Response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
    const data: EventData = await response.json();
    return data;
};

export const LikedEvents = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const fetchEventDatails = async () => {
            try {
                setIsLoading(true);
                setError({});
                setEvents([]);
                const getItemLiked: string | null = localStorage.getItem(LIKED_EVENTS_STORAGE_KEY);
                const likedEvents = getItemLiked ? JSON.parse(getItemLiked) : [];
                const results: EventData[] = await Promise.all(likedEvents.map((eventId: string) => getResponseEvents(eventId)));
                setEvents(results);
                setIsLoading(false);
                console.log(results);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventDatails();
    }, []);

    const handleEventItemClick = (id: string): void => {
        navigate(`/detail/${id}`)
    };
    const buildData = (): JSX.Element[] => {
        if (events.length === 0) return [];
        return events.map(e => (
            <EventItem
                key={`event-item-${e.id}`}
                info={e.info}
                name={e.name}
                image={e.images[0]?.url}
                id={e.id}
                onEventClick={() => handleEventItemClick(e.id)}
            />
        ));

    };

    if (isLoading) {
        return <div>Cargando Información...</div>
    }


    return (
        <div>
            {buildData()}
        </div>
    )
}