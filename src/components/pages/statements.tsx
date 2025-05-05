import React, { useState, useEffect } from "react";
import Header from "../Header";
import { useForm } from 'react-hook-form';

interface Category {
    id: number;
    name: string;
}

interface FormData {
    name: string;
    title: string;
    date: string;
    location: string;
}

export default function Reports() {
    const [activeTab, setActiveTab] = useState<'period' | 'category'>('period');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [favoriteFilter, setFavoriteFilter] = useState<string>('no');

     useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);

            const simulatedCategories: Category[] = [
                { id: 1, name: 'Музыка' },
                { id: 2, name: 'Спорт' },
                { id: 3, name: 'Искусство' },
                { id: 4, name: 'Технологии' },
                { id: 5, name: 'Путешествия' },
            ];

            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setCategories(simulatedCategories);

            } catch (e: any) {
                console.error('Ошибка при получении категорий:', e);
                setError(e.message || 'Ошибка при получении категорий.');
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'category') {
            fetchCategories();
        } else {
            setCategories([]);
        }
    }, [activeTab]);


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFavoriteFilter(event.target.value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => { // Correct type for data parameter
        console.log('Форма отправлена:');
        // Here you can handle the form submission
    };

    return(
        <>
            <Header />
            <div className="event-text">
                <h1 className="title">Отчёты</h1>
            </div>

            <div className="form-report">
                <div className="tab-buttons">
                    <button
                        className={`tab-button ${activeTab === 'period' ? 'bg-[#0A0A0A]' : 'bg-[#272727]'}`}
                        onClick={() => setActiveTab('period')}
                    >
                        За период
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'category' ? 'bg-[#0A0A0A]' : 'bg-[#272727]'}`}
                        onClick={() => setActiveTab('category')}
                    >
                        По категориям
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {activeTab === 'period' && (
                        <>
                            <div className="form-group-report">
                                <label htmlFor="username">Имя пользователя:</label>
                                <input
                                    type="text"
                                    id="username"
                                    {...register('name', { required: 'Имя обязательно' })}
                                />
                            </div>
                            <div className="form-group-report">
                                <label htmlFor="event-name">Название мероприятия:</label>
                                <input
                                    type="text"
                                    id="event-name"
                                    {...register('title', { required: 'Название обязательно' })}
                                />
                            </div>
                            <div className="form-group-report">
                                <label htmlFor="date">Дата:</label>
                                <input
                                    type="date"
                                    id="date"
                                    {...register('date', { required: 'Дата обязательна' })}
                                />
                            </div>
                            <div className="form-group-report">
                                <label htmlFor="location">Место:</label>
                                <input
                                    type="text"
                                    id="location"
                                    {...register('location', { required: 'Место обязательно' })}
                                />
                            </div>
                        </>
                    )}
                    
                    {activeTab === 'category' && (
                        <div className="form-fav">
                        <label htmlFor="category">Категории:</label>
                        {loading && <div>Загрузка категорий...</div>}
                        {error && <div>Ошибка: {error}</div>}
                        <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="all">Все категории</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                
                        <label>Избранное:</label>
                        <div className="form-group">
                            <input
                                type="radio"
                                id="favorite-yes"
                                name="favorite"
                                value="yes"
                                checked={favoriteFilter === 'yes'}
                                onChange={handleFavoriteChange}
                            />
                            <label htmlFor="favorite-yes">Да</label>
                        </div>
                
                        <div className="form-group">
                            <input
                                type="radio"
                                id="favorite-no"
                                name="favorite"
                                value="no"
                                checked={favoriteFilter === 'no'}
                                onChange={handleFavoriteChange}
                            />
                            <label htmlFor="favorite-no">Нет</label>
                        </div>
                    </div>
                    )}
                      <button className="get-report" type="submit">Получить отчёт</button>
                </form>

                {loading && activeTab === 'category' && <div>Загрузка категорий...</div>}
                {error && activeTab === 'category' && <div>Ошибка: {error}</div>}
            </div>
        </>
    )
}