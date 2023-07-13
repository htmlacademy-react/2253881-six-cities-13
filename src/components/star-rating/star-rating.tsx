import React from 'react';
import { COUNT_STARS } from '../../consts';
import './star-rating.css';

interface IStarRatingProps {
  starChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarRating: React.FC<IStarRatingProps> = ({ starChangeHandler }) => (
  <div className="reviews__rating-form form__rating">
    {COUNT_STARS.map((el) => (
      <>
        <input
          onChange={starChangeHandler}
          className="form__rating-input visually-hidden"
          name="rating"
          value={el}
          id={`${el}-stars`}
          type="radio"
        />
        <label
          htmlFor={`${el}-stars`}
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image starRating">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    ))}
  </div>
);

export default StarRating;
