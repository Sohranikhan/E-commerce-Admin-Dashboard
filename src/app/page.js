import Button from "@/components/Button/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero w-full min-h-[36rem] bg-base-200">
  <div className="hero-content flex-col md:flex-row justify-between z-auto">
    <div className="w-full max-w-md lg:max-w-lg flex-1">
      <h1 className="text-4xl md:mt-7 font-bold">Create Your Store and Start Your Business Today 🥰</h1>
      <p className="py-6">We Provide A Fully Functional Platform to Create Your Dream E-Commerce Store For Your Online Business. <br/> You can Sell Your Products and Also Manage Your Store in Your Own Way 😃.</p>
      <Button text={<Link href={'/createstore'}>Get Started</Link>} className={'btn btn-primary'} />
    </div>
    <img src="/hero/hero.webp" className="flex-1 w-full max-w-md lg:max-w-md rounded-lg shadow-2xl" />
  </div>
</div>
  );
}
