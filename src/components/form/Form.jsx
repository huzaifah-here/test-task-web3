import React, { useEffect, useState } from "react";
import "./Form.css";
import img1 from "../../images/formicon1.png";
import TokenModal from "../modal";
import CurrencyConverter from "./CurrencyConverter";

const Form = () => {
  // const [popup, setPopUp] = useState(false);
  const [showImage, setShowImage] = useState();
  const [curentValue, setCurentValue] = useState();
  const [convertValue, setConvertValue] = useState();
  const [estimateValue, setEstimateValue] = useState();
  const handleButton = () => {
    console.log(convertValue);
  };
  const handleAmount = (value) => {
    const coinInr = value;
    // console.log(value); // Log the value
    // console.log(showImage);
    console.log("convertValue", convertValue);
    const estimateAmount = value / convertValue;
    console.log("estimateAmount", estimateAmount);
    setEstimateValue(estimateAmount);
  };

  return (
    <div className="">
      <div className="d-flex justify-content-center">
        <img
          src={showImage}
          style={{ position: "relative", top: "32px" }}
          alt=""
          height={"70px"}
        />
      </div>
      <div className="background">
        {/* <form className="form"> */}
        <div
          className="py-2 mt-5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span
            className="d-flex align-items-center"
            style={{ color: "white" }}
          >
            Current value
          </span>
          <span className="current-text">
            ₹{" "}
            {curentValue !== "NaN" ? (
              <CurrencyConverter
                curentValue={curentValue}
                setConvertValue={setConvertValue}
              />
            ) : (
              0
            )}
          </span>
        </div>
        {/* <button onClick={handleButton}> Yo</button> */}
        {/* {popup ?  */}
        <TokenModal
          setShowImage={setShowImage}
          setCurentValue={setCurentValue}
          setEstimateValue={setEstimateValue}
        />
        <div className="py-2 mt-3">
          <h6 style={{ color: "white" }}>Amount you want to invest</h6>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <input
            type="number"
            inputMode="none"
            className="p-3 px-4 rounded-left border-0"
            onChange={(e) => handleAmount(e.target.value)}
            style={{
              outline: "none",
              color: "#6F6F7E",
              backgroundColor: "#1C1731",
              width: "100%",
            }}
            placeholder="0.00"
          />
          <span
            className="p-3 rounded-right"
            style={{
              color: "#627EEA",
              borderRadius: "0px 0.375rem 0.375rem 0px",

              backgroundColor: "#1C1731",
            }}
          >
            INR
          </span>
        </div>
        <div className="py-2 mt-3">
          <h6 style={{ color: "white" }}>
            Estimate Number of coin You will Get
          </h6>
        </div>
        <input
          // name="email"
          type="number"
          inputMode="none"
          className="d-flex justify-content-between align-items-center p-3 px-4 rounded border-0"
          style={{
            // padding: "16px 230px 16px 0px",
            outline: "none",
            color: "#6F6F7E",
            backgroundColor: "#1C1731",
            width: "100%",
          }}
          placeholder="0.00"
          value={estimateValue}
          disabled
        />
        <div className="d-flex justify-content-center p-5">
          <button
            className="button-submit"
            // style={{ minWidth: "16em" }}
            type=""
            value=""
            onClick={handleButton}
          >
            Buy
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Form;
