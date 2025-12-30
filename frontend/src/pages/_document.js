import SettingServices from "@services/SettingServices";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Fetch general metadata from backend API (best-effort, guard failures)
    let setting = null;
    try {
      setting = await SettingServices.getStoreSeoSetting();
    } catch (err) {
      // Avoid blocking document render on SEO fetch failures
      console.error("SEO setting fetch failed:", err?.message || err);
    }

    return { ...initialProps, setting };
  }

  render() {
    const setting = this.props.setting;
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={setting?.favicon || "/favicon.png"} />
          <meta
            property="og:title"
            content={
              setting?.meta_title ||
              "E-Fashionapparel – Customized Promotional Items & Advertising Products Online Store"
            }
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={
              setting?.meta_description ||
              "Discover personalized merchandise, branded giveaways, and advertising essentials. Ideal for businesses, events, and promotions"
            }
          />
          <meta
            name="keywords"
            content={setting?.meta_keywords || "ecommenrce online store"}
          />
          <meta
            property="og:url"
            content={
              setting?.meta_url || "https://ejewellary.ovsinnovation.com/"
            }
          />
          <meta
            property="og:image"
            content={
              setting?.meta_img ||
              "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1761819918/undefined/logojwellary.png"
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
