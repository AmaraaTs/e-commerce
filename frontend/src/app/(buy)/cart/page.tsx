"use client";
import { ICart } from "@/app/utils/interfaces";
import { apiUrl } from "@/app/utils/util";
import { CartProductCard, SavedProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { UserContext } from "@/provider/user-provider";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PiTrashLight } from "react-icons/pi";
import { toast } from "react-toastify";

export default function Cart() {
  // const { user, setUser } = useContext(UserContext);
  const [carts, setCarts] = useState<ICart>();

  // const [carts, setCarts] = useState<ICart[]>([]);

  // const getAllCartProducts = async () => {
  //   if (!user) return;

  //   const response = await axios.get(
  //     `${apiUrl}/api/v1/cart?userId=${user?._id}`
  //   );
  //   setCarts(response.data.cartProducts);
  //   // console.log("Res", response.data);
  // };
  // useEffect(() => {
  //   getAllCartProducts();
  // }, [user]);

  const getCartProducts = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        console.log("No user token found");
        return;
      }

      const response = await axios.get(`${apiUrl}/api/v1/cart/get-cart`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.status === 200) {
        setCarts(response.data.cartProducts);
      }
    } catch (error) {
      console.log("Failed to add cart", error);
    }
  };
  useEffect(() => {
    getCartProducts();
  }, []);
  console.log("Carts", carts);
  return (
    <main className=" bg-[#f7f7f8] pt-[60px] pb-24">
      <section className="  max-w-[1100px] mx-auto min-h-[calc(100vh-363px)]">
        {/* nav */}
        <div className="flex items-center justify-center">
          <p className="h-8 w-8 flex items-center justify-center  border-[1px] border-[#2563EB] rounded-full text-white bg-[#2563EB]">
            1
          </p>
          <p className="h-[1px] border-[1px] border-[#18181B] w-20"></p>
          <p className="h-8 w-8 flex items-center justify-center  border-[1px] border-black rounded-full">
            2
          </p>
          <p className="h-[1px] border-[1px] border-[#18181B] w-20"></p>
          <p className="h-8 w-8 flex items-center justify-center  border-[1px] border-black rounded-full">
            3
          </p>
        </div>
        {/* sags */}
        <div className="bg-white p-8 rounded-2xl mt-[58px]">
          <h1 className="text-xl font-bold mb-4">
            1. Сагс{" "}
            <span className="text-[#71717A] font-medium">
              ({carts?.products.length})
            </span>
          </h1>
          <div className="flex flex-col gap-4">
            {/* map */}
            {carts?.products.map((product) => {
              console.log("product", product);
              return (
                <CartProductCard
                  key={product.product._id}
                  productCart={product}
                />
              );
            })}
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-[18px]">Нийт төлөх дүн:</p>
            <p className="text-xl font-bold">360’000₮</p>
          </div>
          <Button className="bg-[#2563EB] px-9 py-2 rounded-full text-sm  w-[175px] ml-[calc(100%-175px)] mt-6">
            Худалдан авах
          </Button>
        </div>
      </section>
    </main>
  );
}
