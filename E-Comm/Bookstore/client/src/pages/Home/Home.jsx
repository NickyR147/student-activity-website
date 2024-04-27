import React from 'react'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import FeaturesSmallColumn from '../../components/Features/Features'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
const Home = () => {
  return (
    <div className='home'>
      <br/>
      {/* <Slider/> */}
      {/* <FeaturesSmallColumn/> */}
      <FeaturedProducts type=""/>
     
      
      {/* <Contact/> */}
    </div>
  )
}

export default Home