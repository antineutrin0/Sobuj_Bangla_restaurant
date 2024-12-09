import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Animation occurs only once
    });
  }, []);

  const handleSearch = () => {
    console.log(`Search query: ${searchQuery}`);
    alert(`Search query: ${searchQuery}`);
  };

  return (
    <div
      className="roboto-text h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/gyckGZ8/Blank-Sushi-Restaurant-Website-UI-Prototype-5.png')",
      }}
    >
      {/* Navbar */}
      <nav
        className="flex justify-between items-center p-4 bg-dark bg-opacity-50 fixed top-0 w-full"
        data-aos="fade-down"
      >
        <div className="text-white text-2xl font-bold" data-aos="fade-right">
          Fauget Sushi
        </div>

        {/* Search Bar for All Devices */}
        <div
          className="hidden md:flex items-center bg-lightGray px-2 py-1 rounded-full"
          data-aos="zoom-in"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white px-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="text-dark font-bold hover:text-black"
          >
            🔍
          </button>
        </div>

        {/* Menu Icon for Small Devices */}
        <div className="md:hidden" data-aos="fade-left">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Nav Items */}
        <div
          className={`absolute md:static top-16 right-0 bg-dark bg-opacity-90 w-full md:w-auto md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0 transition-all duration-300 ${
            isMenuOpen ? " items-start left-3/4 flex flex-col" : "hidden"
          }`}
          data-aos="fade-in"
        >
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/");
            }}
            className="text-white text-lg md:text-xl hover:underline"
            data-aos="fade-up"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/menu");
            }}
            className="text-white text-lg md:text-xl hover:underline"
            data-aos="fade-up"
          >
            Menu
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/reservations");
            }}
            className="text-white text-lg md:text-xl hover:underline"
            data-aos="fade-up"
          >
            Seats
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/contact");
            }}
            className="text-white text-lg md:text-xl hover:underline"
            data-aos="fade-up"
          >
            Contact
          </button>

          {/* Sign In / Sign Up */}
          <div
            className="flex md:flex-row items-start flex-col md:space-x-4 space-y-2 md:space-y-0"
            data-aos="fade-in"
          >
            <button className="text-white text-lg md:text-xl hover:underline">
              Sign Up
            </button>
            <button className="text-white text-lg md:text-xl hover:underline">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="flex flex-col justify-center items-center h-full text-center text-white p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-6xl font-bold">California Maki</h1>
        <h2 className="text-2xl md:text-4xl italic">on Black Plate</h2>
        <p className="mt-6 max-w-lg text-sm md:text-base">
          Where expert culinary skills and an innate appreciation of nature
          come together to inspire and enhance the Japanese dining experience.
          Fauget Sushi is no ordinary dining restaurant.
        </p>
      </div>
    </div>
  );
};

export default App;
