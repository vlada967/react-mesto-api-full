import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        onLogin(email, password);
        resetForm();
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    return (
        <div className="login">
            <h2 className="login__welcome">Вход</h2>

            <form onSubmit={handleSubmit} className="login__form">
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

                <button type="submit" className="login__button">Войти</button>
            </form>
        </div>
    );
}

export default withRouter(Login);