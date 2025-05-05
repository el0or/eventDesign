import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Header from "../Header";
import { useNavigate } from 'react-router-dom';

interface Event {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
    favorite: boolean;
}

export default function Favorite() {
    const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavoriteEvents = async () => {
            setLoading(true);
            setError(null);

            const simulatedEvents: Event[] = [
                {
                    id: 1,
                    title: 'Концерт классической музыки',
                    description: 'Вечер классической музыки',
                    event_date: '2024-07-20',
                    location: 'Большой зал консерватории',
                    favorite: true
                },
                {
                    id: 2,
                    title: 'Футбольный матч: Спартак - Зенит',
                    description: 'Центральный матч тура',
                    event_date: '2024-07-22',
                    location: 'Стадион Открытие Банк Арена',
                    favorite: false
                },
                {
                    id: 3,
                    title: 'Выставка современного искусства',
                    description: 'Лучшие работы молодых художников',
                    event_date: '2024-07-25',
                    location: 'Галерея Третьякова',
                    favorite: true
                },
                {
                    id: 4,
                    title: 'Конференция по AI',
                    description: 'Новинки в мире искусственного интеллекта',
                    event_date: '2024-08-01',
                    location: 'Инновационный центр',
                    favorite: false
                },
            ];

            try {
                await new Promise(resolve => setTimeout(resolve, 500));

                const favorites = simulatedEvents.filter(event => event.favorite);
                setFavoriteEvents(favorites);
            } catch (e: any) {
                console.error('Ошибка при получении избранных событий:', e);
                setError(e.message || 'Ошибка при получении избранных событий.');
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteEvents();
    }, []);

    const handleRemoveFromFavorites = (eventId: number) => {
        setFavoriteEvents(prevEvents =>
            prevEvents.filter(event => event.id !== eventId)
        );
    };

    return (
        <>
            <Header />

            <div className="event-text">
                <h1 className="title">Избранное</h1>
            </div>

            {loading ? (
                <div>Загрузка избранных событий...</div>
            ) : error ? (
                <div>Ошибка: {error}</div>
            ) : favoriteEvents.length > 0 ? (
                <div className="events-grid">
                    {favoriteEvents.map(event => (
                        <div className="event-card" key={event.id}>
                            <h2 className="card-title">{event.title}</h2>
                            <p className="event-description">{event.description.substring(0, 100)}...</p>
                            <p className="event-date">Дата: {event.event_date}</p>
                            <p className="event-location">Место: {event.location}</p>
                            <button
                                className="event-button"
                                onClick={() => navigate(`/event/${event.id}`)} // Use Link to navigate
                            >
                                Подробнее →
                            </button>
                            <button
                                className="event-button remove-button" // Added class for styling
                                onClick={() => handleRemoveFromFavorites(event.id)}
                            >
                                Убрать из избранного
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Нет избранных событий.</div>
            )}
        </>
    );
}