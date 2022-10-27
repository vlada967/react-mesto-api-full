import React from 'react';
import deleteIconPath from '../images/delete-icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
    );
    const likes = card.likes;
    const isLiked = likes?.some(i => i === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={() => handleDeleteClick()}>
                <img src={deleteIconPath} alt="Корзина" className="element__delete-icon" />
            </button>
            <img src={card.link} alt={card.name} className="element__image" onClick={() => handleClick()} />
            <div className="element__info">
                <h2 className="element__subtitle">{card.name}</h2>
                <div className="element__like-cont">
                    <button type="button" className={isLiked ? "element__like element__like_active" : "element__like"} onClick={() => handleLikeClick()} />
                    <p className="element__like-number">{card.likes?.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;