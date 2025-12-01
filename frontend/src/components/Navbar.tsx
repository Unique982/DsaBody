export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      <div className="text-xl font-bold">LOGO</div>
      <div className="space-x-6 hidden md:flex">
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          About
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Service
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Contact Us
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          FAQ
        </a>
      </div>
      <div className="space-x-4">
        <a
          href="#"
          className="text-gray-700 hover:text-blue-600 hidden sm:inline"
        >
          Login
        </a>
        <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition duration-200">
          Try for free
        </button>
      </div>
    </nav>
  );
}
