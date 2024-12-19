import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../appwrite/AuthConfig";
import foodData from './foodData.json';
import { ImSearch } from "react-icons/im";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {user}=useAuth();

  const handleSearch = () => {
    foodData.map(item=>{
      if(item.name==searchQuery){
        navigate(`/fooditem/${item.id}`)
      }
    })
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
      <nav className="flex justify-between items-center p-4 bg-dark bg-opacity-50  top-0 w-full">
     
  <div className="text-white text-xl font-bold rounded-xl p-2  roboto-text flex flex-row  justify-between ">
   <span className="relative left-5  bg-red-600 px-3 py-1 rounded-r-3xl rounded-l-lg">
      SOBUJ
    </span>
    <span className="bg-green-600 text-black pl-6 pr-2 py-1 rounded-lg">
      BANGLA
    </span>
  </div>

        <div className="flex felx-col md:flex-row">
         <div className={`absolute md:static top-16 right-0 bg-dark bg-opacity-90 backdrop-blur-lg md:backdrop-blur-0 md:w-auto md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 z-20 ${
            isMenuOpen ? " items-start left-2/3 flex flex-col" : "hidden"
          }`}>
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
            className="text-white text-lg  md:text-xl hover:underline"
          >
            Menu
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              if(user)
              navigate("/dashboard/customer/booktable");
            else
            navigate('/signin');
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
            className=" text-white text-lg md:text-xl hover:underline"
            onClick={() => {
                setIsMenuOpen(false);
                navigate("/signin");
            }}
            >
            Sign In
            </button>
        </div>
        ) : (
        <div className="text-center text-lg lg:text-2xl text-black font-semibold bg-amber-600 p-1 md:px-4 md:py-2 rounded-lg hover:bg-amber-700">
            {user.prefs && user.prefs.role === "Customer" ? (
            <button
                onClick={() => {
                navigate(  'dashboard/customer/orderfood');
                }}
            >
              <span>OrderNow</span>
            </button>
            ) : (
            <button onClick={dashboardbtn}>Dashboard</button>
            )}
        </div>
        )}
         </div>
         <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        </div>
      </nav>

      <div className="flex flex-col justify-center items-center md:items-start  h-full text-center text-white p-8">
        <div className=" backdrop-blur-lg p-2 lg:p-16 rounded-lg">
        <div className=" flex items-center bg-green-600 border-white border-2  mt-4 mb-8 rounded-full mx-auto flex-1 w-full lg:w-4/5">
        <select
    className="bg-transparent text-xl text-gray-900 font-semibold px-2 outline-none w-full"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  >
    <option value="" disabled>
      Select Your Food
    </option>
    {
      foodData.map(item=>(
        <option value={item.name} className="text-black ">{item.name}</option>
      ))
    }
    
  </select>
  <button
    onClick={handleSearch}
    className="text-dark text-2xl bg-red-600 font-bold hover:text-black p-2 rounded-r-full"
  >
    <ImSearch />
  </button>
  </div>
        <p className="text-2xl md:text-4xl text-right font-bold mr-4 mb-4 ">Enjoy Our Meal</p>
        <h2 className="text-xl pb-8 md:pb-2 md:text-3xl italic font-bold text-start ml-4 text-gray-900 mt-2"><span className="border p-1 rounded-xl bg-gray-100">On Black Plate</span></h2>
        <p className="hidden lg:block text-lg font-thin mt-2 rounded-lg p-2">This Restaurant offers an authentic taste of Bengal,<br /> blending traditional flavors with modern charm. <br /> With every dish crafted to perfection, <br /> it’s a place where great food meets heartfelt hospitality.</p>
        </div>
      <div className="mt-4 lg:-mt-12 lg:mb-24 z-10 flex mx-auto md:mx-0 ">
         <button className=" text-center ml-28  md:ml-80 text-xl md:text-3xl text-black font-bold bg-amber-700 p-4 md:p-6 rounded-2xl hover:bg-amber-600"
         onClick={()=>{
          if(user)
            navigate('/dashboard/customer/booktable')
          else
          navigate('/signin')
         }}
       
         >
          BOOK A TABLE
         </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
