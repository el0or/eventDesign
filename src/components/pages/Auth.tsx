import React, { useState } from "react"
import { useNavigate } from "react-router-dom" // Импортируем useNavigate
import "../Auth.css" // Импортируйте CSS файл

export default function Auth() {
  const navigate = useNavigate() // Хук для навигации

  // Импровизированная база данных пользователей (в реальном проекте использовать БД)
  const [users, setUsers] = useState([
    { id: 1, username: "test", password: "password" },
    { id: 2, username: "user2", password: "password2" },
  ])

  // Состояния для управления отображением модальных окон
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  // Состояния для хранения данных формы логина и регистрации
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [registerName, setRegisterName] = useState("")
  const [registerLogin, setRegisterLogin] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")

  // Состояние для отслеживания ошибок авторизации
  const [loginError, setLoginError] = useState("")

  // Функция для открытия модального окна регистрации
  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true)
    setShowLoginModal(false) // Закрываем модальное окно логина, если оно открыто
  }

  // Функция для закрытия модального окна регистрации
  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false)
  }

  // Функция для открытия модального окна логина
  const handleOpenLoginModal = () => {
    setShowLoginModal(true)
    setShowRegisterModal(false) // Закрываем модальное окно регистрации, если оно открыто
  }

  // Функция для закрытия модального окна логина
  const handleCloseLoginModal = () => {
    setShowLoginModal(false)
  }

  // Функция для обработки логина
  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    )

    if (user) {
      // Успешная авторизация (перенаправляем на страницу Event)
      alert("Login successful!")
      setLoginError("")
      handleCloseLoginModal() // Закрываем модальное окно после успешной авторизации
      navigate("/Events") // Перенаправляем на страницу Event
    } else {
      // Неверные учетные данные
      setLoginError("Неверное имя пользователя или пароль")
    }
  }

  // Функция для обработки регистрации
  const handleRegister = (e) => {
    e.preventDefault()
    // Проверка, что логин еще не занят
    if (users.find((u) => u.username === registerLogin)) {
      // Изменено на username
      alert("Логин уже занят.")
      return
    }

    // Создаем нового пользователя (в реальном проекте сохранить в БД)
    const newUser = {
      id: users.length + 1,
      name: registerName,
      username: registerLogin, // Изменено на username
      password: registerPassword,
      email: registerEmail,
    }

    setUsers([...users, newUser])
    alert("Регистрация успешна!")
    handleCloseRegisterModal() // Закрываем модальное окно после успешной регистрации
  }

  return (
    <div className="auth-page">
      <div className="auth">
        <img className="logo" src="./logo.svg" alt="Logo" />

        {/* Кнопка открытия модального окна логина */}
        <button onClick={handleOpenLoginModal}>Войти</button>

        {/* Модальное окно логина */}
        {showLoginModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseLoginModal}>
                &times;
              </span>
              <h2>Вход</h2>
              {loginError && <p className="error">{loginError}</p>}
              <form onSubmit={handleLogin}>
                <label htmlFor="loginUsername">Имя пользователя:</label>
                <input
                  type="text"
                  id="loginUsername"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
                <label htmlFor="loginPassword">Пароль:</label>
                <input
                  type="password"
                  id="loginPassword"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="submit">Войти</button>
                <p>
                  Нет аккаунта?
                  <a href="#" onClick={handleOpenRegisterModal}>
                    Зарегистрироваться
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Модальное окно регистрации */}
        {showRegisterModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseRegisterModal}>
                &times;
              </span>
              <h2>Регистрация</h2>
              <form onSubmit={handleRegister}>
                <label htmlFor="registerName">Имя:</label>
                <input
                  type="text"
                  id="registerName"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />

                <label htmlFor="registerLogin">Логин:</label>
                <input
                  type="text"
                  id="registerLogin"
                  value={registerLogin}
                  onChange={(e) => setRegisterLogin(e.target.value)}
                  required
                />

                <label htmlFor="registerPassword">Пароль:</label>
                <input
                  type="password"
                  id="registerPassword"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />

                <label htmlFor="registerEmail">Email:</label>
                <input
                  type="email"
                  id="registerEmail"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />

                <button type="submit">Зарегистрироваться</button>
                <p>
                  Уже есть аккаунт?
                  <a href="#" onClick={handleOpenLoginModal}>
                    Войти
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}