import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setSortMethod } from '../../store/actions';
import { SortMethod } from '../../consts';
import './sort-places.css';

interface ISortPlaces {
  isSortSelectOpen: boolean;
  setIsSortSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortPlaces: React.FC<ISortPlaces> = ({
  isSortSelectOpen,
  setIsSortSelectOpen,
}) => {
  const currentSort = useAppSelector((state) => state.sortMethod);
  const dispath = useAppDispatch();

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
              key={nanoid()}
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
