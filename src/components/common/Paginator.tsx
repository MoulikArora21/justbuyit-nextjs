"use client";

interface PaginatorProps {
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
}

const Paginator = ({ page, maxPage, setPage }: PaginatorProps) => {
  return (
    <div className="pagination">
      <div className="page-buttons">
        {page > 1 && (
          <button className="page-button" onClick={() => setPage(1)}>
            {"<<"}
          </button>
        )}
        {page > 1 && (
          <button className="page-button" onClick={() => setPage(page - 1)}>
            {page - 1}
          </button>
        )}
        <div className="page-button selected">{page}</div>
        {page < maxPage && (
          <button className="page-button" onClick={() => setPage(page + 1)}>
            {page + 1}
          </button>
        )}
        {page < maxPage && (
          <button className="page-button" onClick={() => setPage(maxPage)}>
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
