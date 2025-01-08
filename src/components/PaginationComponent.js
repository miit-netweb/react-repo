import React, { useState, useEffect } from "react";
import { api } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { todosAction, cartAction } from "../App/store";

const PaginationComponent = () => {

  const totalItems = 5;
  const itemsPerPage = 1;
  const dispatch = useDispatch();

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Generate current items (this could be fetched from an API)
  const currentItems = Array.from(
    { length: totalItems },
    (_, i) => `Item ${i + 1}`
  ).slice(indexOfFirstItem, indexOfLastItem);

   useEffect(() => {
      const fetchData = async () => {
        const { data } = await api.get(`/api/page/product?page=0&size=1`);
        console.log(data.content)
        dispatch(todosAction.initializeTodos(data.content));
      };
      fetchData();
    }, []);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageProduct = async (key) => {
    let pageBE = currentPage;
    if (key === -1) {
      handlePageChange(currentPage - 1);
      pageBE-=1;
    } else if (key === -2) {
      handlePageChange(currentPage + 1);
      pageBE+=1
    } else {
      handlePageChange(key+1);
      pageBE=key+1;
    }
    const { data } = await api.get(
      `/api/page/product?page=${pageBE - 1}&size=1`
    );
    dispatch(todosAction.initializeTodos(data.content));

  };

  console.log(currentPage)

  // JSX for the Pagination component
  return (
    <div >
      {/* Pagination Controls */}
      <div>
        <button onClick={() => getPageProduct(-1)} disabled={currentPage === 1}>
          Prev
        </button>

        {/* Display page numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => getPageProduct(i)}
            style={{ fontWeight: currentPage === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => getPageProduct(-2)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Total Pages Info */}
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default PaginationComponent;