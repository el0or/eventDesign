import axios from 'axios';

interface EventData {
    title: string;
    description: string;
    category_id: number;
    event_date: string;
    location: string;
}

export const createEvent = async (eventData: EventData) => {
    try {
        const response = await axios.post('http://localhost:4200/api/events', eventData);
        console.log('Event created:', response.data);
        // Handle successful creation (e.g., update UI)
    } catch (error: any) {
        console.error('Error creating event:', error.response?.data?.error || error.message);
        // Handle error (e.g., show error message to the user)
    }
};

// Пример использования:
const newEventData: EventData = {
    title: 'Новое мероприятие',
    description: 'Описание нового мероприятия',
    category_id: 1,
    event_date: '2024-12-31',
    location: 'Москва',
};

createEvent(newEventData);