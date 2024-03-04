import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Image
        src={"/bg.jpg"}
        alt="bg"
        objectFit="contain"
        fill
        className="brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center rounded">
        <div className="p-4 bg-gray-50 shadow-md rounded-md w-1/5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
