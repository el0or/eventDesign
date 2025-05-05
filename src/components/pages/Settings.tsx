import { useForm, SubmitHandler } from 'react-hook-form';
import Header from "../Header";

// Define an interface for the form data
interface SettingsFormData {
    password?: string; // make optional
    name?: string; // make optional
    login?: string; // make optional
    email?: string; // make optional
}

export default function Settings() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Add reset
    } = useForm<SettingsFormData>();

    // Optional: Function to handle form submission
    const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
        console.log('Настройки отправлены:', data);
        // You can save the data here or make an API call to update settings
         // After successful update you can reset your form
        // reset();
    };

    return (
        <>
            <Header/>
            <div className="event-text">
                <h1 className="title">Настройки</h1>
            </div>

            <div className="container">
                <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Имя:</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name')}
                        />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="login">Логин:</label>
                        <input
                            type="text"
                            id="login"
                            {...register('login')}
                        />
                        {errors.login && <p className="error-message">{errors.login.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Некорректный e-mail"
                                }
                            })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                      <button className="edit-button" type="submit">Редактировать</button>
                </form>
            </div>
        </>
    );
}