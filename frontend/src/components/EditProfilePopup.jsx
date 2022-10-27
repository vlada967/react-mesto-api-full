import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='edit-profile' isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
            <input
                value={name || ''}
                onChange={handleNameChange}
                id="name-input"
                placeholder="Имя"
                type="text"
                name="popup__name"
                className="popup__text popup__text_type_name"
                required
                minLength="2"
                maxLength="40" />
            <span className="name-input-error popup__error"></span>
            <input
                value={description || ''}
                onChange={handleDescriptionChange}
                id="job-input"
                placeholder="Деятельность"
                type="text"
                name="popup__job"
                className="popup__text popup__text_type_job"
                required
                minLength="2"
                maxLength="200" />
            <span className="job-input-error popup__error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;