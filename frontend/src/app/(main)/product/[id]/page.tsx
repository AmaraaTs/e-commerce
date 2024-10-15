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
import { Heart } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useUser } from "@/provider/user-provider";
import { toast } from "react-toastify";

// interface IProduct {
//   name: string;
//   images: [string];
//   price: number;
//   description: string;
// }

export default function Detail() {
  const { user } = useUser();
  const router = useRouter();
  const { id } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [bigImgIdx, setBigImgIdx] = useState<number>(0);
  const [rating, setRating] = useState(5);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct | null>(null);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/product`);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/product/${id}`);
      if (response.status === 200) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  //  type inference
  const [count, setCount] = useState<number>(1);
  const minus = () => {
    // if (count === 1) {
    //   setCount(1);
    // } else {
    //   setCount(count - 1);
    // }
    setCount(Math.max(1, count - 1));
  };
  const add = () => {
    setCount(count + 1);
  };
  const getBigImg = (idx: number) => {
    setBigImgIdx(idx);
  };

  const starStyles = {
    itemShapes: Star,
    activeFillColor: "#FDE047",
    inactiveFillColor: "#FFFFFF",
  };
  // console.log("user", user);

  const addToCart = async () => {
    try {
      const res = await axios.post(`${apiUrl}/cart/create-cart`, {
        userId: user?._id,
        productId: id,
        quantity: count,
      });

      if (res.status === 200) {
        toast.success("Сагсанд амжилттай нэмлээ");
      }
    } catch (error) {
      console.log("Failed to add cart", error);
      toast.error("Сагсанд нэмэхэд алдаа гарлаа");
    }
    console.log("cart", user?._id, id, count);
  };
  // console.log("count", count);

  useEffect(() => {
    getAllProducts();
    getProduct();
  }, []);

  return (
    <main>
      <section className="mt-[60px] mb-24 max-w-[1100px] mx-auto  ">
        <div className="flex gap-16">
          <div className="flex gap-5 items-center h-[600px]">
            <div className="flex flex-col gap-2">
              {product?.images?.map((image, idx) => {
                return (
                  <Image
                    src={image}
                    alt="image1"
                    width={67}
                    height={67}
                    className="rounded-lg"
                    onClick={() => getBigImg(idx)}
                  />
                );
              })}
            </div>
            <div>
              <Image
                src={product?.images[bigImgIdx] || "/products/image1.png"}
                alt="image1"
                width={422}
                height={520}
                className="rounded-lg"
              />
            </div>
          </div>
          <div>
            <div className="mt-[100px] flex flex-col gap-4">
              {product?.isNew === true ? (
                <span className="border-[1px] border-[#2563EB] px-[10px] py-[2px] rounded-full text-xs text-[#09090B]">
                  Шинэ
                </span>
              ) : (
                <span></span>
              )}
              <div className="flex gap-2 items-center">
                <p className="text-2xl font-bold">{product?.name}</p>
                <Heart size={20} strokeWidth={1} className="" />
              </div>
              <p className="text-base w-[400px]">{product?.description}</p>
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
                <p className="text-xl font-bold mb-2">{product?.price}₮</p>
                <Button
                  className="bg-[#2563EB] px-9 py-2 rounded-full text-sm"
                  onClick={addToCart}
                >
                  Сагсанд нэмэх
                </Button>
              </div>
            </div>
            <div className="mt-[55px]">
              {/* rating */}
              <div>
                <div className="flex gap-4">
                  <p className="text-sm text-[#09090B]">Үнэлгээ</p>
                  {isOpenDetail ? (
                    <button
                      className="text-sm text-[#2563EB] underline"
                      onClick={() => {
                        setIsOpenDetail(false);
                      }}
                    >
                      бүгдийг хураах
                    </button>
                  ) : (
                    <button
                      className="text-sm text-[#2563EB] underline"
                      onClick={() => {
                        setIsOpenDetail(true);
                      }}
                    >
                      бүгдийг харах
                    </button>
                  )}
                </div>
                <div className="flex gap-1 items-center  mt-1">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={rating}
                    className="h-[20px] w-[20px]"
                    itemStyles={starStyles}
                    readOnly
                  />

                  <p className="text-[#09090B] text-sm font-bold">4.6</p>
                  <span className="text-[#71717A] text-sm ">(24)</span>
                </div>
              </div>
              {/* commends */}
              {isOpenDetail ? (
                <>
                  <div className="mt-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <p className="text-sm text-[#09090B] font-bold mr-1">
                          Saraa
                        </p>
                        <div className="flex gap-1">
                          <Rating
                            style={{ maxWidth: 100 }}
                            value={rating}
                            className="h-[16px] w-[16px]"
                            itemStyles={starStyles}
                            readOnly
                          />
                        </div>
                      </div>
                      <p className="text-[#71717A] text-sm ">
                        Ваав материал ёстой гоё байна 😍
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F4F4F5] p-6 mt-6">
                    <p className="text-sm text-[#09090B] font-medium">
                      Одоор үнэлэх:
                    </p>
                    <div className="flex mt-2">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={rating}
                        className="h-[20px] w-[20px]"
                        itemStyles={starStyles}
                        onChange={setRating}
                        isRequired
                      />
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
                </>
              ) : null}
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
