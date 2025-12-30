import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoChevronForwardSharp } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
 

//internal import
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useGetSetting from "@hooks/useGetSetting";

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting } = useGetSetting();
  const storeColor = storeCustomizationSetting?.theme?.color || "pink";
  const listRef = useRef(null);
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  // console.log("category", data);

  const categories = useMemo(() => data?.[0]?.children || [], [data]);

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  const scrollByCards = (dir = 1) => {
    const el = listRef.current;
    if (!el) return;

    // Scroll roughly ~2 cards on desktop, ~1.5 on small screens
    const amount = Math.max(240, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const bgColors = [
    "bg-green-100",
    "bg-blue-100",
    "bg-purple-100",
    "bg-red-100",
    "bg-orange-100",
    "bg-cyan-100",
    "bg-yellow-100",
    "bg-teal-100",
    "bg-indigo-100",
    "bg-pink-100",
  ];

  return (
    <>
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <div className="relative w-full">
          {/* Arrows (desktop/tablet). Mobile users can swipe. */}
          {categories.length > 0 && (
            <>
              <button
                type="button"
                aria-label="Scroll categories left"
                onClick={() => scrollByCards(-1)}
                className={`flex absolute left-1 sm:-left-4 top-1/3 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:bg-gray-50 hover:text-store-600 transition-colors`}
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Scroll categories right"
                onClick={() => scrollByCards(1)}
                className={`flex absolute right-1 sm:-right-4 top-1/3 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:bg-gray-50 hover:text-store-600 transition-colors`}
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <ul
            ref={listRef}
            className="flex overflow-x-auto py-4 px-4 w-full scrollbar-hide gap-6 sm:gap-8 snap-x snap-mandatory scroll-smooth"
          >
            {categories.map((category, i) => (
              <li
                className="group shrink-0 snap-start cursor-pointer flex flex-col items-center w-28 sm:w-32 md:w-40"
                key={i + 1}
                onClick={() =>
                  handleCategoryClick(
                    category._id,
                    showingTranslateValue(category?.name)
                  )
                }
              >
                <div 
                  className={`flex justify-center items-center w-full aspect-square rounded-t-full rounded-bl-none mb-3 p-4 pt-8 shadow-sm transition-transform duration-300 ease-in-out transform group-hover:scale-105 ${bgColors[i % bgColors.length]}`}
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                    {category.icon ? (
                      <Image
                        src={category?.icon}
                        alt="category"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain drop-shadow-sm"
                      />
                    ) : (
                      <Image
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        alt="category"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain drop-shadow-sm"
                      />
                    )}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-medium text-gray-700 text-center group-hover:text-store-600 transition-colors">
                  {showingTranslateValue(category?.name)}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FeatureCategory;

