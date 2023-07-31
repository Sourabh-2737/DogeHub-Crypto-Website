import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import Error from "../Components/Error";
import { useParams } from "react-router-dom";
import up from "../Components/images/up.png";
import down from "../Components/images/down.png";
import "../App.css";
import ChartComponent from "./ChartComponent";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [error, setError] = useState(false);
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const currencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const btns = ["1 day", "1 week", "1 month", "6 months", "1 year", "Max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "1 day":
        setDays("24h");
        setLoading(true);
        break;
      case "1 week":
        setDays("7d");
        setLoading(true);
        break;
      case "1 month":
        setDays("30d");
        setLoading(true);
        break;
      case "6 months":
        setDays("180d");
        setLoading(true);
        break;
      case "1 year":
        setDays("365d");
        setLoading(true);
        break;
      case "Max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <Error />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container coin-detail-box">
          {/* React Chart */}
          <div className="container">
            <ChartComponent
              arr={chartArray}
              currency={currencySymbol}
              days={days}
            />
          </div>

          {/* Buttons to navigate chart */}
          <div className="container">
            {btns.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => switchChartStats(i)}
                className="btn btn-secondary m-2"
              >
                {i}
              </button>
            ))}
          </div>

          {/* Radio Buttons */}
          <div className="btn-group hstack d-flex flex-wrap justify-content-start">
            <input
              className="m-3"
              type="radio"
              name="currency"
              id="INR"
              value="inr"
              checked={currency === "inr"}
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

          {/* Time : Last Updated */}
          <p className="opacity-75 d-flex justify-content-center my-3">
            Last Updated on {coin.market_data.last_updated.split("T")[0]}{" "}
            {coin.market_data.last_updated.split("T")[1].split(".")[0]}{" "}
          </p>

          {/* Coin Data */}
          <div>
            <img
              src={coin.image.large}
              alt="Failed To Load"
              className="coin-image my-2"
            />
            <h4>{coin.name}</h4>
            <h5>
              {currencySymbol}
              {coin.market_data.current_price[currency]}
            </h5>
            <p>
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <img className="inc" src={up} alt="up" />
              ) : (
                <img className="dec" src={down} alt="down" />
              )}
              <strong>{coin.market_data.price_change_percentage_24h}</strong>
            </p>
            <h1>
              <span className="badge bg-dark">#{coin.market_cap_rank}</span>
            </h1>

            {/*Progress Bar*/}
            <div
              className="progress"
              role="progressbar"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar bg-success progress-bar-striped"></div>
            </div>
          </div>
          <div className="d-flex justify-content-between w-100 my-2">
            <span className="badge bg-danger">
              {currencySymbol}
              {coin.market_data.low_24h[currency]}
            </span>
            <span>24h Range</span>
            <span className="badge bg-success">
              {currencySymbol}
              {coin.market_data.high_24h[currency]}
            </span>
          </div>

          {/*Coin Table*/}
          <div className="d-flex flex-column coin-table">
            <div className="w-100 d-flex justify-content-between">
              <strong>Max Supply</strong>
              <span>{coin.market_data.max_supply}</span>
            </div>
            <div className="w-100 d-flex justify-content-between">
              <strong>Circulating Supply</strong>
              <span>{coin.market_data.circulating_supply}</span>
            </div>
            <div className="w-100 d-flex justify-content-between">
              <strong>Market Capital</strong>
              <span>
                {currencySymbol}
                {coin.market_data.market_cap[currency]}
              </span>
            </div>
            <div className="w-100 d-flex justify-content-between">
              <strong>All Time Low</strong>
              <span>
                {currencySymbol}
                {coin.market_data.atl[currency]}
              </span>
            </div>
            <div className="w-100 d-flex justify-content-between">
              <strong>All Time High</strong>
              <span>
                {currencySymbol}
                {coin.market_data.ath[currency]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
