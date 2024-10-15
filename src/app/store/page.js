import CarouselComp from "@/components/Carousel/Carousel";
import Products from "@/components/Products/Products";


export default function Home() {
  return (
    <main className="relative flex flex-col w-full">
      <CarouselComp />
      <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-slate-500 to-transparent"></div>
      <Products />
    </main>
  );
}
