import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import axios from 'axios';
import { nanoid } from '@reduxjs/toolkit';
import { RotatingLines } from 'react-loader-spinner';
import OfferForm from '../../components/offer-form/offer-form';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NearbyPlacesList from '../../components/nearby-places-list/nearby-places-list';
import { fetchOffersAction } from '../../store/api-actions';
import { IComment } from '../../types/comments';
import { IOffer } from '../../types/offers';
import { TOneCurrentOffer } from '../../types/offers';
import { BASE_BACKEND_URL, APIRoute } from '../../consts';
import './offer-screen.css';

const OfferScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState<Array<IComment>>();
  const [nearbyOffers, setNearbyOffers] = useState<Array<IOffer>>();
  const [currentOffer, setCurrentComment] = useState<TOneCurrentOffer>();
  const { id } = useParams();

  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city);
  const isLoading = useAppSelector((state) => state.loadingStatus);

  useEffect(() => {
    if (!offers.length) {
      dispatch(fetchOffersAction(activeCity));
    }

    const urls = [
      `${BASE_BACKEND_URL + APIRoute.Comments}${id || ''}`,
      `${BASE_BACKEND_URL + APIRoute.Offers}/${id || ''}/nearby`,
      `${BASE_BACKEND_URL + APIRoute.Offers}/${id || ''}`,
    ];

    const requests = urls.map((url) => axios.get(url));

    axios.all(requests).then((responses) => {
      setComments(responses[0].data as Array<IComment>);
      setNearbyOffers(responses[1].data as Array<IOffer>);
      setCurrentComment(responses[2].data as TOneCurrentOffer);
    });
  }, [id, activeCity, dispatch, offers]);

  const ratingLength = `${(100 / 5) * (currentOffer?.rating || 0)}%`;

  if (isLoading) {
    return (
      <div className="spinner-container-offer">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="3"
          animationDuration="0.75"
          width="150"
          visible
        />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.map((el) => (
                <div key={nanoid()} className="offer__image-wrapper">
                  <img className="offer__image" src={el} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer?.title}</h1>
                <button className="offer__bookmark-button button" type="button">
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
                  {currentOffer?.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer?.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{currentOffer?.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer?.goods.map((el) => (
                    <li key={nanoid()} className="offer__inside-item">
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
                      src={currentOffer?.host.avatarUrl}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer?.host.name}
                  </span>
                  {currentOffer?.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer?.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {comments && <ReviewsList comments={comments} />}
                <OfferForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            {nearbyOffers && <Map offers={nearbyOffers} />}
          </section>
        </section>
        <div className="container">
          {nearbyOffers && <NearbyPlacesList offers={nearbyOffers} />}
        </div>
      </main>
    </div>
  );
};

export default OfferScreen;
