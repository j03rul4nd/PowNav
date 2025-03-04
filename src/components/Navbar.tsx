export default function Navbar() {
    return (
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">PowNav Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-black">Perfil</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">Cerrar sesión</button>
        </div>
      </nav>
    );
  }
  