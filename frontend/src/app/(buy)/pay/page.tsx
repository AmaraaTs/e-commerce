"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pay() {
  const router = useRouter();
  const [countDown, setCountDown] = useState(900);

  const befPage = () => {
    router.push("/address");
  };
  const nextPage = () => {
    router.push("/success");
  };

  const minutes = Math.floor(countDown / 60); // Get the whole minutes
  const seconds = countDown % 60;

  const formattedTime = `${minutes} : ${seconds} `;

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [countDown]);

  return (
    <main className=" bg-[#f7f7f8] pt-[60px] pb-24">
      <section className="  max-w-[1100px] mx-auto min-h-[calc(100vh-363px)]">
        {/* nav */}
        <div className="flex items-center justify-center">
          <p className="h-8 w-8 flex items-center justify-center  border-[1px] border-[#2563EB] rounded-full text-white bg-[#2563EB]">
            ✓
          </p>
          <p className="h-[1px] border-[1px] border-[#2563EB] w-20"></p>
          <p className="h-8 w-8 flex items-center justify-center  border-[1px] border-[#2563EB] rounded-full text-white bg-[#2563EB]">
            ✓
          </p>
          <p className="h-[1px] border-[1px] border-[#2563EB] w-20"></p>
          <p className="h-8 w-8 flex items-center justify-center  border-[1px] border-[#2563EB] rounded-full text-white bg-[#2563EB]">
            3
          </p>
        </div>
        {/* pay */}
        <div className="bg-white p-8 rounded-2xl mt-[58px]">
          <h1 className="text-xl font-bold mb-4">3. Төлбөр төлөлт</h1>
          <div className="flex flex-col items-center my-9">
            <span className="bg-[#F4F4F5] px-2 py-1 rounded-full text-sm font-medium">
              {formattedTime}
            </span>
            <img
              src="/img/qr.png"
              alt="qr"
              className="mt-5 h-[187px] w-[187px]"
            />
            <p className="mt-[44px] text-base text-[#09090B]">
              Төлөх боломжтой банкууд:
            </p>
            <div className="flex gap-6 flex-wrap px-[40px] mt-5">
              <img
                src="/banks/khan.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/tdb.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/m.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/khan.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/tdb.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/m.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/khan.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/tdb.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/m.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/khan.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/tdb.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/m.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/khan.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/tdb.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/m.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/khan.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/tdb.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
              <img
                src="/banks/m.png"
                alt="bank"
                className="h-[46px] w-[46px]"
                onClick={nextPage}
              />
            </div>
          </div>
          <Button
            className="bg-white px-9 py-2 rounded-full border-[1px] border-[#E4E4E7] text-black mt-[52px]"
            onClick={befPage}
          >
            Буцах
          </Button>
        </div>
      </section>
    </main>
  );
}
