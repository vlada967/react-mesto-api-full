import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [url, setUrl] = React.useState('');

    function handleUrlChange(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: url,
        });
    }

    return (
        <PopupWithForm title='Обновить аватар' name='edit-avatar' isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
            <input
                value={url || ''}
                onChange={handleUrlChange}
                id="url-avatar-input"
                type="url"
                placeholder="Ссылка на аватар"
                name="popup__link"
                className="popup__text popup__text_type_link"
                required />
            <span className="url-avatar-input-error popup__error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;