import registratedPath from '../images/success.svg';
import notRegistratedPath from '../images/notSuccess.svg';

function InfoTooltip({ isOpen, isRegistrated, onClose }) {
    return (
        <div className={isOpen ? "popup popup_opened" : "popup"}>
            <div className="popup__container infoTooltip">
                <button type="button" className="popup__close-button" onClick={() => onClose()}></button>
                <img src={isRegistrated ? registratedPath : notRegistratedPath} alt={isRegistrated ? "Галочка" : "Крестик"} className="infoTooltip__image" />
                <h2 className="infoTooltip__title">{isRegistrated ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div >
        </div>
    );
}

export default InfoTooltip;