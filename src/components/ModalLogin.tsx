import React from 'react';
import ReactModal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ModalLoginProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface LoginFormValues {
    username?: string;
    password?: string;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isOpen, onRequestClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        console.log('Login submitted:', data);
        // Add your login logic here (e.g., API call)
    };

    const handleGuestLogin = () => {
        console.log('Guest login clicked');
        // Add your guest login logic here
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Login Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <div className="head">
                <div className="head-text">
                    <h1>Вход</h1>
                   {/*  Removed registration link, it should be in Auth page now */}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Логин</label>
                        <input
                            type="text" // Changed to text to allow username
                            id="username"
                            placeholder="alex337"
                            {...register('username', { required: 'Логин обязателен' })} // Added validation
                        />
                        {errors.username && <p className="error-message">{errors.username.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password" // Changed to password
                            id="password"
                            placeholder="***********"
                            {...register('password', { required: 'Пароль обязателен' })} // Added validation
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    <button type="submit">Войти</button>
                    <button type="button" onClick={handleGuestLogin}>Войти как гость</button>
                </form>
            </div>
        </ReactModal>
    );
};

export default ModalLogin;