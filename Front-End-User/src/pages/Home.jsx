import React from 'react'

import CategoryGrid from '../components/CategoryGrid';
import Banner from '../components/Banner';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import SectionCategory from '../components/SectionCategory';
import NewProductList from '../components/NewProductList';
import ProductBanner from '../components/ProductBanner';
import TopSellingProduct from '../components/TopSellingProduct';


const Home = () => {
  return (
    <div>
      <SectionCategory />
      <Banner />
      <CategoryGrid />
      <VerticalCardProduct category={"ipad"} heading={"Ipads Thịnh Hành"} />
      <NewProductList />
      <VerticalCardProduct category={"mobiles"} heading={"Điện Thoại Nổi Bật"} />
      <ProductBanner />
      <HorizontalCardProduct category={"laptop"} heading={"Laptop Nổi Bật"} />
      <TopSellingProduct />
      <VerticalCardProduct category={"watches"} heading={"Đồng Hồ Phổ Biến"} />
    </div>
  )
}

export default Home
