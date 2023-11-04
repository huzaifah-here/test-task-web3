import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import coinJson from "../data/coin.json";
import "./modal.css";
const TokenModal = ({ setShowImage, setCurentValue, setEstimateValue }) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  //   console.log(selectedOption);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [coins, setCoins] = useState(coinJson);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    // setShowImage(coinJson[0]?.image);

    // setSelectedOption(coinJson[0]);

    const apiUrl =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";
    //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    // "https://api.binance.com/api/v3/ticker/24hr";
    axios
      .get(apiUrl)
      .then((response) => {
        // Filter and sort the pairs with USDT as the quote asset (counter currency).
        const usdtPairs = response.data
          //   .filter(
          //     (pair) => pair.symbol.endsWith("USDT") || pair.symbol === "BTCUSDT"
          //   )
          //   .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10);

        setCoins(usdtPairs);
        setShowImage(usdtPairs[0]?.image);

        setSelectedOption(usdtPairs[0]);
        setCurentValue(usdtPairs[0]?.current_price);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    console.log(coins);
  }, []);
  const handleOptionClick = (coinData) => {
    setSelectedOption(coinData);
    console.log(coinData.current_price);
    setShowImage(coinData.image);
    setCurentValue(coinData.current_price);
    setEstimateValue(0);
    handleClose();
    // const selectedCoin = coins.find((coin) => coin.name === name);
    // if (selectedCoin) {
    //   console.log(`${selectedCoin.name} Price: ${selectedCoin.price}`);
    // }
  };

  return (
    <div>
      <div
        type="button"
        className="d-flex justify-content-between align-items-center p-3 px-4 rounded"
        onClick={handleShow} // Use onClick to trigger the modal
        style={{ backgroundColor: "#1C1731" }}
      >
        <div className="">
          <img src={selectedOption?.image} alt="" height={"25px"} />
          <span className="m-2" style={{ color: "white" }}>
            {selectedOption?.name}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          viewBox="0 0 14 7"
          fill="none"
        >
          <path d="M14 0H0L7 7L14 0Z" fill="#6E56F8" />
        </svg>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        {/* <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{ backgroundColor: "#181627" }}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div
              type="button"
              style={{
                backgroundColor: "#6E56F826",
                padding: "5px 14px",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={handleClose}
            >
              X
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <input
                style={{
                  outline: "none",
                  color: "#6F6F7E",
                  backgroundColor: "#1C1731",
                  width: "100%",
                  border: "1px solid #6E56F840",
                  borderRadius: "15px",
                  padding: "10px 10px 10px 35px",
                  background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="%23D2D2D2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 12.5L17 17" stroke="%23D2D2D2" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat left center`,
                  backgroundSize: "18px 18px",
                  backgroundPosition: "10px center", // Adjust the position of the icon
                  backgroundRepeat: "no-repeat",
                }}
                type="text"
                placeholder="Search Coin"
                value={searchTerm}
                onChange={handleSearch}
              />

              <ul>
                {filteredCoins.map((coin) => (
                  <div
                    style={{
                      padding: "10px",
                    }}
                    key={coin.id}
                    className={`custom-option ${
                      selectedOption === coin.name ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(coin)}
                  >
                    <img src={coin.image} alt="" height={"24px"} />

                    <span
                      style={{
                        padding: "10px",
                      }}
                      className="text-white"
                    >
                      {" "}
                      {coin.name}{" "}
                    </span>
                    {/* Add additional coin information here */}
                    {selectedOption === coin.name && (
                      <span style={{ color: "green" }}>&#10003;</span>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default TokenModal;
