import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Path, AuthorizationStatus } from '../../consts';
import { IOffer } from '../../types/offers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAuthStatus } from '../../store/user-slice/selectors-user';
import { changeFavouriteStatusOffer } from '../../store/offers-slice/async-offers-actions';
import styles from './favourite-item.module.css';

type TFavouriteItemProps = IOffer & {
  setFavOffers: React.Dispatch<React.SetStateAction<IOffer[]>>;
};

const FavouriteItem: React.FC<TFavouriteItemProps> = ({
  id,
  title,
  type,
  price,
  isFavorite,
  isPremium,
  rating,
  previewImage,
  setFavOffers,
}) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const ratingLength = `${(100 / 5) * rating}%`;

  const changeFavouriteStatus = () => {
    dispatch(changeFavouriteStatusOffer({ idOffer: id, isFavorite }));
    setFavOffers((offers) => offers.filter((el) => el.id !== id));
  };

  return (
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
            onClick={changeFavouriteStatus}
            className={classNames('place-card__bookmark-button', 'button', {
              'place-card__bookmark-button--active':
                isFavorite && authStatus === AuthorizationStatus.Auth,
            })}
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
  );
};

export default FavouriteItem;
