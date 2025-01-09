import React, { useState, useEffect } from "react";
import { api } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { todosAction, cartAction } from "../App/store";

const PaginationComponent = () => {

  const itemsPerPage = 3;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPage] = useState(2);

  const styles = {
    button: {
      margin: "0 5px",
      padding: "10px 15px",
      fontSize: "16px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ddd",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeButton: {
      backgroundColor: "#007bff",
      color: "white",
      fontWeight: "bold",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    infoText: {
      marginTop: "10px",
      fontSize: "16px",
      color: "#555",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(
        `/api/page/product?page=0&size=${itemsPerPage}`
      );
      console.log("response from api : ", data);
      console.log("data for this particular page : ", data.content);
      console.log("total data items : ", data.totalElements);

      setTotalPage(Math.ceil(data.totalElements / itemsPerPage));
      console.log("total page : ", totalPages);

      dispatch(todosAction.initializeTodos(data.content));
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageProduct = async (key) => {
    let pageBE = currentPage;
    if (key === -1) {
      handlePageChange(currentPage - 1);
      pageBE -= 1;
    } else if (key === -2) {
      handlePageChange(currentPage + 1);
      pageBE += 1;
    } else {
      handlePageChange(key + 1);
      pageBE = key + 1;
    }
    const { data } = await api.get(
      `/api/page/product?page=${pageBE - 1}&size=${itemsPerPage}`
    );
    dispatch(todosAction.initializeTodos(data.content));
  };

  console.log(currentPage);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button
        onClick={() => getPageProduct(-1)}
        disabled={currentPage === 1}
        style={styles.button}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => getPageProduct(i)}
          style={{
            ...styles.button,
            ...(currentPage === i + 1 ? styles.activeButton : {}),
          }}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => getPageProduct(-2)}
        disabled={currentPage === totalPages}
        style={styles.button}
      >
        Next
      </button>

      <p style={styles.infoText}>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default PaginationComponent;
