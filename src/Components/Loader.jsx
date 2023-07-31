import React from 'react';
import loading from "../Components/images/loading.gif";

const Loader = () => {
  return (
    <div className='hstack container d-flex justify-content-center'>
      <img className='loading' src={loading} alt="Loading" />
    </div>
  )
}

export default Loader
