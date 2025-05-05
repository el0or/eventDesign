// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactModal from 'react-modal';
// import axios from 'axios';
// import Header from "../Header";


// interface Event {
//     id: number;
//     title: string;
//     description: string;
// }

// interface Category {
//     id: number;
//     name: string;
// }

// interface EventData {
//     category_name: string;
//     event_id: number;
//     id: number;
//     event_name: string;
//     title: string;
//     event_date: string;
//     location: string;
//     description?: string;
//     category: { category_name: string }; 
//     active: boolean;
//     favorite: number;
// }


// const Events: React.FC = () => {
//     const [events, setEvents] = useState<Event[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [newEvent, setNewEvent] = useState<EventData>({
//         category_name: '',
//         event_id: 0,
//         id: 0,
//         event_name: '',
//         title: '',
//         event_date: '',
//         location: '',
//         description: '',
//         category: { category_name: '' }, 
//         active: false,
//         favorite: 0,
//     });
//     const [message, setMessage] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         setLoading(true);
    //         setError(null);

    //         try {
    //             const response = await axios.get<Event[]>('http://localhost:4200/api/events');
    //             console.log("API response:", response);
    //             console.log("API response.data:", response.data); 

    //             setEvents(response.data);
    //         } catch (e: any) {
    //             console.error('Ошибка при получении списка мероприятий:', e);
    //             setError(e.message || 'Ошибка при получении мероприятий.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchEvents();
    // }, []);



//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get<Category[]>('http://localhost:4200/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setMessage('Failed to load categories.');
//             }
//         };

