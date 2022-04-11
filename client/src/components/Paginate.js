import "./Paginate.css";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const Paginate = ({ current, nbrPages }) => {
  const [pages, setPages] = useState(null);

  useEffect(() => {
    console.log(nbrPages, "maitre simona");
    if (nbrPages > 0) {
      setPages(getPages(current, nbrPages));
    }
  }, [nbrPages, current]);

  return nbrPages < 2 ? (
    ""
  ) : (
    <div className="container-page">
      <ul>
        {current != 1 ? (
          <PageLink
            to={current - 1}
            children={<FaChevronLeft />}
            current={current}
            pages={nbrPages}
          />
        ) : (
          ""
        )}
        {pages &&
          pages.map((p, index) =>
            p === "..." ? (
              <SpanDot key={index} />
            ) : (
              <PageLink
                to={p}
                key={index}
                children={p}
                current={current}
                pages={nbrPages}
              />
            )
          )}
        {current != nbrPages ? (
          <PageLink
            to={parseInt(current) + 1}
            children={<FaChevronRight />}
            current={current}
            pages={nbrPages}
          />
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

const getPages = (currentPage, pages) => {
  const copyPages = pages;
  const closest = [1, copyPages].reduce((a, b) => {
    return Math.abs(b - currentPage) < Math.abs(a - currentPage) ? b : a;
  });
  let pageArray = [];
  let i = currentPage;
  switch (closest) {
    case 1:
      while (i > 1 && pageArray.length < 2) {
        i--;
        pageArray.unshift(i);
      }
      i = currentPage;
      pageArray.push(i);
      while (i < pages && pageArray.length < 5) {
        i++;
        pageArray.push(i);
      }
      break;
    case pages:
      while (i < pages && pageArray.length < 2) {
        i++;
        pageArray.push(i);
      }
      i = currentPage;
      pageArray.unshift(i);
      while (i > 1 && pageArray.length < 5) {
        i--;
        pageArray.unshift(i);
      }
      break;
    default:
      return null;
  }

  if (pageArray[0] != 1) {
    if (Math.abs(pageArray[0] - 1) > 1) {
      pageArray.unshift("...");
    }
    pageArray.unshift(1);
  }
  if (pageArray[pageArray.length - 1] != pages) {
    if (Math.abs(pageArray[pageArray.length - 1] - pages) > 1) {
      pageArray.push("...");
    }
    pageArray.push(pages);
  }

  return pageArray;
};

const PageLink = ({ children, current, to, pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    if (to <= pages && to >= 1) {
      searchParams.set("page", to);
      setSearchParams(searchParams);
    }
  };
  return (
    <li
      onClick={handleClick}
      className={
        current == parseInt(children) ? "active-page-link" : "page-link"
      }
    >
      {children}
    </li>
  );
};

const SpanDot = () => {
  return <li className="page-dot">...</li>;
};
