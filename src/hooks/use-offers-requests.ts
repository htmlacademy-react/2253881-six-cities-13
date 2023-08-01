import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { getCurrentCity } from '../store/offers-slice/selectors-offers';
import { getAllOffers } from '../store/offers-slice/selectors-offers';
import { fetchOffersAction } from '../store/offers-slice/async-offers-actions';
import { getRandomElemsFromArr } from '../services/api';
import { BASE_BACKEND_URL, APIRoute, Path } from '../consts';
import { IOffer, TOneCurrentOffer } from '../types/offers';
import { IComment } from '../types/comments';

const useOffersRequests = () => {
  const [comments, setComments] = useState<Array<IComment>>();
  const [nearbyOffers, setNearbyOffers] = useState<Array<IOffer>>();
  const [currentOffer, setCurrentOffer] = useState<TOneCurrentOffer>();

  const offers = useAppSelector(getAllOffers);
  const activeCity = useAppSelector(getCurrentCity);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    axios
      .all(requests)
      .then((responses) => {
        const currentOfferForNerbyMap = offers.find((el) => el.id === id);

        const nearByOffersSliced = getRandomElemsFromArr(
          responses[1].data as Array<IOffer>,
          3
        );
        const nearbyOffersToSave = [
          ...nearByOffersSliced,
          currentOfferForNerbyMap,
        ];
        setComments(responses[0].data as Array<IComment>);
        setNearbyOffers(nearbyOffersToSave as Array<IOffer>);
        setCurrentOffer(responses[2].data as TOneCurrentOffer);
      })
      .catch(() => {
        navigate(`../${Path.NotFound}`);
      });
  }, [id, activeCity, dispatch, offers, navigate]);

  return {
    comments,
    nearbyOffers,
    currentOffer,
    setComments,
    setCurrentOffer,
  };
};

export default useOffersRequests;
