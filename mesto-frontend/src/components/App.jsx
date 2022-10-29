import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../auth.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
    const [isRegistrated, setIsRegistrated] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const history = useHistory();

    useEffect(() => {
        Promise.all([api.getProfileInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user.data);
                setCards(cards.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIn]);

    useEffect(() => {
        const jwt = localStorage.getItem('token');

        if (jwt) {
            tokenCheck(jwt);
            history.push('/');
        }
    }, [history, loggedIn]);

    function handleCardLike(card) {
        const likes = card.likes;
        const isLiked = likes.some(i => i === currentUser._id);

        api.toggleLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => {
                    return state.map((c) => c._id === card._id ? newCard : c)
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter(c => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function openEditProfilePopup() {
        setIsEditProfilePopupOpen(true);
    }

    function openAddPlacePopup() {
        setIsAddPlacePopupOpen(true);
    }

    function openEditAvatarPopup() {
        setIsEditAvatarPopupOpen(true);
    }

    function openInfoPopup() {
        setIsInfoPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoPopupOpen(false);
        setSelectedCard({ name: '', link: '' })
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser({ name, about }) {
        api.editProfile(name, about)
            .then((user) => {
                setCurrentUser(user.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar({ avatar: link }) {
        api.editAvatar(link)
            .then((user) => {
                setCurrentUser(user.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit({ title, link }) {
        api.addCard(title, link)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogin() {
        setLoggedIn(true);
    }

    function tokenCheck() {
        const jwt = localStorage.getItem('token');

        if (jwt) {
            auth.getContent(jwt).then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                }
            })
                .catch(err => console.log(err));
        }
    }

    function onLogin(email, password) {
        return auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    tokenCheck(localStorage.getItem('token'));
                    handleLogin();
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    function onRegister(email, password) {
        return auth.register(email, password)
            .then((res) => {
                if (res) {
                    setIsRegistrated(true);
                    openInfoPopup();
                    history.push('/signin');
                }
            })
            .catch((err) => {
                setIsRegistrated(false);
                openInfoPopup();
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={userEmail} />
            <Switch>
                <ProtectedRoute
                    exact path="/"
                    loggedIn={loggedIn}
                    onEditProfile={openEditProfilePopup}
                    onAddPlace={openAddPlacePopup}
                    onEditAvatar={openEditAvatarPopup}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    component={Main}
                >
                </ProtectedRoute>
                <Route path="/signup">
                    <Register onRegister={onRegister} />
                    <InfoTooltip isOpen={isInfoPopupOpen} isRegistrated={isRegistrated} onClose={closeAllPopups} />
                </Route>
                <Route path="/signin">
                    <Login onLogin={onLogin} />
                </Route>
                <Route>
                    {loggedIn ? (
                        <Redirect to="/" />
                    ) : (
                            <Redirect to="/signin" />
                        )}
                </Route>
            </Switch>
            <Footer />
            <PopupWithForm title='Вы уверены?' name='confirm' buttonText="Сохранить">
            </PopupWithForm>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} ></AddPlacePopup>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider >
    );
}

export default App;