import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import ScrollToTop from '../components/Shared/ScrollToTop'
const Main = () => {
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
