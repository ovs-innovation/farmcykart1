import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { 
  FaInstagram
} from "react-icons/fa";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiChevronRight,
  FiFileText,
  FiShield,
  FiRefreshCw,
  FiTruck,
  FiUser,
  FiShoppingBag,
  FiPackage,
  FiSettings
} from "react-icons/fi";

//internal import
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import FeatureCard from "@components/feature-card/FeatureCard";

const Footer = () => {
  const { t } = useTranslation();
  const userInfo = getUserSession();

  const { showingTranslateValue } = useUtilsFunction();
  const { loading, storeCustomizationSetting } = useGetSetting();
  const storeColor = storeCustomizationSetting?.theme?.color || "green";

  // SafeLink: render a Next <Link> only when href is provided, otherwise render a span
  // This prevents Next Link prop-type errors when CMS settings don't include a URL
  const SafeLink = ({ href, children, ...props }) => {
    if (!href) {
      // remove props that are only valid on anchor elements
      const { target, rel, ...safeProps } = props;
      return <span {...safeProps}>{children}</span>;
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  };

  return (
    <div className="pb-16 lg:pb-0 xl:pb-0 bg-store-500 text-white rounded-t-[30px] lg:rounded-t-[120px] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 relative z-10">
        <div className="py-6 border-b border-store-400 border-opacity-30">
           <FeatureCard />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
          {storeCustomizationSetting?.footer?.block1_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg lg:text-xl font-bold mb-5 sm:mb-6 lg:mb-7 pb-2 text-white border-b-2 border-white border-opacity-20 inline-block">
                <CMSkeleton
                  count={1}
                  height={24}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block1_title}
                />
              </h3>
              <ul className="text-sm flex flex-col space-y-3.5">
                <li className="group">
                  <SafeLink
                    href={storeCustomizationSetting?.footer?.block1_sub_link1}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block1_sub_title1
                      }
                    />
                  </SafeLink>
                </li>
                <li className="group">
                  <SafeLink
                    href={storeCustomizationSetting?.footer?.block1_sub_link2}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block1_sub_title2
                      }
                    />
                  </SafeLink>
                </li>
                <li className="group">
                  <SafeLink
                    href={storeCustomizationSetting?.footer?.block1_sub_link3}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {showingTranslateValue(
                      storeCustomizationSetting?.footer_block_one_link_three_title
                    )}
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block1_sub_title3
                      }
                    />
                  </SafeLink>
                </li>
                <li className="group">
                  <SafeLink
                    href={storeCustomizationSetting?.footer?.block1_sub_link4}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block1_sub_title4
                      }
                    />
                  </SafeLink>
                </li>
              </ul>
            </div>
          )}
          {storeCustomizationSetting?.footer?.block2_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg lg:text-xl font-bold mb-5 sm:mb-6 lg:mb-7 pb-2 text-white border-b-2 border-white border-opacity-20 inline-block">
                <CMSkeleton
                  count={1}
                  height={24}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block2_title}
                />
              </h3>
              <ul className="text-sm lg:text-15px flex flex-col space-y-3.5">
                <li className="group">
                  <Link
                    href={`${storeCustomizationSetting?.footer?.block2_sub_link1}`}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiFileText className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block2_sub_title1
                      }
                    />
                  </Link>
                </li>

                <li className="group">
                  <Link
                    href={`${storeCustomizationSetting?.footer?.block2_sub_link2}`}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiShield className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block2_sub_title2
                      }
                    />
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href={`${storeCustomizationSetting?.footer?.block2_sub_link3}`}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiRefreshCw className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block2_sub_title3
                      }
                    />
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href={`${storeCustomizationSetting?.footer?.block2_sub_link4}`}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiTruck className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block2_sub_title4
                      }
                    />
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {storeCustomizationSetting?.footer?.block3_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg lg:text-xl font-bold mb-5 sm:mb-6 lg:mb-7 pb-2 text-white border-b-2 border-white border-opacity-20 inline-block">
                <CMSkeleton
                  count={1}
                  height={24}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block3_title}
                />
              </h3>
              <ul className="text-sm lg:text-15px flex flex-col space-y-3.5">
                <li className="group">
                  <Link
                    href={storeCustomizationSetting?.footer?.block3_sub_link1}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiSettings className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block3_sub_title1
                      }
                    />
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href={storeCustomizationSetting?.footer?.block3_sub_link2}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiPackage className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block3_sub_title2
                      }
                    />
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href={storeCustomizationSetting?.footer?.block3_sub_link3}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiShoppingBag className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block3_sub_title3
                      }
                    />
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href={storeCustomizationSetting?.footer?.block3_sub_link4}
                    className="text-gray-100 inline-flex items-center w-full hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <FiUser className="w-4 h-4 mr-2 text-store-300 group-hover:text-white transition-colors" />
                    <CMSkeleton
                      count={1}
                      height={16}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.footer?.block3_sub_title4
                      }
                    />
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {storeCustomizationSetting?.footer?.block4_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3 flex md:flex-col flex-col-reverse items-center lg:items-start text-center lg:text-left">
              {/* Logo Section */}
              <Link href="/" className="mb-5 lg:mb-6 group" rel="noreferrer">
                <div className="relative w-32 sm:w-40 md:w-44 lg:w-48 mx-auto lg:mx-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={
                      storeCustomizationSetting?.footer?.block4_logo ||
                      "/logo/logo.png"
                    }
                    alt="logo"
                    width={200}
                    height={80}
                    className="w-full h-auto max-h-20 object-contain drop-shadow-lg"
                    sizes="100vw"
                    priority
                  />
                </div>
              </Link>

              {/* Address Section */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-100 group">
                  <FiMapPin className="w-5 h-5 text-store-300 flex-shrink-0 mt-1 group-hover:text-white transition-colors" />
                  <p className="leading-7 font-sans text-sm text-left">
                    <CMSkeleton
                      count={1}
                      height={40}
                      loading={loading}
                      data={storeCustomizationSetting?.footer?.block4_address}
                    />
                  </p>
                </div>
                <div className="flex items-center gap-3 text-gray-100 group hover:text-white transition-colors">
                  <FiPhone className="w-5 h-5 text-store-300 flex-shrink-0 group-hover:text-white transition-colors" />
                  <a 
                    href={`tel:${storeCustomizationSetting?.footer?.block4_phone}`}
                    className="text-sm hover:underline"
                  >
                    {storeCustomizationSetting?.footer?.block4_phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-100 group hover:text-white transition-colors">
                  <FiMail className="w-5 h-5 text-store-300 flex-shrink-0 group-hover:text-white transition-colors" />
                  <a 
                    href={`mailto:${storeCustomizationSetting?.footer?.block4_email}`}
                    className="text-sm hover:underline break-all"
                  >
                    {storeCustomizationSetting?.footer?.block4_email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-store-400 border-opacity-30"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center justify-center gap-2 bg-store-500 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-white shadow-xl border border-gray-100 rounded-2xl mb-6 relative overflow-hidden">
          {/* Decorative gradient background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-store-400 via-store-500 to-store-600"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-8 items-center justify-between relative z-10">
            <div className="col-span-1">
              {storeCustomizationSetting?.footer?.social_links_status && (
                <div>
                  {(storeCustomizationSetting?.footer?.social_facebook ||
                    storeCustomizationSetting?.footer?.social_twitter ||
                    storeCustomizationSetting?.footer?.social_instagram ||
                    storeCustomizationSetting?.footer?.social_linkedin ||
                    storeCustomizationSetting?.footer?.social_whatsapp) && (
                    <span className="text-base leading-7 font-semibold text-gray-700 block mb-4 pb-2 border-b-2 border-gray-100 inline-block">
                      {t("footer-follow-us")}
                    </span>
                  )}
                  <ul className="text-sm flex flex-wrap gap-3">
                    {storeCustomizationSetting?.footer?.social_facebook && (
                      <li className="group">
                        <Link
                          href={`${storeCustomizationSetting?.footer?.social_facebook}`}
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                        >
                          <FacebookIcon size={40} round className="shadow-md group-hover:shadow-lg transition-shadow" />
                        </Link>
                      </li>
                    )}
                    {storeCustomizationSetting?.footer?.social_twitter && (
                      <li className="group">
                        <Link
                          href={`${storeCustomizationSetting?.footer?.social_twitter}`}
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                        >
                          <TwitterIcon size={40} round className="shadow-md group-hover:shadow-lg transition-shadow" />
                        </Link>
                      </li>
                    )}
                    {storeCustomizationSetting?.footer?.social_instagram && (
                      <li className="group">
                        <Link
                          href={`${storeCustomizationSetting?.footer?.social_instagram}`}
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                        >
                          <div className="rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                            <FaInstagram size={40} style={{ color: "#E4405F" }} className="rounded-full" />
                          </div>
                        </Link>
                      </li>
                    )}
                    {storeCustomizationSetting?.footer?.social_linkedin && (
                      <li className="group">
                        <Link
                          href={`${storeCustomizationSetting?.footer?.social_linkedin}`}
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                        >
                          <LinkedinIcon size={40} round className="shadow-md group-hover:shadow-lg transition-shadow" />
                        </Link>
                      </li>
                    )}
                    {storeCustomizationSetting?.footer?.social_whatsapp && (
                      <li className="group">
                        <Link
                          href={`${storeCustomizationSetting?.footer?.social_whatsapp}`}
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                        >
                          <WhatsappIcon size={40} round className="shadow-md group-hover:shadow-lg transition-shadow" />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="col-span-1 text-center hidden lg:block md:block">
              {storeCustomizationSetting?.footer?.bottom_contact_status && (
                <div className="bg-gradient-to-br from-store-50 to-store-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-store-500 mb-3">
                    <FiPhone className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-base leading-7 font-semibold text-gray-700 block mb-2">
                    {t("footer-call-us")}
                  </p>
                  <a
                    href={`tel:${storeCustomizationSetting?.footer?.bottom_contact}`}
                    className="inline-block transition-transform duration-300 hover:scale-105"
                  >
                    <h5 className="text-2xl font-bold text-store-600 leading-7 hover:text-store-700">
                      {storeCustomizationSetting?.footer?.bottom_contact}
                    </h5>
                  </a>
                </div>
              )}
            </div>
            {storeCustomizationSetting?.footer?.payment_method_status && (
              <div className="col-span-1 hidden lg:block md:block">
                <div className="bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm font-semibold text-gray-600 mb-3 text-right">
                    Secure Payment Methods
                  </p>
                  <ul className="lg:text-right">
                    <li className="px-1 mb-2 md:mb-0 transition-transform duration-300 hover:scale-105 inline-flex">
                      <Image
                        width={274}
                        height={85}
                        className="w-full rounded-lg"
                        src={
                          storeCustomizationSetting?.footer?.payment_method_img ||
                          "/payment-method/payment-logo.png"
                        }
                        alt="payment method"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center py-5 border-t border-store-400 border-opacity-20">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-200 leading-6 text-center">
            Copyright 2025 @{" "}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-store-200 transition-colors duration-300"
            >
              E-HealthandHerbs
            </Link>
            , All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-store-300 rounded-full"></div>
            <div className="w-1 h-1 bg-store-300 rounded-full"></div>
            <div className="w-1 h-1 bg-store-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });

