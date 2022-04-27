import SuspectedFraudAlertsComponent from "layouts/billing/components/SuspectedFraudAlerts";
import MainLayout from "layouts/mainLayout";

// Data

// Dashboard components

function TransactionAmount() {
  return (
    <MainLayout>
      <SuspectedFraudAlertsComponent />
    </MainLayout>
  );
}

export default TransactionAmount;
