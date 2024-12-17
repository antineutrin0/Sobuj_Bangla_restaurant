import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { div } from "framer-motion/client";
import Menu from "./pages/Menu";
import Body1 from "./components/Body1";
import Header from "./components/header";
import Review from "./components/Review";
import ItemCarosel from "./components/ItemCarosel";
import Chefs from "./components/Chefs";
import Footer from "./components/Footer";

const App = () => {
  
  return(
    <>
      <Header></Header>
      <Body1></Body1>
      <div className=" bg-stone-950 flex mx-auto items-center justify-center">
      <ItemCarosel></ItemCarosel>
      </div>
      <Chefs></Chefs>
      <div className="bg-stone-950">
        <Review></Review>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
};

export default App;
