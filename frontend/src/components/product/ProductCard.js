import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";
import { FiHeart, FiShuffle } from "react-icons/fi";
import { useCart } from "react-use-cart";
import { useRouter } from "next/router";

//internal import
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import { notifyError, notifySuccess } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import useGetSetting from "@hooks/useGetSetting";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { handleLogEvent } from "src/lib/analytics";
import { addToWishlist } from "@lib/wishlist";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { globalSetting } = useGetSetting();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const router = useRouter();

  const storeColor = storeCustomizationSetting?.theme?.color || "pink";
  const currency = globalSetting?.default_currency || "₹";



  const handleAddItem = (p) => {
    if (p.stock < 1) return notifyError("Insufficient stock!");

    if (p?.variants?.length > 0) {
      setModalOpen(!modalOpen);
      return;
    }
    const { slug, variants, categories, description, ...updatedProduct } =
      product;
    const newItem = {
      ...updatedProduct,
      title: showingTranslateValue(p?.title),
      id: p._id,
      variant: p.prices,
      price: p.prices.price,
      originalPrice: product.prices?.originalPrice,
      image: product.image?.[0] || product.images?.[0],
    };
    addItem(newItem);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (typeof window === "undefined") return;
    
    try {
      const result = addToWishlist(product);

      if (!result.ok && result.reason === "exists") {
        notifyError("Product already in wishlist");
        return;
      }

      if (!result.ok) {
        notifyError("Failed to add to wishlist");
        return;
      }

      notifySuccess("Product added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      notifyError("Failed to add to wishlist");
    }
  };

  const handleAddToCompare = (e) => {
    e.stopPropagation();
    if (typeof window === "undefined") return;
    
    try {
      const storedCompare = localStorage.getItem("compare");
      let compare = storedCompare ? JSON.parse(storedCompare) : [];
      
      const exists = compare.some((item) => item._id === product._id);
      
      if (exists) {
        notifyError("Product already in compare list");
        return;
      }
      
      if (compare.length >= 4) {
        notifyError("You can compare maximum 4 products");
        return;
      }
      
      compare.push(product);
      localStorage.setItem("compare", JSON.stringify(compare));
      notifySuccess("Product added to compare list");
    } catch (error) {
      console.error("Error adding to compare:", error);
      notifyError("Failed to add to compare list");
    }
  };

  return (
    <>
      {modalOpen && (
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          currency={currency}
          attributes={attributes}
        />
      )}

  <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative transition-shadow duration-300 hover:shadow-lg transform hover:-translate-y-1">
        <div className="w-full flex justify-between">
          <Stock product={product} stock={product.stock} card />
          <Discount product={product} />
        </div>
        {/* Wishlist and Compare buttons - visible on hover on desktop, always on mobile */}
        <div className="absolute top-2 right-2 z-20 flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAddToWishlist}
            className={`p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors`}
            aria-label="Add to wishlist"
          >
            <FiHeart className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCompare}
            className={`p-2 bg-white rounded-full shadow-md hover:bg-purple-500 hover:text-white transition-colors`}
            aria-label="Add to compare"
          >
            <FiShuffle className="w-4 h-4" />
          </button>
        </div>
        <div
          onClick={() => {
            router.push(`/product/${product.slug}`);
            handleLogEvent(
              "product",
              `navigated to ${showingTranslateValue(product?.title)} product page`
            );
          }}
          className="relative flex justify-center cursor-pointer w-full"
        >
          <div className="relative w-full p-0 overflow-hidden rounded-md">
            <div className="w-full transition-transform duration-500 ease-out transform group-hover:scale-105">
              {product.image[0] ? (
                // render intrinsic image so it displays full (not cropped) and takes full width
                <ImageWithFallback
                  src={product.image[0]}
                  alt="product"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <Image
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  width={600}
                  height={600}
                  style={{
                    objectFit: "contain",
                  }}
                  sizes="100%"
                  alt="product"
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.unit}
            </span>
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">
                {showingTranslateValue(product?.title)}
              </span>
            </h2>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price
              card
              product={product}
              currency={currency}
              price={
                product?.isCombination
                  ? product?.variants[0]?.price
                  : product?.prices?.price
              }
              originalPrice={
                product?.isCombination
                  ? product?.variants[0]?.originalPrice
                  : product?.prices?.originalPrice
              }
            />

            {inCart(product._id) ? (
              <div>
                {items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        className={`lg:h-9 w-auto flex md:flex-row flex-col  items-center justify-evenly py-1 px-2 bg-store-500 text-white rounded`}
                      >
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <span className="text-dark text-base">
                            <IoRemove />
                          </span>
                        </button>
                        <p className="text-sm text-dark px-1 font-serif font-semibold">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            item?.variants?.length > 0
                              ? handleAddItem(item)
                              : handleIncreaseQuantity(item)
                          }
                        >
                          <span className="text-dark text-base">
                            <IoAdd />
                          </span>
                        </button>
                      </div>
                    )
                )}{" "}
              </div>
              ) : (
              <button
                onClick={() => handleAddItem(product)}
                aria-label="cart"
                className={`h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-store-500 hover:border-store-500 hover:bg-store-500 hover:text-white transition transform hover:scale-110 duration-200`}
              >
                <span className="text-xl">
                  <IoBagAddSharp />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });


