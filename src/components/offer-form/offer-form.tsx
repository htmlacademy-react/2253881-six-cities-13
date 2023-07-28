import React, { useState } from 'react';
import StarRating from '../star-rating/star-rating';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../../services/token';
import { BASE_BACKEND_URL, APIRoute } from '../../consts';
import { IComment } from '../../types/comments';
import { toast } from 'react-toastify';

interface IForm {
  rating: null | number;
  comment: string;
}
interface IOfferFormProps {
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}

const OfferForm: React.FC<IOfferFormProps> = ({ setComments }) => {
  const [form, setForm] = useState<IForm>({ rating: null, comment: '' });
  const { id } = useParams();

  const onSubmitFormSendComment = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const token = getToken();

    axios
      .post<IComment>(
        `${BASE_BACKEND_URL + APIRoute.Comments + (id || '')}`,
        form,
        {
          headers: { 'x-token': token },
        }
      )
      .then(({ data }) => {
        setComments((prevComments) => {
          if (prevComments) {
            return [...prevComments, data];
          }
          return [data];
        });

        setForm({ rating: 0, comment: '' });
      })
      .catch(() => {
        if (form.comment.length < 50 && form.comment.length > 0) {
          toast.warn('Комментарий должен содержать не менее 50ти символов');
          return;
        }

        if (form.comment.length > 300) {
          toast.warn('Комментарий должен содержать не более 300т символов');
          return;
        }
        toast.warn('Проверьте форму на корректность');
      });
  };

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
      comment: evt.target.value,
    }));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmitFormSendComment}
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
