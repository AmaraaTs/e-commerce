"use client";
import { IProduct } from "@/app/utils/interfaces";
import { apiUrl } from "@/app/utils/util";
import { Hero } from "@/components/home/page";
import { FeaturedProductCard, ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/data";
import axios from "axios";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Detail() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const getAllProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/v1/product`);
    setProducts(response.data.products);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  //  type inference
  const [count, setCount] = useState<number>(100);
  const minus = () => {
    setCount(count - 1);
  };
  const add = () => {
    setCount(count + 1);
  };
  return (
    <main>
      <section className="mt-[60px] mb-24 max-w-[1100px] mx-auto  ">
        <div className="flex gap-5">
          <div className="flex gap-5 items-center h-[600px]">
            <div className="flex flex-col gap-2">
              <Image
                src="/products/image2.png"
                alt="image1"
                width={67}
                height={67}
                className="rounded-lg"
              />
              <Image
                src="/products/image2.png"
                alt="image1"
                width={67}
                height={67}
                className="rounded-lg"
              />
              <Image
                src="/products/image2.png"
                alt="image1"
                width={67}
                height={67}
                className="rounded-lg"
              />
            </div>
            <div>
              <Image
                src="/products/image2.png"
                alt="image1"
                width={422}
                height={520}
                className="rounded-lg"
              />
            </div>
          </div>
          <div>
            <div className="mt-[100px] flex flex-col gap-4">
              <span className="border-[1px] border-[#2563EB] px-[10px] py-[2px] rounded-full text-xs text-[#09090B]">
                Шинэ
              </span>
              <div className="flex gap-2 items-center">
                <p className="text-2xl font-bold">Wildflower Hoodie</p>
                <Heart size={20} strokeWidth={1} className="" />
              </div>
              <p className="text-base">
                Зэрлэг цэцгийн зурагтай даавуун материалтай цамц
              </p>
              <div>
                <p className="text-sm mb-2">Хэмжээний заавар</p>
                <div className="flex gap-1">
                  <p className="h-8 w-8 rounded-full border-[1px] border-[#18181B] flex items-center justify-center text-xs">
                    S
                  </p>
                  <p className="h-8 w-8 rounded-full border-[1px] border-[#18181B] flex items-center justify-center text-xs">
                    M
                  </p>
                  <p className="h-8 w-8 rounded-full border-[1px] border-[#18181B] flex items-center justify-center text-xs">
                    L
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={minus}
                  className="h-8 w-8 flex justify-center items-center border-[1px] border-[#18181B] rounded-full"
                >
                  -
                </button>
                <Label className="text-xs mx-2">{count}</Label>
                <button
                  onClick={add}
                  className="h-8 w-8 flex justify-center items-center border-[1px] border-[#18181B] rounded-full"
                >
                  +
                </button>
              </div>
              <div>
                <p className="text-xl font-bold mb-2">120000</p>
                <Button className="bg-[#2563EB] px-9 py-2 rounded-full text-sm">
                  Сагсанд нэмэх
                </Button>
              </div>
            </div>
            <div className="mt-[55px]">
              {/* rating */}
              <div>
                <div className="flex gap-4">
                  <p className="text-sm text-[#09090B]">Үнэлгээ</p>
                  <span className="text-sm text-[#2563EB] underline">
                    бүгдийг хураах
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <p className="text-[#09090B] text-sm font-bold">4.6</p>
                  <span className="text-[#71717A] text-sm ">(24)</span>
                </div>
              </div>
              {/* commends */}
              <div className="mt-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <p className="text-sm text-[#09090B] font-bold">Saraa</p>
                    <div className="flex gap-1">
                      <Star color="yellow" size={24} />
                      <Star color="yellow" size={24} />
                      <Star color="yellow" size={24} />
                      <Star color="yellow" size={24} />
                      <Star color="yellow" size={24} />
                    </div>
                  </div>
                  <p className="text-[#71717A] text-sm ">
                    Ваав материал ёстой гоё байна 😍
                  </p>
                </div>
              </div>
              {/* rate now */}
              <div className="rounded-2xl bg-[#F4F4F5] p-6 mt-6">
                <p className="text-sm text-[#09090B] font-medium">
                  Одоор үнэлэх:
                </p>
                <div className="flex mt-2">
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                  <Star color="yellow" size={24} />
                </div>
                <p className="text-sm text-[#09090B] font-medium mt-6 mb-2">
                  Сэтгэгдэл үлдээх:
                </p>
                <Input
                  placeholder="Энд бичнэ үү"
                  className="bg-white border-[1px] border-[#E4E4E7] text-sm text-[#09090B] rounded-md px-3 py-2 h-[94px]"
                />
                <Button className="bg-[#2563EB] px-9 py-2 rounded-full text-sm mt-6 font-medium">
                  Үнэлэх
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h3 className="text-[30px] font-bold mb-6">Холбоотой бараа</h3>
          <div className="grid grid-cols-4 gap-y-12 gap-x-5">
            {products.map((product, index) => {
              return (
                <>
                  <ProductCard key={product._id} product={product} />
                </>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
