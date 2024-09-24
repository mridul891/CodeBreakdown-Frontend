import { Button } from "@/components/ui/button";
import Logo from "../assets/landing.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, selectUser } from "@/feature/userSlice";
import { useEffect } from "react";
import Navbar from "./Navbar";
const Landing = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  setInterval(() => {
    fetch("https://codebreakdown-backend.onrender.com/") // This calls your backend API
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle data
      })
      .catch((error) => console.error("Error:", error));
  }, 10000);
  return (
    <div className="h-[100%] w-[100vw] bg-[#FCF7F2] lg:h-[100vh] flex flex-col ">
      <Navbar />
      <div className="flex h-[90%] flex-1  flex-col lg:flex-row">
        <div className="w-[100%] h-[100%] flex justify-center items-center ">
          <img src={Logo} alt="" className="h-[20rem] lg:h-[35rem]" />
        </div>
        <div className="w-[100%] h-[100%] text-[16px]  flex flex-col items-center lg:items-start lg:text-[25px] lg:py-[150px] justify-center">
          <h1 className="font-bold mb-1">
            Convert as <br></br>fast as you <br></br> can think.
          </h1>
          <p className="font-sans mb-1">
            Where the design process finds <br></br>structure and transparency
          </p>
          <Link to="/convert">
            <Button className="py-2 mr-10 text-xl text-white bg-black rounded-xl hover:bg-stone-900 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
