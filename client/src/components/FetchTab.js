import { useEffect, useState } from "react";
import { Tab } from "./Tab";
import { apiFetch } from "../utils/api";
import { Link } from "react-router-dom";
import { Paginate } from "./Paginate";
import { useSearchParams } from "react-router-dom";
import { FcSearch } from "react-icons/fc";

export const FetchTab = ({
  linkFetch,
  columns,
  parser,
  linkNew = null,
  titleNew = null,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [elementParsed, setElementParsed] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(null);
  const [nbrPages, setNbrPages] = useState(null);
  useEffect(async () => {
    if (searchParams) {
      const orderEffect = searchParams.get("order");
      const sortEffect = searchParams.get("sort");
      const pageEffect = searchParams.get("page")
        ? searchParams.get("page")
        : 1;
      const searchEffect = searchParams.get("search");
      setPage(pageEffect);
      setSearch(searchEffect ? searchEffect : "");
      const response = await apiFetch(linkFetch, {
        method: "POST",
        body: {
          page: pageEffect,
          order: orderEffect,
          sort: sortEffect,
          search: searchEffect,
        },
      });
      if (response.items) {
        setElementParsed(parser(response.items));
        setNbrPages(Math.ceil(response.count / 5));
      } else {
        setElementParsed(null);
        setNbrPages(0);
      }
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: search });
  };
  return (
    <>
      <div className="beetween">
        <form onSubmit={handleSearch}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder={"recherche"}
          ></input>{" "}
          <button>
            <FcSearch />
          </button>{" "}
        </form>{" "}
        {linkNew && (
          <button>
            <Link to={linkNew}>{titleNew}</Link>
          </button>
        )}
      </div>

      {elementParsed ? (
        <Tab columns={columns} rows={elementParsed} />
      ) : (
        <p>Aucune element ne correspond</p>
      )}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
  );
};
