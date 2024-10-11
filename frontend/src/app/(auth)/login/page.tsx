"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "@/app/utils/util";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [iseEyeOpen, setIsEyeOpen] = useState<boolean>(false);

  interface IUser {
    email: string;
    password: string;
  }

  const [userData, setUserData] = useState<IUser>({
    email: "",
    password: "",
  });

  const login = async () => {
    const { email, password } = userData;

    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Хэрэглэгч амжилттай нэвтэрлээ", { autoClose: 1000 });
        const { token } = response.data;
        localStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error) {
      console.error("There was an error signing in:", error);
      toast.error("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
    }
  };

  return (
    <section className="h-[calc(100vh-363px)] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 w-[334px]">
        <h3 className="text-2xl font-semibold">Нэвтрэх</h3>
        <div className="flex flex-col w-full gap-4">
          <Input
            placeholder="Имэйл хаяг"
            className="w-full rounded-[18px] px-3 py-1 text-sm"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></Input>
          <div className="flex justify-end items-center">
            <Input
              type={iseEyeOpen ? "text" : "password"}
              placeholder="Нууц үг"
              className="w-full rounded-[18px] px-3 py-1 text-sm"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            ></Input>
            {iseEyeOpen ? (
              <FaRegEyeSlash
                className="flex absolute mr-5"
                color="gray"
                onClick={() => setIsEyeOpen(false)}
              />
            ) : (
              <FaRegEye
                className="flex absolute mr-5"
                color="gray"
                onClick={() => setIsEyeOpen(true)}
              />
            )}
          </div>
          <Button
            className="w-full rounded-[18px] px-4 py-2 bg-[#2563EB] text-white"
            onClick={login}
          >
            Нэвтрэх
          </Button>
          <Link href="/forgetpass/email" className="m-auto w-1/2">
            <Button className="w-full m-auto bg-inherit border-none text-sm text-[#71717A] underline-offset-2">
              Нууц үг мартсан
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="w-full rounded-[18px] px-4 py-2 text-[#2563EB] bg-white border-[1px] border-[#2563EB]">
              Бүртгүүлэх
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
