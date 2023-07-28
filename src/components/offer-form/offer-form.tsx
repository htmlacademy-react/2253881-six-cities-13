import React from 'react';
import StarRating from '../star-rating/star-rating';
import { useParams } from 'react-router-dom';
import { IComment } from '../../types/comments';
import useCommentsForm from '../../hooks/use-comments-form';

export interface IForm {
  rating: null | number;
  comment: string;
}

interface IOfferFormProps {
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}

const OfferForm: React.FC<IOfferFormProps> = ({ setComments }) => {
  const { id } = useParams();

  const [sendComment, setForm, form] = useCommentsForm({
    setComments,
    id,
  });

  const starChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState: IForm) => ({
      ...prevState,
      rating: Number(evt.target.value),
    }));
  };

  const textAreaChangeHandler = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prevState: IForm) => ({
      ...prevState,
      comment: evt.target.value,
    }));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={sendComment}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <StarRating starChangeHandler={starChangeHandler} />
      <textarea
        onChange={textAreaChangeHandler}
        value={form.comment}
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
        <button className="reviews__submit form__submit button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
