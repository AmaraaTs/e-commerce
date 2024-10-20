"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { formattedPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  ICartProducts,
  IProduct,
  ISaved,
  ISavedProducts,
} from "@/app/utils/interfaces";
import Link from "next/link";
import { PiTrashLight } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { apiUrl } from "@/app/utils/util";
import { UserContext } from "@/provider/user-provider";
import { toast } from "react-toastify";

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
  const { user } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [products, setProducts] = useState<ISaved[]>([]);

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
        // console.log("Ress", response.data.savedProducts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const isSavedCheck = () => {
  //   {
  //     products.map((productItem) => {
  //       productItem.products.map((pro) => {
  //         if (pro?.product._id === product?._id) {
  //           return setIsSaved(true);
  //         } else {
  //           return setIsSaved(false);
  //         }
  //       });
  //     });
  //   }
  // };

  const isSavedCheck = () => {
    let found = false;

    products.forEach((productItem) => {
      productItem.products.forEach((pro) => {
        if (pro?.product._id === product?._id) {
          found = true;
        }
      });
    });

    setIsSaved(found); // Set the final result
  };

  const postSavedProduct = async (productId: string) => {
    // console.log("productId", productId);
    try {
      const response = await axios.post(`${apiUrl}/api/v1/saved`, {
        userId: user?._id,
        productId,
      });
      if (response.status === 200) {
        console.log("res", response.data);
        getAllSavedProducts(), isSavedCheck();
      }
    } catch (error) {
      console.error("There was an error signing in:", error);
    }
    // console.log("Res", response.data);
  };

  const deleteSaved = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${apiUrl}/api/v1/saved/delete-saved`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { productId: product._id },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully deleted saved product");
        getAllSavedProducts(), isSavedCheck();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to delete saved product");
    }
  };

  // useEffect(() => {
  //   postSavedProduct(), deleteSavedProduct();
  // }, [isSaved]);

  useEffect(() => {
    getAllSavedProducts(); // Fetch the saved products initially
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    isSavedCheck(); // Check if the product is saved whenever 'products' change
  }, [products, product]);

  return (
    <div className="relative">
      <Link href={"/product/" + product._id}>
        <div className="relative w-[244px]">
          <Image
            src={product.images[0]}
            alt="image"
            width={244}
            height={331}
            className="rounded-lg"
          />
          <div className="mt-2">
            <h3 className="font-light">{product.name}</h3>
            <PriceWithDiscount
              price={product.price}
              discount={product.discount}
            />
          </div>
        </div>
      </Link>
      {isSaved ? (
        <Heart
          size={22}
          strokeWidth={1}
          className="absolute top-4 right-8 "
          onClick={deleteSaved}
          color="red"
          fill="red"
        />
      ) : (
        <Heart
          size={22}
          strokeWidth={1}
          className="absolute top-4 right-8 "
          onClick={() => postSavedProduct(product?._id)}
        />
      )}
    </div>
  );
};

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

export const SavedProductCard = ({
  productCart,
}: {
  productCart: ISavedProducts;
}) => {
  const { product } = productCart;

  const deleteSaved = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${apiUrl}/api/v1/saved/delete-saved`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { productId: product._id },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully deleted saved product");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to delete saved product");
    }
  };

  return (
    <div className="flex w-full rounded-2xl border-[1px] border[#ECEDF0] p-4 bg-white">
      <Link href={"/product/" + product._id}>
        <Image
          src={product.images[0]}
          alt="image1"
          width={100}
          height={100}
          className="rounded-lg"
        />
      </Link>
      <div className=" ml-6 w-full">
        <h3 className="text-base">{product.name}</h3>
        <PriceWithDiscount price={product.price} discount={product.discount} />
        <Button className="bg-[#2563EB] px-3 py-2 rounded-full text-sm font-medium mt-2">
          Сагсанд нэмэх
        </Button>
      </div>
      <Heart
        color="red"
        fill="red"
        size={24}
        strokeWidth={1}
        className="ml-8"
        onClick={deleteSaved}
      />
    </div>
  );
};

export const CartProductCard = ({
  productCart,
  handleQuantityChange,
}: {
  productCart: ICartProducts;
  handleQuantityChange: (productId: string, newQuantity: number) => void;
}) => {
  // console.log("product in Cat", product);
  const [totalSalesOne, setTotalSalesOne] = useState<number>(0);
  const { product } = productCart;
  const [count, setCount] = useState<number>(productCart.quantity);

  const updateQuantity = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/cart/update-cart`,
        {
          productId: product._id,
          changedQuantity: count,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.status === 200) {
        // onQuantityChange();
        // toast.success("Successfully updated");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // toast.error("Failed to update to cart");
    }
  };

  const deleteCart = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${apiUrl}/api/v1/cart/delete-cart`, {
        headers: { Authorization: `Bearer ${userToken}` },
        data: { productId: product._id },
      });

      if (response.status === 200) {
        toast.success("Successfully deleted");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to delete cart");
    }
  };

  const minus = () => {
    if (count === 1) {
      setCount(1);
      updateQuantity();
      handleQuantityChange(product._id, count);
    } else {
      setCount(count - 1);
      updateQuantity();
      handleQuantityChange(product._id, count - 1);
    }
  };
  const add = () => {
    setCount(count + 1);
    updateQuantity();
    handleQuantityChange(product._id, count + 1);
  };

  const calculateTotal = () => {
    setTotalSalesOne(product.price * count);
  };

  useEffect(() => {
    calculateTotal();
    updateQuantity();
  }, [count]);

  console.log("Count", count);

  return (
    <div className="flex justify-between gap-6 border-[1px] border-[#ECEDF0] rounded-2xl p-4">
      <Link href={"/product/" + product._id}>
        <img
          src={product.images[0]}
          alt="photo"
          className="h-[100px] w-[100px] bg-contain rounded-2xl"
        />
      </Link>
      <div className="w-full">
        <p className="text-base">{product.name}</p>
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
        <p className="text-base mt-2 font-bold">
          {totalSalesOne.toLocaleString()}₮
        </p>
      </div>
      <PiTrashLight size={24} onClick={deleteCart} />
    </div>
  );
};
