import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { div } from "framer-motion/client";
import Menu from "./pages/Menu";
import Body1 from "./components/Body1";
import Header from "./components/header";
import Review from "./components/Review";

const App = () => {
  
  return(
    <>
      <Header></Header>
      <Body1></Body1>
      <Menu></Menu>
      <Review></Review>
    </>
  )
};

export default App;
