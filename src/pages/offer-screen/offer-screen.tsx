import React, { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import OfferForm from '../../components/offer-form/offer-form';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NearbyPlacesList from '../../components/nearby-places-list/nearby-places-list';
import {
  getCurrentOffer,
  getNearbyOffers,
} from '../../store/offers-slice/selectors-offers';
import { changeFavouriteStatusOffer } from '../../store/offers-slice/async-offers-actions';
import { getAuthStatus } from '../../store/user-slice/selectors-user';
import { AuthorizationStatus } from '../../consts';
import './offer-screen.css';
import classNames from 'classnames';
import { getComments } from '../../store/comments-slice/selectors-offers';
import { setCurrentOffer } from '../../store/offers-slice/offers-slice';
import { setOffersCurrentOfferCommentsThunk } from '../../store/common-async-actions/set-offers-comments-async';
import { useParams } from 'react-router-dom';
import { getStatusLoadingCommon } from '../../store/common-async-actions/selectors-common';

const OfferScreen: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector(getAuthStatus);
  const comments = useAppSelector(getComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const currentOffer = useAppSelector(getCurrentOffer);
  const isLoading = useAppSelector(getStatusLoadingCommon);

  useEffect(() => {
    dispatch(setOffersCurrentOfferCommentsThunk(id as string));
  }, [id, dispatch]);

  const ratingLength = `${(100 / 5) * Math.round(currentOffer?.rating || 0)}%`;

  if (isLoading || currentOffer === null) {
    return (
      <div className="spinner-container-offer">
        <RotatingLines
          strokeColor="lightblue"
          strokeWidth="3"
          animationDuration="0.75"
          width="150"
          visible
        />
      </div>
    );
  }
  const isRenderFormComment = isLogged === AuthorizationStatus.Auth && (
    <OfferForm />
  );

  const changeFavouriteStatus = () => {
    if (currentOffer) {
      dispatch(
        changeFavouriteStatusOffer({
          idOffer: currentOffer?.id,
          isFavorite: currentOffer?.isFavorite,
        })
      );

      dispatch(
        setCurrentOffer({
          ...currentOffer,
          isFavorite: !currentOffer.isFavorite,
        })
      );
    }
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((el) => (
                <div
                  key={`unique-images-offersCurrent-${el}`}
                  className="offer__image-wrapper"
                >
                  <img className="offer__image" src={el} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  onClick={changeFavouriteStatus}
                  className={classNames('offer__bookmark-button', 'button', {
                    'offer__bookmark-button--active':
                      currentOffer.isFavorite &&
                      isLogged === AuthorizationStatus.Auth,
                  })}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingLength }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type[0].toUpperCase() +
                    currentOffer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults}
                  {currentOffer.maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((el) => (
                    <li key={`good-list-${el}`} className="offer__inside-item">
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar host-img"
                      src={currentOffer.host.avatarUrl}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {comments && <ReviewsList comments={comments} />}
                {isRenderFormComment}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map offers={nearbyOffers} selectedPointId={currentOffer.id} />
          </section>
        </section>
        <div className="container">
          <NearbyPlacesList offers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
};

export default OfferScreen;
