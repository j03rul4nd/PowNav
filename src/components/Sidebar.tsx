"use client";

import useDashboard from "@/hooks/useDashboard";
import { motion } from "framer-motion";
import { Users, Map, ChevronLeft, ChevronRight, PlusCircle, Eye, Mountain, Snowflake } from "lucide-react";

interface Friend {
  name: string;
  location: string;
  time: string;
  status: "online" | "offline";
  avatar: string;
}

const friends: Friend[] = [
  { name: "Marta G.", location: "Gate C", time: "Hace 10 min", status: "online", avatar: "https://swiftbyte.onrender.com/user_5.png" },
  { name: "Carlos R.", location: "Annupuri", time: "Hace 5 min", status: "online", avatar: "https://swiftbyte.onrender.com/user_1.png" },
  { name: "Alex T.", location: "No en pista", time: "", status: "offline", avatar: "https://swiftbyte.onrender.com/user_4.png" },
];

const routes = [
  { id: "gate-a", name: "Niseko Gate A - Secret Tree Run", difficulty: "Intermedio", difficultyClass: "medium", distance: "2.4 km", elevation: "-320m", type: "Powder" },
  { id: "gate-c", name: "Niseko Gate C - Powder Bowl", difficulty: "Avanzado", difficultyClass: "hard", distance: "3.8 km", elevation: "-520m", type: "Backcountry" },
  { id: "backcountry", name: "Annupuri Backcountry - La mejor línea", difficulty: "Principiante", difficultyClass: "easy", distance: "1.6 km", elevation: "-180m", type: "Groomed" },
];

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar, selectRoute, selectedRoute } = useDashboard();

  return (
    <>
      <div 
        className={`w-[340px] h-full bg-white shadow-lg flex flex-col border-r overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex-1 px-5 pb-4">
          <div className="my-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-semibold text-gray-900">Rutas populares</h2>
              </div>
              <button className="flex items-center text-sm text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                <Eye className="w-4 h-4 mr-1" />
                <span>Ver todas</span>
              </button>
            </div>

            {routes.map((route) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`p-4 rounded-lg cursor-pointer transition-all border mb-3 ${
                    selectedRoute === route.id
                      ? "bg-blue-50 border-blue-400 shadow-sm"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => selectRoute(route.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900">{route.name}</h3>
                    <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      route.difficultyClass === "easy" ? "bg-green-100 text-green-700" : 
                      route.difficultyClass === "medium" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-red-100 text-red-700"
                    }`}>
                      {route.difficulty}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center">
                        <Mountain className="w-4 h-4 mr-1 text-gray-500" />
                        {route.distance}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span>{route.elevation}</span>
                    </div>
                    <div className="text-xs font-medium text-gray-500">{route.type}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-semibold text-gray-900">Amigos en la montaña</h2>
              </div>
              <button className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors">
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>

            {friends.map((friend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 mb-2 ${friend.status === "online" ? "border-l-4 border-l-green-500" : ""}`}
                whileHover={{ x: 5 }}
              >
                <div className="relative">
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md" 
                  />
                  {friend.status === "online" && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 ml-3">
                  <div className="font-semibold text-gray-900">{friend.name}</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{friend.location}</span>
                    {friend.time && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{friend.time}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón para colapsar/expandir el sidebar - Reposicionado más abajo */}
      <button
        className={`fixed top-[50%] transform -translate-y-1/2 z-20 bg-white shadow-md rounded-r-lg w-10 h-12 flex items-center justify-center border border-gray-200 hover:bg-blue-600 hover:text-white transition-colors group ${
          isSidebarCollapsed ? "left-0" : "left-[340px]"
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-5 h-5 group-hover:text-white text-blue-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 group-hover:text-white text-blue-600" />
        )}
      </button>
    </>
  );
}