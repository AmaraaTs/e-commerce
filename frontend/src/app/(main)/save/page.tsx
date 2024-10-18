"use client";
import { IProduct, ISaved } from "@/app/utils/interfaces";
import { apiUrl } from "@/app/utils/util";
import { SavedProductCard } from "@/components/product-card";
import { UserContext } from "@/provider/user-provider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Save() {
  const { user, setUser } = useContext(UserContext);
  // console.log("User", user);
  const [products, setProducts] = useState<ISaved[]>([]);
  const [count, setCount] = useState<number>(0);

  const getAllSavedProducts = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        console.log("No user token found");
        return;
      }
      const response = await axios.get(`${apiUrl}/api/v1/saved`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setProducts(response.data.savedProducts);
        console.log("Ress", response.data.savedProducts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countSaved = () => {
    {
      products.map((productItem) => {
        if (productItem.user.email === user?.email) {
          return setCount(productItem.products.length);
        }
      });
    }
  };

  useEffect(() => {
    getAllSavedProducts();
  }, []);

  useEffect(() => {
    countSaved();
  }, [products]);

  return (
    <main className=" bg-[#f7f7f8] pt-[60px] pb-24">
      <section className="  max-w-[1100px] mx-auto min-h-[calc(100vh-363px)]">
        <div>
          <h1 className="text-xl font-bold mb-4">
            Хадгалсан бараа
            <span className="font-medium text-[#5E6166] ml-1">({count})</span>
          </h1>
          {products.map((productItem) => {
            if (productItem.user.email === user?.email) {
              return (
                <div className="flex flex-col gap-4">
                  {productItem.products.map((product, idx) => {
                    return (
                      <SavedProductCard
                        key={product.product._id}
                        productCart={product}
                      />
                    );
                  })}
                </div>
              );
            }
          })}
          {/* <div className="flex flex-col gap-4">
            {products[0]?.products.map((product) => {
              return (
                <SavedProductCard
                  key={product.product._id}
                  productCart={product}
                />
              );
            })}
          </div> */}
        </div>
      </section>
    </main>
  );
}
