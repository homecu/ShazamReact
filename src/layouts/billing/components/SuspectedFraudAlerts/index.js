import AlertMainComponent from "../AlertMainComponent";

function InternetTransactionsComponent() {
  return (
    <AlertMainComponent
      screen="FRAUD"
      title="Suspected Fraud Alerts"
      headingTwo="Suspected Fraud Alerts"
      headingThree="Send the alerts for transactions suspected of fraud"
    />
  );
}

export default InternetTransactionsComponent;
