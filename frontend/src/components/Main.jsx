import React from 'react';
import editButtonPath from '../images/edit-button.svg';
import addButtonPath from '../images/add.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__person">
                    <div className="profile__avatar-cont" onClick={() => onEditAvatar()}>
                        <   img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={() => onEditProfile()}>
                                <img src={editButtonPath} alt="Карандаш" className="profile__edit-button-image" />
                            </button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={() => onAddPlace()}>
                    <img src={addButtonPath} alt="Плюс" className="profile__add-button-image" />
                </button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        key={card._id}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;