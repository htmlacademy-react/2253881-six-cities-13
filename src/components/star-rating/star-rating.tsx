import React from 'react';
import { COUNT_STARS } from '../../consts';
import './star-rating.css';

interface IStarRatingProps {
  starChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  startValue: number | null;
  isLoading: boolean;
}

const StarRating: React.FC<IStarRatingProps> = ({
  starChangeHandler,
  startValue,
  isLoading,
}) => (
  <div className="reviews__rating-form form__rating">
    {COUNT_STARS.map((el) => (
      <React.Fragment key={`star-number-${el[0]}`}>
        <input
          data-testid="input_test"
          onChange={starChangeHandler}
          className="form__rating-input visually-hidden"
          name="rating"
          value={el[0]}
          disabled={isLoading}
          id={`${el[0]}-stars`}
          type="radio"
          checked={startValue === el[0]}
        />
        <label
          htmlFor={`${el[0]}-stars`}
          className="reviews__rating-label form__rating-label"
          title={el[1] as string}
        >
          <svg className="form__star-image starRating">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>
    ))}
  </div>
);

export default StarRating;
