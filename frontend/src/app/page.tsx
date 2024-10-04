// "use client";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// export default function Home() {
//   //type inference
//   const [count, setCount] = useState<number>(100);
//   const minus = () => {
//     setCount(count - 1);
//   };
//   const add = () => {
//     setCount(count + 1);
//   };
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <h1>Welcome E-COMMERCE app</h1>
//       <div>
//         <Button variant={"outline"} onClick={minus}>
//           -
//         </Button>
//         <Label className="text-4xl mx-5">{count}</Label>
//         <Button onClick={add}>+</Button>
//       </div>
//     </div>
//   );
// }

"use client";
import { Hero } from "@/components/home/page";
import { FeaturedProductCard, ProductCard } from "@/components/product-card";
import { useEffect, useState } from "react";
import { IProduct } from "./utils/interfaces";
import axios from "axios";
import { apiUrl } from "./utils/util";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const getAllProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/v1/product`);
    setProducts(response.data.products);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <main>
      <Hero />
      <section className="mt-6 mb-24 max-w-[1100px] mx-auto grid grid-cols-4 gap-y-12 gap-x-5">
        {products.map((product, index) => {
          return (
            <>
              {index === 6 || index === 7 ? (
                <FeaturedProductCard key={product._id} product={product} />
              ) : (
                <ProductCard key={product._id} product={product} />
              )}
            </>
          );
        })}
      </section>
    </main>
  );
}
