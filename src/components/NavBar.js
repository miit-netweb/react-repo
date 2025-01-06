import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ backgroundColor: "beige" }}
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                style={{ color: "black" }}
                className="nav-link active"
                aria-current="page"
                to={"/home"}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add/product"} style={{color:"black"}}>
                Add
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to={"/home"} style={{color:"black"}}>
                Order
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
