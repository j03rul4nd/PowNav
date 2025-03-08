import useDashboard from "@/hooks/useDashboard";

interface Friend {
  name: string;
  location: string;
  time: string;
  status: "online" | "offline";
  avatar: string;
}

const friends: Friend[] = [
  { name: "Marta G.", location: "Gate C", time: "Hace 10 min", status: "online", avatar: "/api/placeholder/32/32" },
  { name: "Carlos R.", location: "Annupuri", time: "Hace 5 min", status: "online", avatar: "/api/placeholder/32/32" },
  { name: "Alex T.", location: "No en pista", time: "", status: "offline", avatar: "/api/placeholder/32/32" },
];

const routes = [
  { id: "gate-a", name: "Niseko Gate A - Secret Tree Run", difficulty: "Intermedio", difficultyClass: "medium", distance: "2.4 km" },
  { id: "gate-c", name: "Niseko Gate C - Powder Bowl", difficulty: "Avanzado", difficultyClass: "hard", distance: "3.8 km" },
  { id: "backcountry", name: "Annupuri Backcountry - La mejor línea", difficulty: "Principiante", difficultyClass: "easy", distance: "1.6 km" },
];

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar, selectRoute, selectedRoute } = useDashboard();

  return (
    <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <h2>
        Rutas populares <span>Ver todas</span>
      </h2>
      <ul className="route-list">
        {routes.map((route) => (
          <li
            key={route.id}
            className={`route-item ${selectedRoute === route.id ? "active" : ""}`}
            onClick={() => selectRoute(route.id)}
          >
            <h3>{route.name}</h3>
            <div className="route-meta">
              <div className={`difficulty ${route.difficultyClass}`}>
                <span></span> {route.difficulty}
              </div>
              <div className="distance">{route.distance}</div>
            </div>
          </li>
        ))}
      </ul>

      <h2>Amigos en la montaña <span>+</span></h2>
      <div className="friends-list">
        {friends.map((friend, index) => (
          <div key={index} className="friend-item">
            <img src={friend.avatar} alt={friend.name} />
            <div>
              <div>{friend.name}</div>
              <small>{friend.location} - {friend.time}</small>
            </div>
            <div className={`status ${friend.status}`}></div>
          </div>
        ))}
      </div>

      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={`fa-solid ${isSidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
      </div>
    </div>
  );
}
