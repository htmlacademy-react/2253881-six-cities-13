import React from 'react';
import OffersList from '../offers-list/offers-list';
import { IOffer } from '../../mocks/offers-types';

interface INearbyPlacesListProps {
  offers: Array<IOffer>;
}

const NearbyPlacesList: React.FC<INearbyPlacesListProps> = ({ offers }) => {
  const editedOffers = [...offers].splice(0, 3);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={editedOffers} />
      </div>
    </section>
  );
};
export default NearbyPlacesList;
