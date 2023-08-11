import React, { memo } from 'react';
import OnePlaceCard from '../one-place-card/one-place-card';
import { IOffer } from '../../types/offers';

interface IOffersList {
  offers: Array<IOffer>;
  setActiveOfferId?: React.Dispatch<React.SetStateAction<string>>;
}

const OffersList: React.FC<IOffersList> = ({ offers, setActiveOfferId }) =>
  offers.map((el) => (
    <OnePlaceCard key={el.id} {...el} setActiveOfferId={setActiveOfferId} />
  ));

const MemoizdeOffersList = memo(OffersList);

export default MemoizdeOffersList;
