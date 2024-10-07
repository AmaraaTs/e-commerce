"use client";

import { apiUrl } from "@/app/utils/util";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const NewPass = () => {
  const router = useRouter();
  const params = useSearchParams();

  interface IPass {
    password: string;
    repassword: string;
  }
  const [passData, setPassData] = useState<IPass>({
    password: "",
    repassword: "",
  });

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

  return (
    <div className="h-[calc(100vh-363px)] flex flex-col items-center">
      <div className="w-[320px] mt-24">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Нууц үг сэргээх
        </h1>
        <div className="flex flex-col gap-4 text-sm">
          <Input
            type="password"
            placeholder="Шинэ нууц үг"
            className="input-primary"
            onChange={(e) =>
              setPassData({ ...passData, password: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Шинэ нууц үг давтах"
            className="input-primary"
            onChange={(e) =>
              setPassData({ ...passData, repassword: e.target.value })
            }
          />
          <ul className="list-disc pl-5 text-muted-foreground text-xs font-light leading-5 flex flex-col gap-0.5">
            <li>Том үсэг орсон байх</li>
            <li>Жижиг үсэг орсон байх</li>
            <li>Тоо орсон байх</li>
            <li>Тэмдэгт орсон байх</li>
          </ul>
          <Button className="button-primary" onClick={handleNewPassword}>
            Үүсгэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
