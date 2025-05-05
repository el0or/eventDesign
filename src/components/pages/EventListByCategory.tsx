// EventListByCategory.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../Header";
import { useNavigate } from 'react-router-dom';

interface Event {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
    categoryId: number;
}

function EventListByCategory() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            const simulatedEvents: Event[] = [
                {
                    id: 1,
                    title: 'Концерт классической музыки',
                    description: 'Вечер классической музыки',
                    event_date: '2024-07-20',
                    location: 'Большой зал консерватории',
                    categoryId: 1
                },
                {
                    id: 2,
                    title: 'Футбольный матч: Спартак - Зенит',
                    description: 'Центральный матч тура',
                    event_date: '2024-07-22',
                    location: 'Стадион Открытие Банк Арена',
                    categoryId: 2
                },
                {
                    id: 3,
                    title: 'Выставка современного искусства',
                    description: 'Лучшие работы молодых художников',
                    event_date: '2024-07-25',
                    location: 'Галерея Третьякова',
                    categoryId: 3
                },
                {
                    id: 4,
                    title: 'Конференция по AI',
                    description: 'Новинки в мире искусственного интеллекта',
                    event_date: '2024-08-01',
                    location: 'Инновационный центр',
                    categoryId: 4
                },
                {
                    id: 5,
                    title: 'Путешествие по Европе',
                    description: 'Автобусный тур по Европе',
                    event_date: '2024-08-10',
                    location: 'Тур начинается в Москве',
                    categoryId: 5
                },
                {
                    id: 6,
                    title: 'Симфонический Оркестр',
                    description: 'Новое представление',
                    event_date: '2024-08-15',
                    location: 'Крокус Сити Холл',
                    categoryId: 1
                },
            ];

            try {
                const filteredEvents = simulatedEvents.filter(event => event.categoryId === Number(categoryId));
                await new Promise(resolve => setTimeout(resolve, 500));
                setEvents(filteredEvents);
            } catch (e: any) {
                console.error('Ошибка при получении событий по категории:', e);
                setError(e.message || 'Ошибка при получении событий.');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchEvents();
        }
    }, [categoryId]);

    return (
        <>
            <Header />
            {loading ? (
                <div>Загрузка событий...</div>
            ) : error ? (
                <div>Ошибка: {error}</div>
            ) : !categoryId ? (
                <div>Неверная категория.</div>
            ) : events.length > 0 ? (
                <div className="events-grid">
                    {events.map(event => (
                        <div className="event-card" key={event.id}>
                            <h2 className="card-title">{event.title}</h2>
                            <p className="event-description">{event.description.substring(0, 100)}...</p>
                            <p className="event-date">Дата: {event.event_date}</p>
                            <p className="event-location">Место: {event.location}</p>
                            <button
                                className="event-button"
                                onClick={() => navigate(`/event/${event.id}`)}
                            >
                                Подробнее →
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Событий в данной категории не найдено.</div>
            )}
        </>
    );
}

export default EventListByCategory;