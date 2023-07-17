import React from 'react';
import Header from '../../components/header/header';
import FooterFavourite from '../../components/footer-favourite/footer-favourite';
import { Link } from 'react-router-dom';
import { IOffer } from '../../mocks/offers-types';
import { Path } from '../../consts';

interface IFavouriteScreenProps {
  offers: Array<IOffer>;
}

const FavoritesScreen: React.FC<IFavouriteScreenProps> = ({ offers }) => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {offers.map((el) => {
              const ratingLength = `${(100 / 5) * el.rating}%`;
              return (
                <li key={el.id} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{el.city.name}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <article className="favorites__card place-card">
                      {el.isPremium && (
                        <div className="place-card__mark">
                          <span>Premium</span>
                        </div>
                      )}

                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <a href="#">
                          <img
                            className="place-card__image"
                            src={el.previewImage}
                            width="150"
                            height="110"
                            alt="Place image"
                          />
                        </a>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">
                              &euro;{el.price}
                            </b>
                            <span className="place-card__price-text">
                              &#47;&nbsp;night
                            </span>
                          </div>
                          <button
                            className="place-card__bookmark-button place-card__bookmark-button--active button"
                            type="button"
                          >
                            <svg
                              className="place-card__bookmark-icon"
                              width="18"
                              height="19"
                            >
                              <use xlinkHref="#icon-bookmark"></use>
                            </svg>
                            <span className="visually-hidden">
                              In bookmarks
                            </span>
                          </button>
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span style={{ width: ratingLength }}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <Link to={`../${Path.Offer}/${el.id}`}>
                            {el.title}
                          </Link>
                        </h2>
                        <p className="place-card__type">{el.type}</p>
                      </div>
                    </article>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
    <FooterFavourite />
  </div>
);

export default FavoritesScreen;
