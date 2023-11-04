import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = ({ curentValue, setConvertValue }) => {
  const [inrValue, setInrValue] = useState();
  useEffect(() => {
    // Replace 'YOUR_APP_ID' with your Open Exchange Rates app ID.
    const apiUrl = `https://v6.exchangerate-api.com/v6/0fa7c7e952191e3aac222738/latest/USD`;

    axios
      .get(apiUrl)
      .then((response) => {
        const inrValue = response?.data?.conversion_rates?.INR;
        setInrValue(inrValue);
        const convertValueData = inrValue * curentValue;
        console.log("convertValueData", convertValueData);
        // console.log(inrValue);
        // console.log(curentValue);
        setConvertValue(convertValueData);
        // const exchangeRate = response.data.rates.INR;
        // setUsdToInrExchangeRate(exchangeRate);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });
  }, [curentValue, setConvertValue]);
  const formattedValue = (inrValue * curentValue).toFixed(2);
  return formattedValue;
};

export default CurrencyConverter;
