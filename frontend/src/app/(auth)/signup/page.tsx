"use client";
import { apiUrl } from "@/app/utils/util";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [passUpper, setPassUpper] = useState<boolean>(false);
  const [passLower, setPassLower] = useState<boolean>(false);
  const [passNumber, setPassNumber] = useState<boolean>(false);
  const [passSymbol, setPassSymbol] = useState<boolean>(false);
  const [iseEyeOpen, setIsEyeOpen] = useState<boolean>(false);

  interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    repassword: string;
  }

  const [userData, setUserData] = useState<IUser>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const check = () => {
    const { email, password } = userData;
    try {
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        setEmailCheck(true);
        setIsChecked(true);
      } else {
        setEmailCheck(false);
        setIsChecked(false);
      }

      if (!/[A-Z]/.test(password)) {
        setPassUpper(false);
        setIsChecked(false);
      } else {
        setPassUpper(true);
        setIsChecked(true);
      }

      if (!/[a-z]/.test(password)) {
        setPassLower(false);
        setIsChecked(false);
      } else {
        setPassLower(true);
        setIsChecked(true);
      }

      if (!/[0-9]/.test(password)) {
        setPassNumber(false);
        setIsChecked(false);
      } else {
        setPassNumber(true);
        setIsChecked(true);
      }

      if (!/[^A-Za-z0-9]/.test(password)) {
        setPassSymbol(false);
        setIsChecked(false);
      } else {
        setPassSymbol(true);
        setIsChecked(true);
      }
    } catch (error) {
      setIsChecked(false);
      console.error("There was an error signing up:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const signUp = async () => {
    const { firstname, lastname, email, password, repassword } = userData;

    if (password !== repassword) {
      toast.error("Нууц үг хоорондоо тохирохгүй байна.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, firstname, lastname, password }),
      });

      if (response.status === 201) {
        toast.success("Хэрэглэгч амжилттай бүртгэгдлээ", { autoClose: 1000 });
        router.push("/login");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  useEffect(() => {
    check();
  }, [userData]);

  return (
    <section className="h-[806px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 w-[334px]">
        <h3 className="text-2xl font-semibold">Бүртгүүлэх</h3>
        <div className="flex flex-col w-full gap-4">
          <Input
            placeholder="Нэр"
            className="w-full rounded-[18px] px-3 py-1 text-sm"
            value={userData.firstname}
            onChange={(e) =>
              setUserData({ ...userData, firstname: e.target.value })
            }
          ></Input>
          <Input
            placeholder="Овог"
            className="w-full rounded-[18px] px-3 py-1 text-sm"
            value={userData.lastname}
            onChange={(e) =>
              setUserData({ ...userData, lastname: e.target.value })
            }
          ></Input>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Имэйл хаяг"
              className="w-full rounded-[18px] px-3 py-1 text-sm"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></Input>
            {emailCheck === false ? (
              <p className="w-full rounded-[18px] px-3 py-1 text-sm text-[#E11D48]">
                Зөв имэйл хаяг оруулна уу.
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-end items-center">
            <Input
              type={iseEyeOpen ? "text" : "password"}
              placeholder="Нууц үг"
              className="w-full rounded-[18px] px-3 py-1 text-sm"
              value={userData.password}
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
          <Input
            type={iseEyeOpen ? "text" : "password"}
            placeholder="Нууц үг давтах"
            className="w-full rounded-[18px] px-3 py-1 text-sm"
            value={userData.repassword}
            onChange={(e) =>
              setUserData({ ...userData, repassword: e.target.value })
            }
          ></Input>
          <div className=" flex flex-col gap-1">
            <p
              className={`bg-inherit border-none text-xs leading-[19px] ${
                passUpper ? "text-[#71717A]" : "text-[#E11D48]"
              }  underline-offset-2`}
            >
              • Том үсэг орсон байх
            </p>
            <p
              className={` bg-inherit border-none text-xs leading-[19px] underline-offset-2 ${
                passLower ? "text-[#71717A]" : "text-[#E11D48]"
              }`}
            >
              • Жижиг үсэг орсон байх
            </p>
            <p
              className={` bg-inherit border-none text-xs leading-[19px] underline-offset-2 ${
                passNumber ? "text-[#71717A]" : "text-[#E11D48]"
              }`}
            >
              • Тоо орсон байх
            </p>
            <p
              className={` bg-inherit border-none text-xs leading-[19px] underline-offset-2 ${
                passSymbol ? "text-[#71717A]" : "text-[#E11D48]"
              }`}
            >
              • Тэмдэгт орсон байх
            </p>
          </div>
          {isChecked ? (
            <Button
              className="w-full rounded-[18px] px-4 py-2 bg-[#2563EB] text-white"
              onClick={signUp}
            >
              Үүсгэх
            </Button>
          ) : (
            <Button className="w-full rounded-[18px] px-4 py-2 bg-[#2563EB] text-white">
              Үүсгэх
            </Button>
          )}

          <Link href="/login">
            <Button className="w-full rounded-[18px] px-4 py-2 text-[#2563EB] bg-white border-[1px] border-[#2563EB]">
              Нэвтрэх
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
