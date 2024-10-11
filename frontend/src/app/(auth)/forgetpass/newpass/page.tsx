"use client";

import { apiUrl } from "@/app/utils/util";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const NewPass = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [passUpper, setPassUpper] = useState<boolean>(false);
  const [passLower, setPassLower] = useState<boolean>(false);
  const [passNumber, setPassNumber] = useState<boolean>(false);
  const [passSymbol, setPassSymbol] = useState<boolean>(false);
  const [iseEyeOpen, setIsEyeOpen] = useState<boolean>(false);

  interface IPass {
    password: string;
    repassword: string;
  }
  const [passData, setPassData] = useState<IPass>({
    password: "",
    repassword: "",
  });

  const check = () => {
    const { password } = passData;
    try {
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

  const handleNewPassword = async () => {
    const { password, repassword } = passData;

    if (password !== repassword) {
      toast.error("Нууц үг хоорондоо тохирохгүй байна.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/verify-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          password,
          resetToken: params.get("resettoken"),
        }),
      });

      if (response.status === 200) {
        toast.success("Нууц үг амжилттай солигдлоо", { autoClose: 1000 });
        router.push("/login");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  useEffect(() => {
    check();
  }, [passData]);

  return (
    <div className="h-[calc(100vh-363px)] flex flex-col items-center">
      <div className="w-[320px] mt-24">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Нууц үг сэргээх
        </h1>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-end items-center">
            <Input
              type={iseEyeOpen ? "text" : "password"}
              placeholder="Шинэ нууц үг"
              className="input-primary"
              onChange={(e) =>
                setPassData({ ...passData, password: e.target.value })
              }
            />
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
            placeholder="Шинэ нууц үг давтах"
            className="input-primary"
            onChange={(e) =>
              setPassData({ ...passData, repassword: e.target.value })
            }
          />

          <ul className="list-disc pl-5 text-muted-foreground text-xs font-light leading-5 flex flex-col gap-0.5">
            <li
              className={`${passUpper ? "text-[#71717A]" : "text-[#E11D48]"}`}
            >
              Том үсэг орсон байх
            </li>
            <li
              className={`${passLower ? "text-[#71717A]" : "text-[#E11D48]"}`}
            >
              Жижиг үсэг орсон байх
            </li>
            <li
              className={`${passNumber ? "text-[#71717A]" : "text-[#E11D48]"}`}
            >
              Тоо орсон байх
            </li>
            <li
              className={`${passSymbol ? "text-[#71717A]" : "text-[#E11D48]"}`}
            >
              Тэмдэгт орсон байх
            </li>
          </ul>
          {isChecked ? (
            <Button className="button-primary" onClick={handleNewPassword}>
              Үүсгэх
            </Button>
          ) : (
            <Button className="button-primary">Үүсгэх</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPass;
