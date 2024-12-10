import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../appwrite/AuthConfig";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {user}=useAuth();

  const handleSearch = () => {
    console.log("what happened");
    console.log(`Search query: ${searchQuery}`);
    alert(`Search query: ${searchQuery}`);
  };
  const dashboardbtn=()=>{
    if(user.prefs.role=="Admin"){
        navigate('/admin')
    }
    if(user.prefs.role=="Waiter"){
        navigate('/waiter')
    }
    if(user.prefs.role=="Chef"){
        navigate('/chef')
    }
  }

  return (
    <div
      className="roboto-text h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/gyckGZ8/Blank-Sushi-Restaurant-Website-UI-Prototype-5.png')",
         
      }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-dark bg-opacity-50 fixed top-0 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-full max-w-4xl space-y-2 md:space-y-0 md:space-x-6">
  {/* First Div */}
  <div className="text-white text-2xl font-bold rounded-xl p-2  roboto-text flex flex-row w-4/5 justify-between">
   <div className="-mx-5">
   <span className="relative left-5  bg-red-600 px-3 py-1 rounded-r-3xl rounded-l-lg">
      SOBUJ
    </span>
    <span className="bg-green-600 pl-6 pr-2 py-1 rounded-lg">
      BANGLA
    </span>
   </div>
    <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-3xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
  </div>

  {/* Second Div */}
  <div className=" flex items-center bg-lightGray border-white border-2 p-1 rounded-full flex-1 w-4/5">
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent outline-none text-white text-sm md:text-lg flex-grow px-2"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      onClick={handleSearch}
      className="text-dark text-lg font-bold hover:text-black px-2"
    >
      🔍
    </button>
  </div>
</div>


        {/* Nav Items */}
        <div
          className={`absolute md:static top-16 right-0 mr-8 bg-dark bg-opacity-90 w-full md:w-auto md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0 transition-all duration-300 ${
            isMenuOpen ? " items-start left-2/3 flex flex-col" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/");
            }}
            className="text-white text-lg md:text-xl hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/menu");
            }}
            className="text-white text-lg md:text-xl hover:underline"
          >
            Menu
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/bookseat");
            }}
            className="text-white text-lg md:text-xl hover:underline"
          >
            Book Now
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/contact");
            }}
            className="text-white text-lg md:text-xl hover:underline"
          >
            Contact
          </button >
          <p className="text-white text-lg md:text-xl hidden lg:">|</p>

                {!user ? (
        <div className="flex md:flex-row items-start flex-col md:space-x-4 space-y-2 md:space-y-0">
            <button
            className="text-white text-lg md:text-xl hover:underline"
            onClick={() => {
                setIsMenuOpen(false);
                navigate("/signup");
            }}
            >
            Sign Up
            </button>
            <button
            className="text-white text-lg md:text-xl hover:underline"
            onClick={() => {
                setIsMenuOpen(false);
                navigate("/signin");
            }}
            >
            Sign In
            </button>
        </div>
        ) : (
        <div className="text-center text-lg font-semibold bg-cyan-600 p-2 rounded-lg">
            {user.prefs && user.prefs.role === "Customer" ? (
            <button
                onClick={() => {
                navigate(  'dashboard/customer');
                }}
            >
                Explore
            </button>
            ) : (
            <button onClick={dashboardbtn}>Dashboard</button>
            )}
        </div>
        )}

        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center h-full text-center text-white p-6">
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

export default Header;
