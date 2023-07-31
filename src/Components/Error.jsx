import React from "react";
import error from "../Components/images/error.png";

const Error = () => {
  return (
    <div className="hstack container d-flex justify-content-center flex-column p-3">
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Sorry!!</strong> This API is limited to a specific
        number of requests per minute and maybe that limit is exceeded. So
        please try again after some time.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <img src={error} alt="Error While Fetching Data" className="error" />
    </div>
  );
};

export default Error;
