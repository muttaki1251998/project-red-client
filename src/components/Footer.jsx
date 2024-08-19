import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Footer = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="bg-black py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-4">
          <p className="text-3xl mb-2">
            SCHOLAR BANGLA is a non-profit project developed to help out
            Bangladesh find talented Bangladeshis all around the world ready to
            help out Bangladesh in any upcoming crisis. This project is a
            tribute to all the Bangladeshi students lost in the 2024 Liberation
            war.
          </p>
        </div>
        <div className="sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <p className="text-xl">SCHOLAR BANGLA</p>
              <span className="text-xl">DEVELOPED BY MUHAMMAD MUTTAKI</span>
              <br />
              <span className="text-xl">Email: muttaki4989@gmail.com</span>
              <br />
              <br />
              <span className="text-xl">
                ORGANIZED BY NASIF BIN SAIF RASHIK
              </span>
              <br />
              <span className="text-xl">Email: nasifbinsaif@gmail.com</span>
            </div>
            <div className="space-y-4">
              {/* Replace form with an image */}
              <div className="w-full flex justify-center">
                <img
                  src="/abu-syed.webp"  // Replace with the correct path to your image
                  alt="Support Image"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <p className="text-sm">
              © Copyright 2024 SCHOLAR BANGLA. A tribute to Abu Syed, Mugdho and
              all the other Martyrs of the 2024 Bangladesh Liberation War.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
