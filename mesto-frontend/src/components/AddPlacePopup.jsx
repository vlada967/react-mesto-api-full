import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ title, link });
    }

    return (
        <PopupWithForm name='add-card' title='Новое место' isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
            <input
                value={title || ''}
                onChange={handleTitleChange}
                id="title-input"
                type="text"
                placeholder="Название"
                name="popup__title"
                className="popup__text popup__text_type_title"
                required
                minLength="2"
                maxLength="30" />
            <span className="title-input-error popup__error"></span>
            <input
                value={link || ''}
                onChange={handleLinkChange}
                id="url-input"
                type="url"
                placeholder="Ссылка на картинку"
                name="popup__link"
                className="popup__text popup__text_type_link"
                required />
            <span className="url-input-error popup__error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;