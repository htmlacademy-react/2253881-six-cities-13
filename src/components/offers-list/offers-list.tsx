import React from 'react';
import OnePlaceCard from '../one-place-card/one-place-card';
import { IOffer } from '../../mocks/offers-types';

interface IOffersList {
  offers: Array<IOffer>;
  setActiveOfferId?: React.Dispatch<React.SetStateAction<string>>;
}

const OffersList: React.FC<IOffersList> = ({ offers, setActiveOfferId }) =>
  offers.map((el) => (
    <OnePlaceCard key={el.id} {...el} setActiveOfferId={setActiveOfferId} />
  ));

export default OffersList;
