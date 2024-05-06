import Banner from "@/components/Banner"
import Footer from "@/components/Footer"
import Products from "@/components/Products"

const page = () => {
  return (
 <div>
  <Banner/>
      <div className="pt-32 w-2/3 ml-auto mr-auto ">
      <p className="text-2xl mb-4">내가 선택한 스타일에 맞는 추천스타일</p>
      <Products/>
    <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite "/>
      <p className="text-2xl mb-4 font-didot">NEW</p>
      <Products/>
      <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite "/>
      <p className="text-2xl mb-4 font-didot">EVENT</p>
      <div className="w-full grid  grid-cols-2 h-60  gap-x-3  "> 
        <div className="bg-gray-300  "></div>
        <div className="bg-gray-300 "></div>
      </div>
      <Footer/>
    </div>
   
 </div>
      
  )
}

export default page
