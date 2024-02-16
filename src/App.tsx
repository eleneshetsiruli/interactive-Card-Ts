import { useState } from "react";
import "./App.css";
import "./components/CardModule.css";
import { Card } from "./components/Card";
import { MiniCards } from "./components/MiniCards";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="back">
      <div className="leftSide"></div>
      <div className="rightSide">
        <Card
          cvc={cvc}
          setCvc={setCvc}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          setCardNumber={setCardNumber}
          cardNumber={cardNumber}
          clientName={clientName}
          setClientName={setClientName}
        />
      </div>
      <MiniCards
        cardNumber={cardNumber}
        clientName={clientName}
        year={year}
        month={month}
        cvc={cvc}
      />
    </div>
  );
}

export default App;
