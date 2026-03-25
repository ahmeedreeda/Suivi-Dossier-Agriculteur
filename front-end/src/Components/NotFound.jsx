import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5 shadow rounded bg-white">
        <h1 className="display-1 text-danger">404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="text-muted">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;