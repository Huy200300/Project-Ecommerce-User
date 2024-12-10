import React from 'react'

const CategoryGrid = React.lazy(() => import('../components/CategoryGrid'))
const Banner = React.lazy(() => import('../components/Banner'))
const HorizontalCardProduct = React.lazy(() => import('../components/HorizontalCardProduct'))
const VerticalCardProduct = React.lazy(() => import('../components/VerticalCardProduct'))
const SectionCategory = React.lazy(() => import('../components/SectionCategory'))
const NewProductList = React.lazy(() => import('../components/NewProductList'))
const ProductBanner = React.lazy(() => import('../components/ProductBanner'))
const TopSellingProduct = React.lazy(() => import('../components/TopSellingProduct'))

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
      <TopSellingProduct />
      <HorizontalCardProduct category={"laptop"} heading={"Laptop Nổi Bật"} />
      <VerticalCardProduct category={"watches"} heading={"Đồng Hồ Phổ Biến"} />
    </div>
  )
}

export default Home
