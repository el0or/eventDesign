// Category.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Header";

interface Category {
    id: number;
    name: string;
}

function Category() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Импровизированная база данных
        const simulatedCategories: Category[] = [
            { id: 1, name: 'Музыка' },
            { id: 2, name: 'Спорт' },
            { id: 3, name: 'Искусство' },
            { id: 4, name: 'Технологии' },
            { id: 5, name: 'Путешествия' },
        ];

        // Функция для имитации асинхронного запроса
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                // Имитируем задержку запроса (опционально)
                await new Promise(resolve => setTimeout(resolve, 500));

                // Вместо axios.get, просто присваиваем данные
                setCategories(simulatedCategories);
            } catch (e: any) {
                console.error('Ошибка при получении категорий:', e);
                setError(e.message || 'Ошибка при получении категорий.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <Header />
            <div className="category-text">
                <h1 className="title">Категории</h1>
                {loading ? (
                    <div>Загрузка категорий...</div>
                ) : error ? (
                    <div>Ошибка: {error}</div>
                ) : Array.isArray(categories) && categories.length > 0 ? (
                    <div className="category-list">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/category/${category.id}`}
                                className="category-link"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div>Нет категорий.</div>
                )}
            </div>
        </>
    );
}

export default Category;