import useDashboard from "@/hooks/useDashboard";

export default function Alerts() {
  const { alerts } = useDashboard();

  return (
    <div className="alerts-container">
      {alerts.map((alert, index) => (
        <div key={index} className={`alert ${alert.type}`}>
          <i className={`fa-solid ${alert.type === "danger" ? "fa-triangle-exclamation" : "fa-circle-info"}`}></i>
          <div className="alert-content">
            <h4>{alert.title}</h4>
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
