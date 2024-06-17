import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] w-[80%]">
      <div className=" flex  flex-col-reverse  md:flex-row items-center justify-center md:gap-72 mt-12">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-8xl text-neutral-300">Clancer</h1>
          <p className="text-xl text-emerald-300 ml-4">Find your freelancer here</p>
        </div>
        <div className="">
          <Image
            src="/brain2.svg"
            width={400}
            height={400}

          />
        </div>

      </div>


    </div>
  );
}
