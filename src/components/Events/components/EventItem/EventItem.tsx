import React, { FC } from 'react'
import styles from './EventItem.module.css'
import { Link } from 'react-router-dom';
import HearthFilled from '../../../../assets//hearth-filled.png';
import HearthUnfilled from '../../../../assets/hearth-unfilled.png';
import { useLikeEvents } from '../../../../hooks';

const {
    eventItemcontainer,
    eventInfoContainer,
    eventName,
    eventInfo,
    seeMoreBotton,
    hearthFilledImage,
    imageContainer
} = styles; //Evitan coliciones

export const EventItem: FC<EventItemProps> = ({ id, info, name, image, onEventClick }) => {
    const { isEventLike, toggleEventLike } = useLikeEvents(id);

    const handleSeeMoreClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        onEventClick(id);
    };

    const handleHearthClick = (): void => {
        toggleEventLike();
    };

    return (
        <div className={eventItemcontainer}>

            <div className={imageContainer}>
                <img src={!isEventLike ? HearthUnfilled : HearthFilled} alt='Heart button' className={hearthFilledImage} onClick={handleHearthClick} role='button' />
                <img src={image} width={200} height={200} />
            </div>
            <div className={eventInfoContainer}>
                <h4 className={eventName}>{name}</h4>
                <p className={eventInfo}>{info}</p>
                <button onClick={handleSeeMoreClick} className={seeMoreBotton}>
                    <Link to={`/detail/${id}`}>
                        Ver mas
                    </Link>
                </button>
            </div>
        </div>
    )
}

interface EventItemProps {
    info: string
    name: string
    image: string
    id: string
    // onEventClick: MouseEventHandler<HTMLButtonElement>;
    onEventClick: (id: string) => void
}