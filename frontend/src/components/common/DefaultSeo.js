import React from "react";
import { DefaultSeo as NextSeo } from "next-seo";

//internal import
import useGetSetting from "@hooks/useGetSetting";

const DefaultSeo = () => {
  const { globalSetting, storeCustomizationSetting } = useGetSetting();

  // Get dynamic SEO values from settings
  const metaTitle = storeCustomizationSetting?.seo?.meta_title || globalSetting?.shop_name || "E-HealthandHerbs";
  const metaDescription = storeCustomizationSetting?.seo?.meta_description || "Discover personalized merchandise, branded giveaways, and advertising essentials. Ideal for businesses, events, and promotions";
  const metaUrl = storeCustomizationSetting?.seo?.meta_url || globalSetting?.website || "";
  const metaImage = storeCustomizationSetting?.seo?.meta_img || storeCustomizationSetting?.seo?.favicon || "/logo/logo.png";
  const favicon = storeCustomizationSetting?.seo?.favicon || globalSetting?.logo || "/favicon.png";

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: metaUrl,
        site_name: metaTitle,
        images: [
          {
            url: metaImage,
            width: 1200,
            height: 630,
            alt: metaTitle,
          },
        ],
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content:
            "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
        {
          name: "description",
          content: metaDescription,
        },
      ]}
      additionalLinkTags={[
        {
          rel: "icon",
          href: favicon,
        },
        {
          rel: "shortcut icon",
          href: favicon,
        },
        {
          rel: "apple-touch-icon",
          href: favicon,
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ]}
    />
  );
};

export default DefaultSeo;
