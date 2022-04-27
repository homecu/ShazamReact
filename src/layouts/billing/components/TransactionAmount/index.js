import AlertMainComponent from "../AlertMainComponent";

function TransactionAmountComponent() {
  return (
    <AlertMainComponent
      screen="HIGH_DOLLAR_THRESHOLD"
      title="Transaction Amount"
      headingTwo="Based on transaction amount"
      headingThree="Send the alerts for transactions that exceed this amount"
    />
  );
}

export default TransactionAmountComponent;
