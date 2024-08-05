import React, { FC, memo } from 'react'
import { EventItem } from './components/EventItem'
import { useNavigate } from 'react-router-dom';
import { EventData } from '../../interfaces';


export const Events: FC<EventsProps> = memo(({ searchTerm, events }): React.JSX.Element => {

    const navigate = useNavigate();

    const buildData = (): JSX.Element[] => {
        let dataFilter = events;

        if (searchTerm.length > 0) {
            dataFilter = dataFilter.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        return dataFilter.map(e => (
            <EventItem
                key={`event-item-${e.id}`}
                info={e.info}
                name={e.name}
                image={e.images[0]?.url} // Asegura que existe la imagen
                id={e.id}
                onEventClick={() => handleEventItemClick(e.id)}
            />
        ));

    };

    const handleEventItemClick = (id: string): void => {
        navigate(`/detail/${id}`)
    };

    return (
        <>
            {buildData()}
        </>
    )
})

interface EventsProps {
    searchTerm: string
    events: EventData[]
}