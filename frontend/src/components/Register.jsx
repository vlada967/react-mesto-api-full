import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        onRegister(email, password);
        resetForm();
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <div className="register">
                <h2 className="register__welcome">Регистрация</h2>

                <form onSubmit={handleSubmit} className="register__form">
                    <input
                        className="input__text"
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="email-input"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        className="input__text"
                        placeholder="Пароль"
                        id="password"
                        name="password-input"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    <div className="register__button-container">
                        <button type="submit" className="register__button">Зарегистрироваться</button>
                    </div>
                </form>

                <div className="register__signin">
                    <p>Уже зарегистрированы?</p>
                    <Link to="signin" className="register__login-link">Войти</Link>
                </div>
            </div>
        </>
    );
}

export default withRouter(Register); 