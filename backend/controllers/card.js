const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch((err) => { next(err); });

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteById = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    if (card.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('Карточка принадлежит другому пользователю');
    } else {
      card.delete().then(() => {
        res.send({ message: 'Карточка успешно удалена' });
      })
        .catch(next);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(`${req.params.cardId} не является корректным id`));
    } else {
      next(err);
    }
  });

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .populate('likes')
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    // return res.send({ data: card });
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(`${req.params.cardId} не является корректным id`));
    } else {
      next(err);
    }
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .populate('likes')
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(`${req.params.cardId} не является корректным id`));
    } else {
      next(err);
    }
  });

module.exports = {
  getCards, createCard, deleteById, likeCard, dislikeCard,
};
