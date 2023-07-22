import React from 'react';
import Review from '../review/review';
import { nanoid } from '@reduxjs/toolkit';
import { IComment } from '../../types/comments';

interface IReviewsListProps {
  comments: Array<IComment>;
}

const ReviewsList: React.FC<IReviewsListProps> = ({ comments }) => (
  <>
    <h2 className="reviews__title">
      Reviews &middot;{' '}
      <span className="reviews__amount">{comments.length}</span>
    </h2>
    <ul className="reviews__list">
      {comments.map((el) => (
        <Review key={nanoid()} {...el} />
      ))}
    </ul>
  </>
);

export default ReviewsList;
