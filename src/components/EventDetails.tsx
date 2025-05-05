// EventDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Event {
    id: number;
    title: string;
    description: string;
    image_url: string; // Замените на фактическое название поля с URL картинки
}

const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID из параметров URL
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<Event>(`/api/events/${id}`); // Укажите полный URL, если нужно
                setEvent(response.data);
            } catch (error) {
                console.error('Ошибка при получении мероприятия:', error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>{event.title}</h1>
            <img src={event.image_url} alt={event.title} style={{ maxWidth: '500px' }} />
            <p>{event.description}</p>
            <button onClick={() => {
                // TODO:  Реализовать добавление в избранное
                console.log('Добавить в избранное', event.id);
            }}>Добавить в избранное</button>
        </div>
    );
};

export default EventDetails;