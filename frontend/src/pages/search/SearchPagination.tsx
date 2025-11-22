export type SearchPaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const SearchPagination = ({
  page,
  pages,
  onPageChange
}: SearchPaginationProps) => {
  const pageNumbers = [];

  for (let pageIndex = 1; pageIndex <= pages; pageIndex++) {
    pageNumbers.push(pageIndex);
  };

  return (
    <div className='flex justify-center'>
      <ul className='flex border border-slate-300'>
        {pageNumbers.map((pageNumber) => (
          <li className={
            `px-2 py-1 ${page === pageNumber ? 'bg-gray-200' : ''}`
          }>
            <button onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPagination;