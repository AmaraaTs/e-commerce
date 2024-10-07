"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { formattedPrice } from "@/lib/utils";
import { Product } from "@/lib/data";
import { Button } from "./ui/button";
import { ICart, IProduct, ISaved } from "@/app/utils/interfaces";
import Link from "next/link";
import { PiTrashLight } from "react-icons/pi";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";

const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

// export const ProductCard = ({ name, price, image, discount }: Product) => {
//   return (
//     <div className="relative w-[244px]">
//       <Image
//         src={image}
//         alt="image1"
//         width={244}
//         height={331}
//         className="rounded-lg"
//       />
//       <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
//       <div className="mt-2">
//         <h3 className="font-light">{name}</h3>
//         <PriceWithDiscount price={price} discount={discount} />
//       </div>
//     </div>
//   );
// };

export const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link href={"/product/" + product._id}>
      <div className="relative w-[244px]">
        <Image
          src={product.images[0]}
          alt="image"
          width={244}
          height={331}
          className="rounded-lg"
        />
        <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
        <div className="mt-2">
          <h3 className="font-light">{product.name}</h3>
          <PriceWithDiscount
            price={product.price}
            discount={product.discount}
          />
        </div>
      </div>
    </Link>
  );
};

// export const FeaturedProductCard = ({
//   name,
//   price,
//   image,
//   discount,
// }: Product) => {
//   return (
//     <div className="relative col-span-2 row-span-10 mb-14">
//       <div className="relative w-full h-full">
//         <Image
//           src={image}
//           alt="image1"
//           fill={true}
//           className="rounded-lg -z-10"
//         />
//         <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
//       </div>
//       <div className="mt-2">
//         <h3 className="font-light">{name}</h3>
//         <PriceWithDiscount price={price} discount={discount} />
//       </div>
//     </div>
//   );
// };

export const FeaturedProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="relative col-span-2 row-span-10 mb-14">
      <Link href={"/product/" + product._id}>
        <div className="relative w-full h-full">
          <Image
            src={product.images[0]}
            alt="image"
            fill={true}
            className="rounded-lg -z-10"
          />
          <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
        </div>
        <div className="mt-2">
          <h3 className="font-light">{product.name}</h3>
          <PriceWithDiscount
            price={product.price}
            discount={product.discount}
          />
        </div>
      </Link>
    </div>
  );
};

const PriceWithDiscount = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  const discountedPrice = getDiscountedPrice(price, discount);
  return (
    <div className="flex items-center gap-4 mt-1">
      <p className="font-bold text-sm">
        {formattedPrice(discount > 0 ? discountedPrice : price)}₮
      </p>
      {discount > 0 && (
        <>
          <span className="text-muted-foreground text-xs line-through">
            {`${formattedPrice(price)}₮`}
          </span>
          <span className="font-bold text-destructive">{discount}%</span>
        </>
      )}
    </div>
  );
};

export const SavedProductCard = ({ product }: { product: ISaved }) => {
  return (
    <div className="flex w-full rounded-2xl border-[1px] border[#ECEDF0] p-4 bg-white">
      <Image
        src={product.product.images[0]}
        alt="image1"
        width={100}
        height={100}
        className="rounded-lg"
      />
      <div className=" ml-6 w-full">
        <h3 className="text-base">{product.product.name}</h3>
        <PriceWithDiscount
          price={product.product.price}
          discount={product.product.discount}
        />
        <Button className="bg-[#2563EB] px-3 py-2 rounded-full text-sm font-medium mt-2">
          Сагсанд нэмэх
        </Button>
      </div>
      <Heart color="red" size={24} strokeWidth={1} className="ml-8" />
    </div>
  );
};

export const CartProductCard = ({ product }: { product: ICart }) => {
  const [count, setCount] = useState<number>(product.quantity);
  const minus = () => {
    setCount(count - 1);
  };
  const add = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex justify-between gap-6 border-[1px] border-[#ECEDF0] rounded-2xl p-4">
      <img
        src={product.product.images[0]}
        alt="photo"
        className="h-[100px] w-[100px] bg-contain rounded-2xl"
      />
      <div className="w-full">
        <p className="text-base">{product.product.name}</p>
        <div className="flex items-center mt-1">
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
        <p className="text-base mt-2 font-bold">{product.product.price}₮</p>
      </div>
      <PiTrashLight size={24} />
    </div>
  );
};
