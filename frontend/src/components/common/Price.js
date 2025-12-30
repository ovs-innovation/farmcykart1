import useUtilsFunction from "@hooks/useUtilsFunction";

const Price = ({
  product,
  price,
  card,
  currency,
  originalPrice,
  showTaxLabel,
}) => {
  // console.log("price", price, "originalPrice", originalPrice, "card", card);
  const { getNumberTwo } = useUtilsFunction();
  const taxRateValue = Number(product?.taxRate ?? 0);
  const shouldShowTax =
    typeof showTaxLabel === "boolean" ? showTaxLabel : !card;
  const hasTaxInfo =
    shouldShowTax && !Number.isNaN(taxRateValue) && taxRateValue >= 0;
  const taxBadgeText = hasTaxInfo
    ? `${product?.isPriceInclusive ? "Incl. GST" : "Excl. GST"} (${taxRateValue}%)`
    : "";

  return (
    <div className="font-serif product-price font-bold">
      {product?.isCombination ? (
        <>
          <span
            className={
              card
                ? "inline-block text-lg font-semibold text-gray-800"
                : "inline-block text-2xl"
            }
          >
            {currency}
            {getNumberTwo(price)}
          </span>
          {originalPrice > price ? (
            <>
              <del
                className={
                  card
                    ? "sm:text-sm font-normal text-base text-gray-400 ml-1"
                    : "text-lg font-normal text-gray-400 ml-1"
                }
              >
                {currency}
                {getNumberTwo(originalPrice)}
              </del>
            </>
          ) : null}
        </>
      ) : (
        <>
          <span
            className={
              card
                ? "inline-block text-lg font-semibold text-gray-800"
                : "inline-block text-2xl"
            }
          >
            {currency}
            {getNumberTwo(product?.prices?.price)}
          </span>
          {originalPrice > price ? (
            <>
              <del
                className={
                  card
                    ? "sm:text-sm font-normal text-base text-gray-400 ml-1"
                    : "text-lg font-normal text-gray-400 ml-1"
                }
              >
                {currency}
                {getNumberTwo(originalPrice)}
              </del>
            </>
          ) : null}
        </>
      )}
      {hasTaxInfo && (
        <p
          className={`text-xs md:text-sm font-normal mt-1 ${
            product?.isPriceInclusive ? "text-emerald-600" : "text-gray-500"
          }`}
        >
          {product?.isPriceInclusive
            ? "Inclusive of all taxes"
            : "Price exclusive of taxes"}
          <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
            {taxBadgeText}
          </span>
        </p>
      )}
    </div>
  );
};

export default Price;
