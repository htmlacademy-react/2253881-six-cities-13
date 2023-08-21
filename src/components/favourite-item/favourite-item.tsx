import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { IOffer } from '../../types/offers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAuthStatus } from '../../store/user-slice/selectors-user';
import { changeFavouriteStatusOffer } from '../../store/offers-slice/async-offers-actions';
import { setFavOffers } from '../../store/offers-slice/offers-slice';
import { Path, AuthorizationStatus } from '../../consts';
import styles from './favourite-item.module.css';
import { getFavOffers } from '../../store/offers-slice/selectors-offers';

type TFavouriteItemProps = IOffer;
const FavouriteItem: React.FC<TFavouriteItemProps> = ({
  id,
  title,
  type,
  price,
  isFavorite,
  isPremium,
  rating,
  previewImage,
}) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const favOffers = useAppSelector(getFavOffers);
  const ratingLength = `${(100 / 5) * rating}%`;

  const changeFavouriteStatus = useCallback(() => {
    dispatch(changeFavouriteStatusOffer({ idOffer: id, isFavorite }));
    dispatch(setFavOffers(favOffers.filter((el) => el.id !== id)));
  }, [dispatch, id, isFavorite, favOffers]);

  return (
    <article className="favorites__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`../${Path.Offer}/${id}`}>
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
