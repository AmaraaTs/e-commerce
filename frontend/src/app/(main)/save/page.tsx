"use client";
import { IProduct, ISaved } from "@/app/utils/interfaces";
import { apiUrl } from "@/app/utils/util";
import { SavedProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Save() {
  const [products, setProducts] = useState<ISaved[]>([]);
  const getAllSavedProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/v1/saved`);
    setProducts(response.data.savedProducts);
    console.log("Res", response.data);
  };
  useEffect(() => {
    getAllSavedProducts();
  }, []);
  return (
    <main className=" bg-[#f7f7f8] pt-[60px] pb-24">
      <section className="  max-w-[1100px] mx-auto min-h-[calc(100vh-363px)]">
        <div>
          <h1 className="text-xl font-bold mb-4">
            Хадгалсан бараа{" "}
            <span className="font-medium text-[#5E6166]">(3)</span>
          </h1>
          <div className="flex flex-col gap-4">
            {products[0]?.products.map((product) => {
              return (
                <SavedProductCard
                  key={product.product._id}
                  productCart={product}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
