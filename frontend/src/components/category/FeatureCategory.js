import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoChevronForwardSharp } from "react-icons/io5";

//internal import
import CategoryServices from "@services/CategoryServices";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useGetSetting from "@hooks/useGetSetting";

const FeatureCategory = ({ attributes }) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting } = useGetSetting();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  const categories = useMemo(() => data?.[0]?.children || [], [data]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (selectedCategory?._id) {
      setLoadingProducts(true);
      ProductServices.getShowingStoreProducts({ category: selectedCategory._id })
        .then((res) => {
          setProducts(res?.products || []);
          setLoadingProducts(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingProducts(false);
        });
    }
  }, [selectedCategory]);

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <div className="flex flex-col md:flex-row w-full">
          {/* Sidebar Categories */}
          <div className="w-full md:w-1/4 bg-white md:rounded-l-lg rounded-t-lg md:rounded-tr-none border border-gray-100 md:border-r-0 overflow-hidden h-fit">
            <ul className="flex flex-col">
              {categories.map((category, i) => (
                <li
                  key={i + 1}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer px-5 py-4 flex items-center justify-between transition-all duration-200 border-b border-gray-50 last:border-none ${
                    selectedCategory?._id === category._id
                      ? "bg-store-50 text-store-600 font-semibold border-l-4 border-l-store-500"
                      : "hover:bg-gray-50 text-gray-600 hover:text-store-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {category.icon && (
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={52}
                        height={34}
                        className="object-contain"
                      />
                    )}
                    <span className="text-sm md:text-base">
                      {showingTranslateValue(category?.name)}
                    </span>
                  </div>
                  {selectedCategory?._id === category._id && (
                    <IoChevronForwardSharp className="text-store-500" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Products Content Area */}
          <div className="w-full md:w-3/4 bg-store-50 md:rounded-r-lg rounded-b-lg md:rounded-bl-none border border-gray-100 md:border-l-0 p-4">
            {loadingProducts ? (
              <CMSkeleton count={10} height={20} error={error} loading={loadingProducts} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      attributes={attributes}
                      hidePriceAndAdd={true}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-400">
                    <p>No products found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureCategory;

