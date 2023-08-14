import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setSortMethod } from '../../store/offers-slice/offers-slice';
import { getSortMethod } from '../../store/offers-slice/selectors-offers';
import { SortMethod } from '../../consts';
import './sort-places.css';

const SortPlaces: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getSortMethod);
  const [isSortSelectOpen, setIsSortSelectOpen] = useState<boolean>(false);

  const onClickLi = useCallback(
    (sortMethod: SortMethod) => () => {
      dispatch(setSortMethod(sortMethod));
      setIsSortSelectOpen((isOpened) => !isOpened);
    },
    [dispatch]
  );

  const onClickDocumentHideSort = useCallback(
    (evt: MouseEvent) => {
      if (
        (evt.target as HTMLElement).className !== 'places__option' &&
        (evt.target as HTMLElement).className !== 'places__sorting-type' &&
        isSortSelectOpen
      ) {
        setIsSortSelectOpen(false);
      }
    },
    [isSortSelectOpen]
  );

  useEffect(() => {
    document.addEventListener('click', onClickDocumentHideSort);
    return () => {
      document.removeEventListener('click', onClickDocumentHideSort);
    };
  }, [onClickDocumentHideSort]);

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
              onClick={onClickLi(el)}
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
