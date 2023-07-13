import React from 'react';

interface IStarRatingProps {
  starChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarRating: React.FC<IStarRatingProps> = ({ starChangeHandler }) => (
  <div className="reviews__rating-form form__rating">
    {[1, 2, 3, 4, 5].map((el) => (
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
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    ))}
  </div>
);

export default StarRating;
