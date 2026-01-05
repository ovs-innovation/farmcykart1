import useUtilsFunction from "@hooks/useUtilsFunction";

const Discount = ({ discount, product, slug, modal }) => {
  const { getNumber } = useUtilsFunction();

  const price = product?.isCombination
    ? getNumber(product?.variants[0]?.price)
    : getNumber(product?.prices?.price);
  
  const discountVal = product?.isCombination
    ? getNumber(product?.variants[0]?.discount)
    : getNumber(product?.prices?.discount);

  let originalPrice = product?.isCombination
    ? getNumber(product?.variants[0]?.originalPrice)
    : getNumber(product?.prices?.originalPrice);

  if (!originalPrice && discountVal) {
    originalPrice = price + discountVal;
  }

  const discountPercentage = originalPrice > 0 ? getNumber(
    ((originalPrice - price) / originalPrice) * 100
  ) : 0;

  return (
    <>
      {discount > 1 && (
        <span
          className={
            modal
              ? "absolute text-sm bg-green-500 text-white py-1.5 px-4 rounded-l-none rounded-r-full font-bold uppercase z-10 left-0 top-4 whitespace-nowrap"
              : slug
              ? "absolute text-sm bg-green-500 text-white py-1.5 px-4 rounded-l-none rounded-r-full font-bold uppercase z-10 left-0 top-4 whitespace-nowrap"
              : "absolute text-xs bg-green-500 text-white py-1.5 px-4 rounded-l-none rounded-r-full font-bold uppercase z-10 left-0 top-2 whitespace-nowrap"
          }
        >
          {discount}% OFF
        </span>
      )}
      {discount === undefined && discountPercentage > 1 && (
        <span
          className={
            modal
              ? "absolute text-sm bg-green-500 text-white py-1.5 px-4 rounded-l-none rounded-r-full font-bold uppercase z-10 left-0 top-4 whitespace-nowrap"
              : slug
              ? "absolute text-sm bg-green-500 text-white py-1.5 px-4 rounded-l-none rounded-r-full font-bold uppercase z-10 left-0 top-4 whitespace-nowrap"
              : "absolute text-xs bg-green-500 text-white py-1.5 px-4 rounded-l-none rounded-r-full font-bold uppercase z-10 left-0 top-2 whitespace-nowrap"
          }
        >
          {discountPercentage}% OFF
        </span>
      )}
    </>
  );
};

export default Discount;
