import { MainSlider } from "../../Components/Home/mainSlider"
import BestSellerSlider from "../../Components/Home/BestSellerSlider"
import LeatherGoodsSection from "../../Components/Home/LeatherGoodsSection"
import LowestProducts from "../../Components/Home/LowestProducts"
import Categories from "../../Components/Categories/Categories"
import { Helmet } from "react-helmet"


export const HomePage = () => {
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
      <MainSlider />
      <Categories />
      <BestSellerSlider />
      <LeatherGoodsSection />
      <LowestProducts />

    </>
  )
}
