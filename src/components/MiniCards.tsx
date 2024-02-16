interface cardNum {
  cardNumber: string;
  clientName: string;
  year: string;
  month: string;
  cvc: string;
}

export const MiniCards = ({
  cardNumber,
  clientName,
  year,
  month,
  cvc,
}: cardNum) => {
  return (
    <div className="miniCards">
      <div className="pinkCard">
        <div className="numberCard">{cardNumber}</div>
        <div className="pinkMiniContainer">
          <div className="clientName">{clientName.toLocaleUpperCase()}</div>
          <div className="mmyy">
            {month}
            {month.length > 1 ? "/" : ""}
            {year}
          </div>
        </div>
      </div>
      <div className="whiteCard">
        <div className="blackLine"></div>
        <div className="greenLine">{cvc}</div>
      </div>
    </div>
  );
};
