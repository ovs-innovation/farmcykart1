import React from "react";
import Image from "next/image";
import Link from "next/link";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useGetSetting from "@hooks/useGetSetting";
import { getPalette } from "@utils/themeColors";

const TrustedBrandsSection = ({ brands = [] }) => {
  const { showingTranslateValue, showingImage } = useUtilsFunction();
  const { storeCustomizationSetting } = useGetSetting();
  const storeColor = storeCustomizationSetting?.theme?.color || "green";
  const palette = getPalette(storeColor);

  // Filter brands that have logos
  const brandsWithLogos = brands.filter(brand => brand?.logo && brand.logo.trim() !== '');

  if (!brandsWithLogos.length) return null;

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Title and Description */}
          <div className="order-1 lg:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-store-900 mb-4">
              Top Brands You Can Trust
            </h2>
            {/* Wavy line graphic */}
            <div className="flex justify-start mb-6">
              <svg
                width="100"
                height="16"
                viewBox="0 0 120 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: palette[600] }}
              >
                <path
                  d="M0 10 L30 10 L35 5 L40 15 L45 10 L75 10 L80 5 L85 15 L90 10 L120 10"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed text-justify">
              <p>
              Shop medicines and healthcare essentials from leading brands known for their quality, authenticity, and reliability in healthcare.
              </p>
              <p>
              All featured brands follow established medical standards, ensuring that every product meets safety and compliance requirements.
              </p>
              <p>With trusted names in one place, Farmacykart helps you choose genuine healthcare products for your everyday health needs with confidence.</p>
            </div>
          </div>

          {/* Right Side - Scrolling Brand Logos */}
          <div className="order-1 lg:order-2">
            <div className="relative p-6 md:p-8  overflow-hidden h-[300px] md:h-[350px] flex flex-col justify-center gap-4 md:gap-6">
              {/* First Row - Scroll Left to Right */}
              <div className="relative overflow-hidden w-full h-1/2">
                <div 
                  className="flex gap-6 md:gap-8 h-full items-center trusted-brands-scroll-left"
                  style={{
                    width: 'max-content',
                  }}
                >
                  {/* First set of brands */}
                  {brandsWithLogos.map((brand, index) => {
                    const logoUrl = showingImage(brand.logo) || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";
                    return (
                      <Link
                        key={`brand-row1-1-${brand._id}`}
                        href={`/search?brand=${brand._id}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-gray-100 relative overflow-hidden">
                          <Image
                            src={logoUrl}
                            alt={showingTranslateValue(brand.name) || "Brand"}
                            fill
                            sizes="(max-width: 768px) 80px, 112px"
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      </Link>
                    );
                  })}
                  {/* Duplicate set for seamless loop */}
                  {brandsWithLogos.map((brand, index) => {
                    const logoUrl = showingImage(brand.logo) || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";
                    return (
                      <Link
                        key={`brand-row1-2-${brand._id}`}
                        href={`/search?brand=${brand._id}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-gray-100 relative overflow-hidden">
                          <Image
                            src={logoUrl}
                            alt={showingTranslateValue(brand.name) || "Brand"}
                            fill
                            sizes="(max-width: 768px) 80px, 112px"
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Second Row - Scroll Right to Left */}
              <div className="relative overflow-hidden w-full h-1/2">
                <div 
                  className="flex gap-6 md:gap-8 h-full items-center trusted-brands-scroll-right"
                  style={{
                    width: 'max-content',
                  }}
                >
                  {/* First set of brands */}
                  {brandsWithLogos.map((brand, index) => {
                    const logoUrl = showingImage(brand.logo) || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";
                    return (
                      <Link
                        key={`brand-row2-1-${brand._id}`}
                        href={`/search?brand=${brand._id}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-gray-100 relative overflow-hidden">
                          <Image
                            src={logoUrl}
                            alt={showingTranslateValue(brand.name) || "Brand"}
                            fill
                            sizes="(max-width: 768px) 80px, 112px"
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      </Link>
                    );
                  })}
                  {/* Duplicate set for seamless loop */}
                  {brandsWithLogos.map((brand, index) => {
                    const logoUrl = showingImage(brand.logo) || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";
                    return (
                      <Link
                        key={`brand-row2-2-${brand._id}`}
                        href={`/search?brand=${brand._id}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-gray-100 relative overflow-hidden">
                          <Image
                            src={logoUrl}
                            alt={showingTranslateValue(brand.name) || "Brand"}
                            fill
                            sizes="(max-width: 768px) 80px, 112px"
                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for Scrolling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes trustedBrandsScrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 12px));
            }
          }
          @keyframes trustedBrandsScrollRight {
            0% {
              transform: translateX(calc(-50% - 12px));
            }
            100% {
              transform: translateX(0);
            }
          }
          .trusted-brands-scroll-left {
            animation: trustedBrandsScrollLeft 35s linear infinite;
          }
          .trusted-brands-scroll-left:hover {
            animation-play-state: paused;
          }
          .trusted-brands-scroll-right {
            animation: trustedBrandsScrollRight 35s linear infinite;
          }
          .trusted-brands-scroll-right:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
};

export default TrustedBrandsSection;

