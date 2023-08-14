import React, { useState, useCallback } from 'react';
import StarRating from '../star-rating/star-rating';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { IForm } from '../../types/common';
import { sendComment } from '../../store/comments-slice/async-comments';
import { getStatusLoadingComments } from '../../store/comments-slice/selectors-offers';

const OfferForm: React.FC = () => {
  const { id } = useParams();
  const isLoading = useAppSelector(getStatusLoadingComments);

  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IForm>({ rating: null, comment: '' });

  const sendCommentOnSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (form.comment.length < 50 && form.comment.length > 0) {
        toast.warn('Комментарий должен содержать не менее 50ти символов');
        return;
      }

      if (form.comment.length > 300) {
        toast.warn('Комментарий должен содержать не более 300т символов');
        return;
      }

      if (!form.rating) {
        toast.warn('Укажите рейтинг');
        return;
      }

      const value = { id: id as string, form };

      dispatch(sendComment(value))
        .unwrap()
        .then(() => setForm({ rating: null, comment: '' }))
        .catch(() => toast.warn('Проверьте форму на корректность'));
    },
    [dispatch, form, id]
  );

  const starChangeHandler = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prevState) => ({
        ...prevState,
        rating: Number(evt.target.value),
      }));
    },
    []
  );

  const textAreaChangeHandler = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prevState) => ({
        ...prevState,
        comment: evt.target.value,
      }));
    },
    []
  );

  const isDisabled =
    form.rating === null ||
    form.comment.length < 50 ||
    form.comment.length > 300 ||
    isLoading;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={sendCommentOnSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <StarRating
        starChangeHandler={starChangeHandler}
        startValue={form.rating}
        isLoading={isLoading}
      />
      <textarea
        onChange={textAreaChangeHandler}
        value={form.comment}
        disabled={isLoading}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          disabled={isDisabled}
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
