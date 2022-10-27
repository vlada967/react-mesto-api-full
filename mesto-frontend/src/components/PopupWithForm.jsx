function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <div className="popup__container">
                <button type="button" className={`popup__close-button popup__close-button_type_${name}`} onClick={() => onClose()}>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}`} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit popup__save-button">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;