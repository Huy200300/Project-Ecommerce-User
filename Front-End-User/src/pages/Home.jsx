import React, { Suspense } from 'react'
import CategoryGrid from '../components/CategoryGrid'

const Banner = React.lazy(() => import('../components/Banner'))
const HorizontalCardProduct = React.lazy(() => import('../components/HorizontalCardProduct'))
const VerticalCardProduct = React.lazy(() => import('../components/VerticalCardProduct'))
const SectionCategory = React.lazy(() => import('../components/SectionCategory'))
const NewProductList = React.lazy(() => import('../components/NewProductList'))
const ProductBanner = React.lazy(() => import('../components/ProductBanner'))
const TopSellingProduct = React.lazy(() => import('../components/TopSellingProduct'))

const Home = () => {
  return (
    <Suspense fallback={<>...</>}>
      <div>
        <SectionCategory />
        <Banner />
        <CategoryGrid />
        <NewProductList />
        <HorizontalCardProduct category={"laptop"} heading={"Laptop Nổi Bật"} />
        <ProductBanner />
        <VerticalCardProduct category={"mobiles"} heading={"Điện Thoại Nổi Bật"} />
        <TopSellingProduct />
        <VerticalCardProduct category={"ipad"} heading={"Ipads Thịnh Hành"} />
        <VerticalCardProduct category={"watches"} heading={"Đồng Hồ Phổ Biến"} />
      </div>
    </Suspense>
  )
}

export default Home
