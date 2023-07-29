import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../consts';
import { IOffer } from '../../types/offers';
import styles from './favourite-item.module.css';

type TFavouriteItemProps = IOffer;

const FavouriteItem: React.FC<TFavouriteItemProps> = ({
  id,
  title,
  type,
  price,
  city,
  isPremium,
  rating,
  previewImage,
}) => {
  const ratingLength = `${(100 / 5) * rating}%`;
  return (
    <li
      key={`${id}  ${title}  ${city.name}  ${price}}`}
      className="favorites__locations-items"
    >
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={Path.Main}>
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <article className="favorites__card place-card">
          {isPremium && (
            <div className="place-card__mark">
              <span>Premium</span>
            </div>
          )}

          <div className="favorites__image-wrapper place-card__image-wrapper">
            <Link to="#">
              <img
                className={`${styles.cardImage} place-card__image`}
                src={previewImage}
                alt="Place image"
              />
            </Link>
          </div>
          <div className="favorites__card-info place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button
                className="place-card__bookmark-button place-card__bookmark-button--active button"
                type="button"
              >
                <svg
                  className={`${styles.svgPlaceCardBookmarkIcon} place-card__bookmark-icon`}
                >
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">In bookmarks</span>
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
      </div>
    </li>
  );
};

export default FavouriteItem;
