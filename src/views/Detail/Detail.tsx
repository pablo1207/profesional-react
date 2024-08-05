import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { EventData } from '../../interfaces';

const {
    container,
    mainInfoContainer,
    eventImage,
    eventName,
    eventInfo,
    evenDate,
    eventSeatMap,
    eventSeatMapTitle,
    plaseNoteLegend,
    priceRangeLegend
} = style;

const initialEventData: EventData = {
    name: '',
    info: '',
    url: '',
    pleaseNote: '',
    images: [{ url: '' }],
    dates: {
        start: {
            dateTime: ''
        }
    },
    seatmap: {
        staticUrl: ''
    },
    priceRanges: [
    ]
};

export const Detail = (): JSX.Element => {
    const { eventId } = useParams<{ eventId: string }>();
    const [eventData, setEventData] = useState<EventData>(initialEventData);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEventData = async (): Promise<void> => {
            try {
                const response: Response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
                const data: EventData = await response.json();
                setEventData(data);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        if (eventId) {
            fetchEventData();
        }
    }, [eventId]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={container}>
            <div className={mainInfoContainer}>
                {eventData.images?.[0]?.url && (
                    <img src={eventData.images[0].url} alt={eventData.name} className={eventImage} />
                )}
                <h4 className={eventName}>{eventData.name}</h4>
                <p className={eventInfo}>{eventData.info}</p>
                {eventData.dates?.start?.dateTime && (
                    <p className={evenDate}>{format(new Date(eventData.dates.start.dateTime), 'd LLLL yyyy H:mm', { locale: es })}</p>
                )}
            </div>
            <div className={eventSeatMap}>
                <h6 className={eventSeatMapTitle}>Mapa del evento</h6>
                {eventData.seatmap?.staticUrl && (
                    <img src={eventData.seatmap.staticUrl} alt='Seatmap event' />
                )}
                <p className={plaseNoteLegend}>{eventData.pleaseNote}</p>
                <p className={priceRangeLegend}>Rango de precios {eventData.priceRanges?.[0].min}={eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}</p>
            </div>
            <a href={eventData.url}>
                Ir por tus boletos
            </a>
        </div>
    );
};
