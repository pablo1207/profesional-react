import { useState } from "react"
import { LIKED_EVENTS_STORAGE_KEY } from "../utils/constants";

const checkIsEventLiked = (eventId: string) => {
    const getItemLiked = localStorage.getItem(LIKED_EVENTS_STORAGE_KEY);
    const likedEvents = getItemLiked ? JSON.parse(getItemLiked) : [];
    return likedEvents.includes(eventId);
};

export const useLikeEvents = (eventId: string) => {
    const [isEventLike, setIsEventLike] = useState<boolean>(checkIsEventLiked(eventId));

    const toggleEventLike = (): void => {
        const getItemLiked: string | null = localStorage.getItem(LIKED_EVENTS_STORAGE_KEY);
        const likedEvents = getItemLiked ? JSON.parse(getItemLiked) : [];
        const eventIndex = likedEvents.indexOf(eventId);
        if (eventIndex !== -1) {
            likedEvents.splice(eventIndex, 1);
            setIsEventLike(false);
        } else {
            likedEvents.push(eventId);
            setIsEventLike(true);
        }
        localStorage.setItem(LIKED_EVENTS_STORAGE_KEY, JSON.stringify(likedEvents));
    }
    return {
        isEventLike,
        toggleEventLike
    }

}