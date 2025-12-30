import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Loading from "@components/preloader/Loading";
import useGetSetting from "@hooks/useGetSetting";

const CategoryCarousel = () => {
  const router = useRouter();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { showingTranslateValue } = useUtilsFunction();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { storeCustomizationSetting } = useGetSetting();
  const storeColor = storeCustomizationSetting?.theme?.color || "pink";

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  // console.log("data", data, "error", error, "isFetched", isFetched);

  const handleCategoryClick = (id, category) => {
    const category_name = showingTranslateValue(category)
      ?.toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");

    router.push(`/search?category=${category_name}&_id=${id}`);
    setIsLoading(!isLoading);
  };

  return (
    <>
      <div className="relative category-carousel-wrapper my-10">
        <Swiper
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          navigation={true}
          allowTouchMove={true}
          loop={true}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 6,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 8,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 10,
            },
          }}
          modules={[Autoplay, Navigation, Pagination, Controller]}
          className="mySwiper category-slider"
        >
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
              {error?.response?.data?.message || error?.message}
            </p>
          ) : (
            data[0]?.children?.map((category, i) => (
              <SwiperSlide key={i + 1} className="group">
                <div
                  onClick={() =>
                    handleCategoryClick(category?._id, category.name)
                  }
                  className="text-center cursor-pointer p-3 bg-white rounded-lg hover:shadow-sm transition-all duration-300"
                >
                  <div className="bg-white p-2 mx-auto w-12 h-12 rounded-full shadow-md flex items-center justify-center">
                    <div className="relative w-8 h-8">
                      <Image
                        src={
                          category?.icon ||
                          "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        }
                        alt="category"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3
                    className={`text-xs text-gray-600 mt-2 font-serif group-hover:text-store-500 truncate`}
                  >
                    {showingTranslateValue(category?.name)}
                  </h3>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <button
          ref={prevRef}
          className="prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 text-gray-600 hover:text-store-500 transition-all"
        >
          <IoChevronBackOutline size={20} />
        </button>
        <button
          ref={nextRef}
          className="next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 text-gray-600 hover:text-store-500 transition-all"
        >
          <IoChevronForward size={20} />
        </button>
      </div>
    </>
  );
};

export default React.memo(CategoryCarousel);
