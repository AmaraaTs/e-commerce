"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Search } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/provider/user-provider";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProduct } from "@/app/utils/interfaces";
import axios from "axios";
import { apiUrl } from "@/app/utils/util";

export const Header = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
    setUser(null);
  };

  const [products, setProducts] = useState<IProduct[]>([]);
  const getAllProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/v1/product`);
    setProducts(response.data.products);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]); // Clear filtered products if no search query
    }
  }, [searchQuery, products]);

  // useEffect(() => {}, [user]);
  return (
    <div className="relative">
      <header className="flex justify-between bg-black px-6 py-4 items-center">
        <div className="flex gap-8 items-center">
          <Link href="/">
            <div className="flex gap-[6px] items-center">
              <img src="/img/Vector.png" alt="photo" className="w-8 h-[27px]" />
              <div className="text-white text-sm">ECOMMERCE</div>
            </div>
          </Link>
          <Link href="/category">
            <div className="text-white text-sm opacity-75">Ангилал</div>
          </Link>
        </div>
        <div className="bg-[#18181B] rounded-[20px] flex items-center px-4 py-1 gap-2 w-[300px]">
          <Search color="#FAFAFA" size={24} />
          <Input
            type="text"
            placeholder="Бүтээгдэхүүн хайх"
            className="text-[#71717A] text-sm border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/save">
            <FaRegHeart color="white" size={24} />{" "}
          </Link>
          <Link href="/cart">
            <IoCartOutline color="white" size={24} />
          </Link>
          {user && (
            <>
              <Link href="/userinfo">
                <User color="white" />{" "}
              </Link>
              <LogOut color="white" onClick={logOut} />
            </>
          )}
          {!user && (
            <>
              <Link href="/signup">
                <Button className="rounded-[18px] border-[#2563EB] border-[1px] py-2 px-3 text-white text-sm">
                  Бүртгүүлэх
                </Button>
              </Link>
              <Link href="/login">
                <Button className="rounded-[18px] py-2 px-3 text-white text-sm bg-[#2563EB]">
                  Нэвтрэх
                </Button>
              </Link>
            </>
          )}
          {/* <IoMdPerson color="white" size={24} /> */}
        </div>
      </header>
      {searchQuery && (
        <div className="absolute w-[600px] ml-[calc(50vw-300px)] bg-white max-h-[432px] rounded-2xl p-8 gap-4 overflow-y-scroll z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product._id} href={"/product/" + product._id}>
                <div className="flex gap-6 items-center mb-4">
                  <img
                    src={product.images[0]}
                    alt="photo"
                    className="h-20 w-20 rounded-2xl"
                  />
                  <div>
                    <p className="text-base">{product.name}</p>
                    <p className="mt-1 text-base font-bold">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center">Бараа олдсонгүй</p>
          )}
        </div>
      )}
    </div>
  );
};
