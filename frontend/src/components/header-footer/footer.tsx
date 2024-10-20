import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black px-[200px] py-16">
      <div className="flex justify-between pb-[43px] border-b-[1.5px] border-white border-opacity-10">
        <img src="/img/Vector.png" alt="photo" className="w-[41px] h-[35px]" />
        <div className="flex items-center gap-[38px] ">
          <div className="flex items-center gap-5">
            <Phone
              size={20}
              color="white"
              className="border-[1px] w-12 border-white h-12 rounded-full p-[14px]"
            />
            <span className="text-white text-sm">(976) 9006-9669</span>
          </div>
          <div className="flex items-center gap-5">
            <Mail
              size={20}
              color="white"
              className="border-[1px] w-12 border-white h-12 rounded-full p-[14px]"
            />
            <span className="text-white text-sm">amarjargal.ts01@gmail.mn</span>
          </div>
        </div>
      </div>
      <div className="flex pt-[43px] justify-between">
        <p className="text-white text-sm">© 2024 Ecommerce MN</p>
        <div className="flex gap-[26px]">
          <FaFacebook size={20} color="white" />
          <FaInstagram size={20} color="white" />
          <FaTwitter size={20} color="white" />
          <FaLinkedin size={20} color="white" />
        </div>
      </div>
    </footer>
  );
};
