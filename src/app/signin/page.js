import SigninForm from "@/components/SigninForm/SigninForm"
const page = () => {
  return (
<div className="flex flex-col items-center  justify-center min-h-[36rem] w-full h-full ">
<div className="w-full h-full max-w-lg mx-auto relative z-10 p-5">
<div className="absolute top-0 left-0 w-full h-full bg-black/50 blur-sm z-[-1]"></div>
    <h1 className="text-2xl text-center">Please Sign in to <br /> <span className="text-3xl font-mono">SAMSUNG</span></h1>
            <SigninForm />  
    </div>
    </div>
  )
}

export default page