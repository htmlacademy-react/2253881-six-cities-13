import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IOffer } from '../../mocks/offers-types';
import { PATHS_NAMES } from '../../consts';

const OnePlaceCard: React.FC<IOffer> = (props) => {
  const [isHover, setHover] = useState<boolean>(false);

  const mouseEnterHandler = () => {
    setHover(!isHover);
  };

  const { id, title, type, price, isPremium, rating, previewImage } = props;

  const ratingLength = `${(100 / 5) * rating}%`;

  return (
    <article
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseEnterHandler}
      className="cities__card place-card"
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
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
          <Link to={`../${PATHS_NAMES.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OnePlaceCard;
