import React from 'react';
import OnePlaceCard from '../one-place-card/one-place-card';
import { IOffer } from '../../mocks/offers-types';

interface IOffersList {
  offers: Array<IOffer>;
}

const OffersList: React.FC<IOffersList> = ({ offers }) =>
  offers.map((el) => <OnePlaceCard key={el.id} {...el} />);

export default OffersList;
