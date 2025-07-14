import { Link } from "react-router-dom";
import logo from "../assets/imgg/logo.png";
import Whyus from "../components/whyus";
import CounterThree from "../components/CounterThree";
import BlogPlatformLanding from "../components/BlogPlatformLanding";

const LandingPage = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#f0f4f8] to-[#d9e4ec] text-center ">



  
        <Whyus/>
        <CounterThree/>
        <BlogPlatformLanding/>
    </div>
  );
};

export default LandingPage;
