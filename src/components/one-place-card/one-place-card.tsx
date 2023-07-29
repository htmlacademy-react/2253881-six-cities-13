import React from 'react';
import { Link } from 'react-router-dom';
import { IOffer } from '../../types/offers';
import { Path } from '../../consts';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './one-place-card.css';

interface OnePlaceCardOffer extends IOffer {
  setActiveOfferId?: React.Dispatch<React.SetStateAction<string>>;
}

const OnePlaceCard: React.FC<OnePlaceCardOffer> = ({
  id,
  title,
  type,
  price,
  isPremium,
  rating,
  previewImage,
  setActiveOfferId,
}) => {
  const isOffer = useLocation().pathname.includes(Path.Offer);

  const mouseStatusEditHandler = () => {
    setActiveOfferId?.(id);
  };

  const ratingLength = `${(100 / 5) * rating}%`;

  // prettier-ignore

  return (
    <article
      onMouseEnter={mouseStatusEditHandler}
      onMouseLeave={mouseStatusEditHandler}
      className={classNames(
        'place-card',
        {
          'cities__card': isOffer,
        },
        { 'near-places__card': !isOffer }
      )}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames('place-card__image-wrapper',
          {'cities__image-wrapper': isOffer},
          {'near-places__image-wrapper': !isOffer}
        )}
      >
        <Link to='#'>
          <img
            className="place-card__image img-card"
            src={previewImage}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon card-bookmark-icon">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingLength }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`../${Path.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OnePlaceCard;
