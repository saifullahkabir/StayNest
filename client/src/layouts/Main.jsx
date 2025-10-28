import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import ScrollToTop from '../components/Shared/ScrollToTop'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Main = () => {

  // only animate once
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Main
