import React, { ChangeEvent, useEffect, useState } from "react";
import { Next } from "./Next";

interface cardProps {
  setCardNumber: React.Dispatch<string>;
  cardNumber: string;
  clientName: string;
  setClientName: React.Dispatch<string>;
  month: string;
  setMonth: React.Dispatch<string>;
  year: string;
  setYear: React.Dispatch<string>;
  cvc: string;
  setCvc: React.Dispatch<string>;
}

export const Card = ({
  setCardNumber,
  cardNumber,
  clientName,
  setClientName,
  month,
  setMonth,
  year,
  setYear,
  cvc,
  setCvc,
}: cardProps) => {
  const [reg, setReg] = useState(false);
  const [isCardNum, setIsCardNum] = useState(true);
  const [isMonth, setIsMonth] = useState(true);
  const [nameTouched, setNameTouched] = useState(false);
  const [isYear, setIsYear] = useState(false);

  const [isCvc, setIsCvc] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const errorMessage = { color: "red", fontSize: 12 };
  function handleSubmit() {
    if (month && year && cvc && clientName && cardNumber) {
      setSubmitted(true);
    }
    if (!month) {
      setIsMonth(true);
    }
    if (!year) {
      setIsYear(true);
    }
    if (!cvc) {
      setIsCvc(true);
    }
    if (!clientName) {
      setNameTouched(true);
    }
    if (!isCardNum) {
      setIsCardNum(true);
    }
  }

  function handleChangeNumber(ev: ChangeEvent<HTMLInputElement>) {
    let number = ev.target.value;
    let length = number.length;

    if (length === 4 || length === 9 || length === 14) {
      number = number + " ";
    }
    setCardNumber(number);
  }
  const regex = /[a-zA-Z\s]|" "/;

  function changeName(ev: ChangeEvent<HTMLInputElement>) {
    setClientName(ev.target.value);
    if (!nameTouched) {
      setNameTouched(true);
    }
  }

  function handleChangeMonth(ev: ChangeEvent<HTMLInputElement>) {
    setMonth(ev.target.value);
  }

  useEffect(() => {
    if (regex.test(cardNumber)) {
      setReg(true);
    } else {
      setReg(false);
    }
  }, [cardNumber]);

  useEffect(() => {
    if (clientName) {
      setNameTouched(false);
    } else {
      setIsMonth(submitted && !clientName);
    }
  }, [clientName, submitted]);

  useEffect(() => {
    if (cardNumber) {
      setIsCardNum(false);
    } else {
      setIsCardNum(submitted && !cardNumber);
    }
  }, [cardNumber, submitted]);

  useEffect(() => {
    if (month) {
      setIsMonth(false);
    } else {
      setIsMonth(submitted && !month);
    }
  }, [month, submitted]);

  useEffect(() => {
    if (year) {
      setIsYear(false);
    } else {
      setIsYear(submitted && !year);
    }
  }, [year]);

  useEffect(() => {
    if (cvc) {
      setIsCvc(false);
    } else {
      setIsCvc(submitted && !cvc);
    }
  }, [cvc]);

  return !submitted ? (
    <div className="card">
      <div className="inpLabel">
        <label htmlFor="name">CARDHOLDER NAME</label>
        <input
          value={clientName}
          style={{ borderColor: `${clientName ? "red" : ""} ` }}
          type="text"
          id="name"
          placeholder="e.g.Jane Appleseed"
          onChange={changeName}
        />
        {!clientName && nameTouched && (
          <p style={errorMessage}>Can't be blank</p>
        )}
        {/\d/.test(clientName) ? <p style={errorMessage}>only words</p> : ""}
      </div>
      <div className="inpLabel">
        <label htmlFor="number">CARD NUMBER</label>
        <input
          value={cardNumber}
          onChange={handleChangeNumber}
          type="text"
          id="number"
          placeholder="e.g. 1234 5678 9101 1213"
          maxLength={19}
          pattern="\d*"
        />
        {reg && <p style={errorMessage}>Wrong format, numbers only</p>}
        {isCardNum && <p style={errorMessage}>Can't blank</p>}
      </div>

      <div className="dataCvc">
        <div className="dateYear">
          <label className="label" htmlFor="date">
            EXP.DATE(MM//YY)
          </label>
          <div className="dates">
            <div>
              <input
                value={month}
                type="text"
                id="date"
                placeholder="MM"
                maxLength={2}
                onChange={handleChangeMonth}
              />
              {isMonth && <p style={errorMessage}>Can't blank</p>}
            </div>
            <div>
              <input
                value={year}
                type="text"
                id="date"
                placeholder="YY"
                maxLength={4}
                onChange={(ev) => setYear(ev.target.value)}
              />
              {isYear && <p style={errorMessage}>Can't blank</p>}
            </div>
          </div>
        </div>

        <div className="cvc">
          <label className="label" htmlFor="cvc">
            CVC
          </label>
          <div>
            <input
              type="text"
              id="cvc"
              placeholder="e.g.123"
              maxLength={3}
              onChange={(ev) => setCvc(ev.target.value)}
            />
            {isCvc && <p style={errorMessage}>Can't blank</p>}
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className="confirmBtn">
        Confirm
      </button>
    </div>
  ) : (
    <Next />
  );
};
