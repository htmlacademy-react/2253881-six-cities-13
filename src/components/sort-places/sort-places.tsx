import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setSortMethod } from '../../store/offers-slice/offers-slice';
import { getSortMethod } from '../../store/offers-slice/selectors-offers';
import { SortMethod } from '../../consts';
import './sort-places.css';

const SortPlaces: React.FC = () => {
  const dispath = useAppDispatch();
  const currentSort = useAppSelector(getSortMethod);
  const [isSortSelectOpen, setIsSortSelectOpen] = useState<boolean>(false);

  const onClickLi = (sortMethod: SortMethod) => {
    dispath(setSortMethod(sortMethod));
    setIsSortSelectOpen((isOpened) => !isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={() => setIsSortSelectOpen((isOpened) => !isOpened)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {currentSort}
        <svg className="places__sorting-arrow svg-arrow">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isSortSelectOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortMethod).map((el) => (
            <li
              key={`uniue-sort-${el}`}
              className={classNames('places__option', {
                'places__option--active': el === currentSort,
              })}
              tabIndex={0}
              onClick={() => onClickLi(el)}
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SortPlaces;
