import Logo from "@/components/shared/logo/logo";

const LoginComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white  px-6 my-12">
      <div className="container max-w-[1432px] mx-auto text-center ">
        {/* header Section */}
        <Logo
          containerClassName="gap-4"
          textClassName="text-[#1E3A8A] text-4xl md:text-5xl font-bold"
        />
      </div>
    </div>
  );
};

export default LoginComponent;
