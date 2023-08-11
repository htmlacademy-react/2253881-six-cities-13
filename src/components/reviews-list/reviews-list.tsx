import React from 'react';
import Review from '../review/review';
import { IComment } from '../../types/comments';

interface IReviewsListProps {
  comments: Array<IComment>;
}

const ReviewsList: React.FC<IReviewsListProps> = ({ comments }) => {
  const editedComments = [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {editedComments.map((el) => (
          <Review key={`comment-${el.id}`} {...el} />
        ))}
      </ul>
    </>
  );
};

export default ReviewsList;
