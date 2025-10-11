import React from 'react'

interface PaginationProps {
  totalitems: number;
  itemsPerPage: number;
  // setCurrentPage is a function that takes a number and returns void
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
const Pagination : React.FC<PaginationProps> = ({
   totalitems,
    itemsPerPage,
    setCurrentPage,
    currentPage,
}) => {

  
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalitems / itemsPerPage); i++) {
        pages.push(i);
    }
    const increasePage = function (currentPage:number) {
      if(currentPage < pages.length) {
        currentPage++;
      }
      return currentPage;
    }
    const decreasePage = function (currentPage:number) {
      if(currentPage > 1) {
        currentPage--;
      }
      return currentPage;
    }

  return (
      <nav aria-label="Pagination" className="isolate inline-flex py-10 rounded-md self-center">
        <button onClick={() => setCurrentPage(decreasePage(currentPage))} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-stone-800 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Previous</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        </button>
        {
          pages.map((page, index) => {
            return (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`relative z-10 inline-flex items-center ${page === currentPage ? " bg-orange-800 text-white" : "bg-white text-stone-800"} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
        >
          {page}
        </button>
            )
          })  
        }
        
        <button onClick={() => setCurrentPage(increasePage(currentPage))} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-stone-800 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Next</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        </button>
      </nav>

  )
}

export default Pagination
