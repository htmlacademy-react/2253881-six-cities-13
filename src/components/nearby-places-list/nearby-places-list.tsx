import React from 'react';
import MemoizdeOffersList from '../offers-list/offers-list';
import { IOffer } from '../../types/offers';

interface INearbyPlacesListProps {
  offers: Array<IOffer>;
}

const NearbyPlacesList: React.FC<INearbyPlacesListProps> = ({ offers }) => {
  const editedOffers = [...offers].splice(0, 3);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <MemoizdeOffersList offers={editedOffers} />
      </div>
    </section>
  );
};
export default NearbyPlacesList;
