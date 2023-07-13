import React, { useState } from 'react';
import StarRating from '../star-rating/star-rating';

interface IForm {
  rating: null | number;
  text: string;
}

const OfferForm: React.FC = () => {
  const [form, setForm] = useState<IForm>({ rating: null, text: '' });

  const starChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      rating: Number(evt.target.value),
    }));
  };

  const textAreaChangeHandler = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prevState) => ({
      ...prevState,
      text: evt.target.value,
    }));
  };

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <StarRating starChangeHandler={starChangeHandler} />
      <textarea
        onChange={textAreaChangeHandler}
        value={form.text}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
