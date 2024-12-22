import { FaCoffee, FaAward, FaSeedling, FaMugHot } from "react-icons/fa";
import { useAuth } from "../appwrite/AuthConfig";
import { useNavigate } from "react-router-dom";

const Body1 = () => {
  const {user}=useAuth();
  const navigate=useNavigate();
  const features = [
    {
      icon: <FaCoffee size={48} className="text-white" />,
      title: "Awesome Aroma",
      description: "You will definitely be a fan of the aroma of your coffee.",
    },
    {
      icon: <FaAward size={48} className="text-white" />,
      title: "High Quality",
      description:
        "We serve coffee to you while maintaining the best quality.",
    },
    {
      icon: <FaSeedling size={48} className="text-white" />,
      title: "Pure Grades",
      description:
        "The coffee is made of the green coffee beans which you will love.",
    },
    {
      icon: <FaMugHot size={48} className="text-white" />,
      title: "Proper Roasting",
      description:
        "Your coffee is brewed by first roasting the green coffee beans.",
    },
  ];

  return (
   <div className="flex flex-col md:flex-row justify-between">
    <div className="bg-stone-950 w-full md:w-1/3 lg:w-1/2">
    <div className="flex flex-col justify-center items-center   h-full text-center text-white p-6"> 
        <p className="text-xl md:text-2xl text-start font-bold border border-amber-600 p-2 rounded-lg">Our Exclusivity</p>
        <h2 className="text-lg md:text-lx italic  text-center">This Restaurant offers an authentic taste of Bengal,<br /> blending traditional flavors with modern charm. <br /> With every dish crafted to perfection, <br /> it’s a place where great food meets heartfelt hospitality.</h2>
      <div className=" flex mx-auto md:mx-0 ">
         <button className={`text-center mt-8   text-lg md:text-xl text-black font-bold bg-amber-600 p-4 px-8 rounded-lg hover:bg-amber-700 ${(user&&user.prefs.role)=="Admin"?"hidden":"Block"}`}
         onClick={()=>{
          if(user)
            navigate('/dashboard/customer')
          else
          navigate('/signin')
         }}
         >
        Join us
         </button>
        </div>
      </div>
    </div>
    <div className="w-full md:w-2/3 lg:w-1/2 grid  grid-cols-2 justify-center gap-2 md:gap-4 py-8 bg-stone-950 px-4 md:px-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center max-w-sm p-4 bg-stone-900 rounded-lg shadow-md"
        >
          {feature.icon}
          <h3 className="text-lg font-bold mt-4 text-white">{feature.title}</h3>
          <p className="text-sm text-white mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
   </div>
  );
};

export default Body1;
