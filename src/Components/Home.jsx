import React from 'react'
import header from "../Components/images/Header.png";
import linkedin from "../Components/images/linkedin.png";
import github from "../Components/images/github.png";
import instagram from "../Components/images/instagram.png";


const Home = () => {
  return (
    <div className="header">
    <div className='row'>

      <div className="col-lg-5 d-flex justify-content-center align-items-center">
        <img src={header} alt="Failed To Load" className=''/>
      </div>

      <div className="col-lg-6 text-center d-flex flex-column justify-content-center align-items-center doge-hub">
        <h1>DogeHub</h1>
        <span>Unveiling the World of Coins! Discover top exchanges and coin insights in one place. Navigate the crypto universe effortlessly.</span>
      </div>
    </div>

    <div className="row w-100 p-3">
      <div className="col w-100 text-center">
        <span className='author'>Developed By Sourabh Singh - <img src={linkedin} alt="LinkedIn" /> <img src={github} alt="Github" /> <img src={instagram} alt="Instagram" /> </span>
      </div>
    </div>
    </div>
  )
}

export default Home
