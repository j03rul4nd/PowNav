import useDashboard from "@/hooks/useDashboard";

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar, selectRoute, selectedRoute } = useDashboard();

  return (
    <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <h2>
        Rutas populares <span>Ver todas</span>
      </h2>
      <ul className="route-list">
        <li
          className={`route-item ${selectedRoute === "gate-a" ? "active" : ""}`}
          onClick={() => selectRoute("gate-a")}
        >
          <h3>Niseko Gate A - Secret Tree Run</h3>
          <div className="route-meta">
            <div className="difficulty medium">
              <span></span> Intermedio
            </div>
            <div className="distance">2.4 km</div>
          </div>
        </li>
        <li
          className={`route-item ${selectedRoute === "gate-c" ? "active" : ""}`}
          onClick={() => selectRoute("gate-c")}
        >
          <h3>Niseko Gate C - Powder Bowl</h3>
          <div className="route-meta">
            <div className="difficulty hard">
              <span></span> Avanzado
            </div>
            <div className="distance">3.8 km</div>
          </div>
        </li>
      </ul>

      {/* Botón de colapsar sidebar */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={`fa-solid ${isSidebarCollapsed ? "fa-chevron-left" : "fa-chevron-right"}`}></i>
      </div>
    </div>
  );
}
