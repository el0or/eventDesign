// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// interface Event {
//     id: number;
//     title: string;
//     description: string;
//     image_url: string; // Замените на фактическое название поля с URL картинки
// }

// const EventList: React.FC = () => {
//     const [events, setEvents] = useState<Event[]>([]);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await axios.get<Event[]>('/api/events'); // Укажите полный URL, если нужно
//                 setEvents(response.data);
//             } catch (error) {
//                 console.error('Ошибка при получении списка мероприятий:', error);
//             }
//         };

//         fetchEvents();
//     }, []);

//     return (
//         <div>
//             <h1>Список мероприятий</h1>
//             <ul>
//                 {events.map(event => (
//                     <li key={event.id}>
//                         <Link to={`/event/${event.id}`}>
//                             <img src={event.image_url} alt={event.title} style={{ width: '100px', height: '100px' }} />
//                             {event.title}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default EventList;