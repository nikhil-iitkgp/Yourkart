import React from 'react'
import CategoryList from '../components/categoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/verticalCardProduct'




const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading="Top Airpodes"/>
      <HorizontalCardProduct category={"watches"} heading="Top Watches"/>
      <HorizontalCardProduct category={"earphones"} heading="Top Earphones"/>
      
      <VerticalCardProduct category={"mobiles"} heading="Top Mobiles"/>
      <VerticalCardProduct category={"refrigerator"} heading="Top Refrigerators"/>
      <VerticalCardProduct category={"speakers"} heading="Top Speakers"/>
      <VerticalCardProduct category={"mouse"} heading="Top Mouse"/>
      <VerticalCardProduct category={"television"} heading="Top Televisions"/>
      <VerticalCardProduct category={"trimmers"} heading="Top Trimmers"/>
      <VerticalCardProduct category={"Printers"} heading="Top Printers"/>
      <VerticalCardProduct category={"processor"} heading="Top Processors"/>
      <VerticalCardProduct category={"camera"} heading="Top Cameras"/>

    </div>
  )
}

export default Home