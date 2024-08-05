export interface EventData {
    name: string;
    info: string;
    url: string;
    id: string
    pleaseNote: string
    images: { url: string }[];
    dates: {
        start: {
            dateTime: string;
        };
    };
    seatmap: {
        staticUrl: string
    };
    priceRanges: {
        currency: string,
        max: number,
        min: number,
        type: string
    }[]
}