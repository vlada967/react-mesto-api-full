function ImagePopup({ card, onClose }) {
    return (
        <div className={card.link ? `popup popup_type_image popup_opened` : `popup popup_type_image`}>
            <div className="popup__container-image">
                <button type="button" className="popup__close-button popup__close-button_type_image" onClick={() => onClose()}>
                </button>
                <img src={card.link} alt={card.name} className="popup__image" />
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    );
}
export default ImagePopup;