//         if (isModalOpen) {
//             fetchCategories();
//         } else {
//             setCategories([]);
//             setMessage(null);
//         }
//     }, [isModalOpen]);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setMessage(null);
//         setNewEvent({ // Reset the form
//             title: '',
//             description: '',
//             category_id: 0,
//             event_date: '',
//             location: '',
//         });
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setNewEvent({ ...newEvent, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:4200/api/events', newEvent);
//             setMessage(response.data.message);
//             closeModal(); // Close after successful submission

//         } catch (error: any) {
//             console.error('Error creating event:', error);
//             setMessage(error.response?.data?.error || 'Failed to create event.');
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="event-text">
//                 <h1 className="title">Настройки</h1>
//                 <a
//                 onClick={openModal} style={{ cursor: 'pointer' }}
//                 >Добавить мероприяте</a>
//             </div>

//             <ReactModal
//                 isOpen={isModalOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Add Event Modal"
//                 className="Modal"
//                 overlayClassName="Overlay"
//             >
//                 <h2>Добавить новое мероприятие</h2>
//                 {message && <p>{message}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="title">Заголовок:</label>
//                     <input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} required />

//                     <label htmlFor="description">Описание:</label>
//                     <textarea id="description" name="description" value={newEvent.description} onChange={handleInputChange} required />

//                     <label htmlFor="category_id">Категория:</label>
//                     <select id="category_id" name="category_id" value={newEvent.category_id} onChange={handleInputChange} required>
//                         <option value="">Выберите категорию</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.id}>{category.name}</option>
//                         ))}
//                     </select>

//                     <label htmlFor="event_date">Дата:</label>
//                     <input type="date" id="event_date" name="event_date" value={newEvent.event_date} onChange={handleInputChange} required />

//                     <label htmlFor="location">Место проведения:</label>
//                     <input type="text" id="location" name="location" value={newEvent.location} onChange={handleInputChange} required />

//                     <button type="submit">Сохранить</button>
//                     <button type="button" onClick={closeModal}>Отмена</button>
//                 </form>
//             </ReactModal>

//             <div className="events-grid">
//                 {(
//                     events.map(event => (
//                         <div className="event-card" key={event.id}>
//                             <h2 className="card-title">{event.title}</h2>
//                             <p className="event-description">{event.description.substring(0, 100)}...</p>
//                             <button
//                                 className="event-button"
//                                 onClick={() => navigate(`/event/${event.id}`)}
//                             >
//                                 Подробнее →
//                             </button>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </>
//     );
// };

// export default Events;


import React, { useState, useEffect } from 'react';
import Header from "../Header";
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Modal.css';


ReactModal.setAppElement('#root');

interface Event {
    category_name: string;
    event_id: number;
    id: number;
    event_name: string;
    title: string;
    event_date: string;
    location: string;
    description?: string;
    category: { category_name: string };
    active: boolean;
    favorite: number;
}

interface Category {
    id: number;
    name: string;
}

interface EventData {
    event_name: string;
    title: string;
    event_date: string;
    location: string;
    description: string;
    category_name: string;
    active: boolean;
    favorite: number;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: 'Музыка' },
        { id: 2, name: 'Спорт' },
        { id: 3, name: 'Искусство' },
        { id: 4, name: 'Технологии' },
        { id: 5, name: 'Путешествия' },
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState<EventData>({
        event_name: '',
        title: '',
        event_date: '',
        location: '',
        description: '',
        category_name: '',
        active: false,
        favorite: 0,
    });
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            // Simulated Events Data
            const simulatedEvents: Event[] = [
                {
                    category_name: "Музыка",
                    event_id: 101,
                    id: 1,
                    event_name: 'Концерт классической музыки',
                    title: 'Концерт',
                    event_date: '2024-07-20',
                    location: 'Большой зал',
                    description: 'Классика',
                    category: { category_name: "Музыка" },
                    active: true,
                    favorite: 0
                },
                {
                    category_name: "Спорт",
                    event_id: 102,
                    id: 2,
                    event_name: 'Футбольный матч',
                    title: 'Матч',
                    event_date: '2024-08-15',
                    location: 'Стадион',
                    description: 'Футбол',
                    category: { category_name: "Спорт" },
                    active: true,
                    favorite: 0
                },
            ];

            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setEvents(simulatedEvents);
            } catch (e: any) {
                console.error('Ошибка при получении событий:', e);
                setError(e.message || 'Ошибка при получении событий.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessage(null);
        setNewEvent({
            event_name: '',
            title: '',
            event_date: '',
            location: '',
            description: '',
            category_name: '',
            active: false,
            favorite: 0,
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = event.target;
    
        const newValue = type === 'checkbox' ? checked : value; // Checkboxes use `checked`, not `value`
    
        setNewEvent(prevEvent => ({
            ...prevEvent,
            [name]: newValue,  // Just assign the new value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
        const newEventWithId: Event = {
            category_name: newEvent.category_name,
            event_id: newId + 100,  // Example event_id generation
            id: newId,
            event_name: newEvent.event_name,
            title: newEvent.title,
            event_date: newEvent.event_date,
            location: newEvent.location,
            description: newEvent.description,
            category: { category_name: newEvent.category_name },
            active: newEvent.active,
            favorite: newEvent.favorite
        };

        setEvents([...events, newEventWithId]);
        setMessage('Мероприятие успешно добавлено!');
        setTimeout(() => {
            closeModal();
        }, 1500);
    };

    return (
        <>
            <Header />
            <div className="event-text">
                <h1 className="title">Настройки</h1>
                <a
                    onClick={openModal} style={{ cursor: 'pointer' }}
                >Добавить мероприятие</a>
            </div>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Event Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Добавить новое мероприятие</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                     <label htmlFor="event_name">Название события:</label>
                    <input type="text" id="event_name" name="event_name" value={newEvent.event_name} onChange={handleInputChange} required />

                    <label htmlFor="title">Заголовок:</label>
                    <input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} required />

                    <label htmlFor="description">Описание:</label>
                    <textarea id="description" name="description" value={newEvent.description} onChange={handleInputChange} required />

                    <label htmlFor="category_name">Категория:</label>
                    <select id="category_name" name="category_name" value={newEvent.category_name} onChange={handleInputChange} required>
                        <option value="">Выберите категорию</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>

                    <label htmlFor="event_date">Дата:</label>
                    <input type="date" id="event_date" name="event_date" value={newEvent.event_date} onChange={handleInputChange} required />

                    <label htmlFor="location">Место проведения:</label>
                    <input type="text" id="location" name="location" value={newEvent.location} onChange={handleInputChange} required />

                    <label htmlFor="active">Активно:</label>
                    <input type="checkbox" id="active" name="active" checked={newEvent.active} onChange={handleInputChange} />

                    <label htmlFor="favorite">Избранное:</label>
                    <input type="checkbox" id="favorite" name="favorite" checked={newEvent.favorite} onChange={handleInputChange} />

                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={closeModal}>Отмена</button>
                </form>
            </ReactModal>
            {loading ? (
                <div>Загрузка событий...</div>
            ) : error ? (
                <div>Ошибка: {error}</div>
            ) : (
                <div className="events-grid">
                    {events.map(event => (
                        <div className="event-card" key={event.id}>
                            <h2 className="card-title">{event.title}</h2>
                            <p className="event-description">{event.description?.substring(0, 100)}...</p>
                            <p>Категория: {event.category.category_name}</p>
                            <button
                                className="event-button"
                                onClick={() => navigate(`/event/${event.id}`)}
                            >
                                Подробнее →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Events;