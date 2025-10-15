import { MainSlider } from "../../Components/Home/mainSlider"
import BestSellerSlider from "../../Components/Home/BestSellerSlider"
import LeatherGoodsSection from "../../Components/Home/LeatherGoodsSection"
import LowestProducts from "../../Components/Home/LowestProducts"
import Categories from "../../Components/Categories/Categories"


export const HomePage = () => {
  return (
    <>
      <MainSlider />
      <Categories />
      <BestSellerSlider />
      <LeatherGoodsSection />
      <LowestProducts />

    </>
  )
}
