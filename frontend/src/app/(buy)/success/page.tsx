import { LuCheckCircle } from "react-icons/lu";

export default function Success() {
  return (
    <main className=" bg-[#f7f7f8] pt-[60px] pb-24">
      <section className="  max-w-[1100px] mx-auto min-h-[calc(100vh-468px)]">
        <div className="mt-[105px] w-[374px] m-auto bg-white rounded-2xl px-8 py-14 flex flex-col items-center">
          <LuCheckCircle size={32} color="#2563EB" />
          <p className="mt-4 text-base text-[#18181B]">
            Захиалга амжилттай баталгаажлаа.
          </p>
        </div>
      </section>
    </main>
  );
}
