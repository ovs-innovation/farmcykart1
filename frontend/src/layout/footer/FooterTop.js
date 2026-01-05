import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";

const FooterTop = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  return (
    <>
      <div
        id="downloadApp"
        className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
            <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
              <Image
                src={
                  storeCustomizationSetting?.footer?.left_img ||
                  "/app-download-img-left.png"
                }
                alt="app download"
                width={500}
                height={394}
                className="block w-auto"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
                <CMSkeleton
                  count={1}
                  height={30}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.title}
                />
              </h3>
              <p className="text-base opacity-90 leading-7">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.subtitle}
                />
              </p>
              <div className="mt-8 flex gap-3 lg:gap-4 justify-center">
                <Link
                  href={`${storeCustomizationSetting?.footer?.app_store_link}`}
                  className="mx-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={170}
                    height={50}
                    className="mr-2 rounded"
                    src={
                      storeCustomizationSetting?.footer?.app_store_img ||
                      "/app/app-store.svg"
                    }
                    alt="app store"
                  />
                </Link>
                <Link
                  href={`${storeCustomizationSetting?.footer?.play_store_link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={170}
                    height={50}
                    className="mr-2 rounded"
                    src={
                      storeCustomizationSetting?.footer?.play_store_img ||
                      "/app/play-store.svg"
                    }
                    alt="play store"
                  />
                </Link>
              </div>
            </div>
            <div className="md:hidden lg:block">
              <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
                <Image
                  src={
                    storeCustomizationSetting?.footer?.right_img ||
                    "/app-download-img.png"
                  }
                  alt="app download"
                  width={500}
                  height={394}
                  className="block w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative pt-10 md:pt-16 pb-0 overflow-hidden -z-10 -mb-20 md:-mb-32">
        {/* Arc Border */}
        <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[100%] opacity-20 sm:opacity-100 md:w-[90%] lg:w-[70%] xl:w-[80%] h-[250px] md:h-[350px] border-[20px] md:border-[40px] border-store-500 rounded-t-[100%] border-b-0 bg-white z-0"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pb-32 md:pb-40 pt-6 md:pt-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Sign Up to Our Newsletter
          </h3>
          <div className="h-1.5 w-20 bg-store-500 mx-auto rounded-full mb-6"></div>

          <form className="max-w-md mx-auto relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-6 pr-14 py-3 md:py-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-store-500 outline-none shadow-sm text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-store-500 rounded-full flex items-center justify-center text-white hover:bg-store-600 transition-colors shadow-md"
            >
              <IoArrowForward size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FooterTop;
