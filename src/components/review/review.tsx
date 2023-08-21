import React from 'react';
import { IComment } from '../../types/comments';
import './review.css';

const Review: React.FC<IComment> = ({ date, user, comment, rating }) => {
  const ratingLength = `${(100 / 5) * rating}%`;

  const editedDate = new Date(date).toLocaleDateString('en-Us', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div
          data-testid="container-img"
          className="reviews__avatar-wrapper user__avatar-wrapper"
        >
          <img
            className="reviews__avatar user__avatar img-size"
            src={user.avatarUrl}
            alt="Reviews avatar"
            data-testid="image"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingLength }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time">{editedDate}</time>
      </div>
    </li>
  );
};

export default Review;
