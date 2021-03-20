import React from "react";
import { useDispatch } from "react-redux";
import { fetchCards } from "../features/cardSlice";

export default function Pagination({ pageSize, totalCount, name,currentPage }) {
  const pageCount = Math.ceil(totalCount / pageSize);
  const pageNumbers = [];

  for (let i = 1; i < pageCount; i++) {
    pageNumbers.push(i);
  }
  const dispatch = useDispatch();
  const handlePage = (number) => {
    let page = number;

      
    dispatch(fetchCards({ name, page }));

  };

  return (
    <div>
      <nav className='pageContainer'>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPage===number?'active page-item':'page-item'}
              onClick={(e) => {
                handlePage(number);
                e.preventDefault();
              }}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
