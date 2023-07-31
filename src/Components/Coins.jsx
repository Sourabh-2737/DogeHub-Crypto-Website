import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import Error from "../Components/Error";

import "../App.css";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [error, setError] = useState(false);

  const currencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&per_page=30&page=1`
        );

        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);

  if (error) return <Error />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="btn-group hstack d-flex flex-wrap justify-content-start container">
            <input
              className="m-3"
              type="radio"
              name="currency"
              id="INR"
              value="inr"
              checked={currency==='inr'}
              onClick={currencyChange}
            />{" "}
            <span className="currencyText">INR</span>
            <input
              className="m-3"
              type="radio"
              name="currency"
              id="EUR"
              value="eur"
              onClick={currencyChange}
            />{" "}
            <span className="currencyText">EUR</span>
            <input
              className="m-3"
              type="radio"
              name="currency"
              id="USD"
              value="usd"
              onClick={currencyChange}
            />{" "}
            <span className="currencyText">USD</span>
          </div>

          <div className="hstack d-flex flex-wrap justify-content-center container">
            {coins.map((i) => (
              <Link
                key={i.id}
                to={`/coins/${i.id}`}
                className="box coin-box m-3"
              >
                <img src={i.image} alt="xyz" />
                <h5>{i.symbol}</h5>
                <h6>{i.name}</h6>
                <span>{`${currencySymbol}${i.current_price}`}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coins;
