import { FaCoffee, FaAward, FaSeedling, FaMugHot } from "react-icons/fa";

const Body1 = () => {
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
    <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-6 lg:gap-14 py-8 bg-stone-950 px-4 md:px-6">
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
  );
};

export default Body1;
