// frontend/src/components/EventForm.tsx
import React, { useState } from 'react';

interface Event {
    event_name: string;
    category_name: string | null;
    event_date: string | null;  // Assuming datetime is string
    location: string | null;
    description: string | null;
    title: string;
    favorite: number | null;
}

interface EventFormProps {
    onCreateEvent: (newEvent: Omit<Event, 'event_id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onCreateEvent }) => {
    const [newEvent, setNewEvent] = useState<Omit<Event, 'event_id'>>({ // Omit event_id
        event_name: '',
        category_name: null,
        event_date: '',
        location: null,
        description: null,
        title: 'Без названия', // Set the default value for title
        favorite: null, // Set the default value for favorite
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateEvent(newEvent);
        setNewEvent({
            event_name: '',
            category_name: null,
            event_date: '',
            location: null,
            description: null,
            title: 'Без названия',
            favorite: null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title (default: Без названия):</label>
            <input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} required />

            <label htmlFor="event_name">Event Name:</label>
            <input type="text" id="event_name" name="event_name" value={newEvent.event_name} onChange={handleInputChange} required />

             <label htmlFor="category_name">Category Name:</label>
             <input type="text" id="category_name" name="category_name" value={newEvent.category_name || ''} onChange={handleInputChange} />

            <label htmlFor="event_date">Event Date:</label>
            <input type="datetime-local" id="event_date" name="event_date" value={newEvent.event_date || ''} onChange={handleInputChange} />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={newEvent.location || ''} onChange={handleInputChange} />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={newEvent.description || ''} onChange={handleInputChange} />

            <label htmlFor="favorite">Favorite:</label>
            <input type="number" id="favorite" name="favorite" value={newEvent.favorite || ''} onChange={handleInputChange} />

            <button type="submit">Create</button>
        </form>
    );
};

export default EventForm;