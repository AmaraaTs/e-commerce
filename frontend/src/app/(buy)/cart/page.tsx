"use client";
import { ICart } from "@/app/utils/interfaces";
import { apiUrl } from "@/app/utils/util";
import { CartProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
// import { useCart } from "@/provider/cart-provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
  // const { user, setUser } = useContext(UserContext);
  const [carts, setCarts] = useState<ICart>();
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const router = useRouter();
  // const { carts } = useCart();
  // console.log("carts", carts);
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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (!carts || !carts.products) return;
    const updatedCarts = { ...carts };
    const productToUpdate = updatedCarts.products?.find(
      (p) => p.product._id === productId
    );

    if (productToUpdate) {
      productToUpdate.quantity = newQuantity; // Update the quantity
      setCarts(updatedCarts);
      calculateGrandTotal(); // Recalculate grand total after quantity change
    }
  };

  const calculateGrandTotal = () => {
    if (!carts) return 0;
    const total = carts.products.reduce((sum, product) => {
      return sum + product.product.price * product.quantity;
    }, 0);
    setGrandTotal(total);
  };

  useEffect(() => {
    calculateGrandTotal(); // Recalculate grand total when carts change
  }, [carts]);

  useEffect(() => {
    getCartProducts();
  }, []);

  // useEffect(() => {
  //   calculateGrandTotal(); // Call the function to calculate grand total when carts changes
  // }, [carts]);

  const nextPage = () => {
    router.push("/address");
  };

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
              ({carts?.products?.length || 0})
            </span>
          </h1>
          {/* Display cart products */}
          <div className="flex flex-col gap-4">
            {carts?.products.length ? (
              carts.products.map((product) => (
                <CartProductCard
                  key={product.product._id}
                  productCart={product}
                  handleQuantityChange={handleQuantityChange}
                />
              ))
            ) : (
              <p className="w-48 m-auto">Таны сагс хоосон байна..</p>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-[18px]">Нийт төлөх дүн:</p>
            <p className="text-xl font-bold">{grandTotal.toLocaleString()}₮</p>
          </div>
          <Button
            className="bg-[#2563EB] px-9 py-2 rounded-full text-sm  w-[175px] ml-[calc(100%-175px)] mt-6"
            onClick={nextPage}
          >
            Худалдан авах
          </Button>
        </div>
      </section>
    </main>
  );
}
