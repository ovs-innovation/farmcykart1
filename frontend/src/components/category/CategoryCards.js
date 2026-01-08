import React from "react";
import { useRouter } from "next/router";
import { 
  FiHeart, 
  FiActivity, 
  FiShield, 
  FiSmile
} from "react-icons/fi";
import { MdChildCare } from "react-icons/md";
import { BsDroplet } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import useGetSetting from "@hooks/useGetSetting";
import { getPalette } from "@utils/themeColors";
import SectionHeader from "@components/common/SectionHeader";

const CategoryCards = () => {
  const router = useRouter();
  const { storeCustomizationSetting } = useGetSetting();
  const storeColor = storeCustomizationSetting?.theme?.color || "green";
  const palette = getPalette(storeColor);

  const categories = [
    {
      id: 1,
      title: "DIABETES CARE",
      description: "Medicines, glucose monitors, test strips, and daily care essentials for diabetes management.",
      icon: BsDroplet,
      searchQuery: "diabetes",
    },
    {
      id: 2,
      title: "HEART CARE",
      description: "Prescription and OTC medicines for blood pressure, cholesterol, and heart health support.",
      icon: FiHeart,
      searchQuery: "heart",
    },
    {
      id: 3,
      title: "PAIN RELIEF",
      description: "Painkillers, muscle relaxants, and inflammation relief medicines.",
      icon: FiActivity,
      searchQuery: "pain",
    },
    {
      id: 4,
      title: "COLD & COUGH",
      description: "Syrups, tablets, lozenges, and immunity boosters.",
      icon: FiShield,
      searchQuery: "cold",
    },
    {
      id: 5,
      title: "BABY CARE",
      description: "Baby medicines, nutrition, skincare, and hygiene products.",
      icon: MdChildCare,
      searchQuery: "baby",
    },
    {
      id: 6,
      title: "WOMEN'S HEALTH",
      description: "Personal care, supplements, and wellness products for women.",
      icon: FiSmile,
      searchQuery: "women",
    },
  ];

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        {/* Header Section */}
        <SectionHeader
          title="Departments"
          subtitle=" "
          align="left"
        />

        {/* Category Cards Carousel */}
        <div className="relative">
          <style dangerouslySetInnerHTML={{
            __html: `
              .category-cards-swiper .swiper-button-next,
              .category-cards-swiper .swiper-button-prev {
                background-color: white !important;
                width: 40px !important;
                height: 40px !important;
                border-radius: 50% !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
                transition: all 0.3s ease !important;
              }
              .category-cards-swiper .swiper-button-next:hover,
              .category-cards-swiper .swiper-button-prev:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
                transform: scale(1.1) !important;
              }
              .category-cards-swiper .swiper-button-next::after,
              .category-cards-swiper .swiper-button-prev::after {
                font-size: 18px !important;
                font-weight: bold !important;
                color: #333 !important;
              }
              .category-cards-swiper .swiper-button-next {
                right: 10px !important;
              }
              .category-cards-swiper .swiper-button-prev {
                left: 10px !important;
              }
            `
          }} />
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            navigation={true}
            className="category-cards-swiper"
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <SwiperSlide key={category.id}>
                  <div
                    className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${palette[600]}f0 0%, ${palette[700]}f0 100%)`,
                      minHeight: "320px",
                    }}
                    onClick={() => router.push(`/search?query=${category.searchQuery}`)}
                  >
                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="60" height="60" fill="url(%23grid)" /%3E%3C/svg%3E')`,
                        backgroundSize: "60px 60px",
                      }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
                      {/* Icon */}
                      <div className="mb-6 relative z-30">
                        <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white border-opacity-30 group-hover:bg-opacity-30 transition-all duration-300">
                          <IconComponent className="text-3xl text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wide text-left relative z-30"
                        style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                      >
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white text-opacity-90 text-sm md:text-base flex-1 leading-relaxed relative z-30 mb-4" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                        {category.description}
                      </p>

                      {/* Decorative Icon at Bottom Left */}
                      <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-30 transition-opacity z-0 pointer-events-none">
                        <IconComponent className="text-6xl md:text-7xl text-white" />
                      </div>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;

