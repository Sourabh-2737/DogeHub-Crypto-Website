import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "../Components/Loader";
import Error from  '../Components/Error';


import "../App.css";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=30`);

      setExchanges(data);
      setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if(error) return <Error />;

  
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="hstack d-flex flex-wrap justify-content-center container">
            {exchanges.map((i) => (
              <a className="box m-3" href={i.url} target="blank" key={i.id}>
                <h5>{i.trust_score_rank}</h5>
                <img src={i.image} alt="xyz" />
                <h6>{i.name}</h6>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Exchanges;
