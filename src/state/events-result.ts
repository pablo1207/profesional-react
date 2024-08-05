import { create } from 'zustand';

interface EventResultState {
    data: any[];
    error: any | null;
    isLoading: boolean;
    page: PageEventResultState
    fetchEvents: (params?: string) => Promise<void>;
}

interface PageEventResultState {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
}

const useEventResult = create<EventResultState>((set) => ({
    data: [],
    error: null,
    isLoading: false,
    page: { number: 0, size: 0, totalElements: 0, totalPages: 0 },
    fetchEvents: async (params: string = '') => {
        try {
            set({ isLoading: true });
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params.length ? params : ''}`);
            const eventData = await response.json();
            set({ data: eventData._embedded?.events ?? [], page: eventData.page, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
            console.log(error)
        }
    },
}));

export default useEventResult;