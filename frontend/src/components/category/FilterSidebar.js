import React, { useEffect, useState } from "react";
import { IoClose, IoStar } from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CategoryServices from "@services/CategoryServices";
import BrandServices from "@services/BrandServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const FilterSidebar = ({
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedRating,
  setSelectedRating,
  selectedDiscount,
  setSelectedDiscount,
  onClearAll,
}) => {
  const { showingTranslateValue, currency } = useUtilsFunction();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [openSections, setOpenSections] = useState({
    brand: false,
    rating: false,
    discount: false,
    category: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, brandData] = await Promise.all([
          CategoryServices.getShowingCategory(),
          BrandServices.getShowingBrands(),
        ]);
        setCategories(catData || []);
        setBrands(brandData || []);
      } catch (err) {
        console.error("Error fetching filter data", err);
      }
    };
    fetchData();
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandChange = (brandId) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const handleCategoryChange = (catId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange((prev) => ({ ...prev, [type]: value }));
  };

  const ratings = [4, 3, 2, 1];
  const discounts = [50, 40, 30, 20, 10];

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-store-600 text-xs font-bold uppercase hover:underline"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Active Filters */}
      {(selectedBrands.length > 0 ||
        selectedCategories.length > 0 ||
        selectedRating > 0 ||
        selectedDiscount > 0 ||
        priceRange.min > 0 ||
        priceRange.max < 100000) && (
        <div className="p-4 flex flex-wrap gap-2 border-b border-gray-100">
          {selectedBrands.map((brandId) => {
            const brand = brands.find((b) => b._id === brandId);
            if (!brand) return null;
            return (
              <span
                key={brandId}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-sm"
              >
                {showingTranslateValue(brand.name)}
                <IoClose
                  className="ml-1 cursor-pointer"
                  onClick={() => handleBrandChange(brandId)}
                />
              </span>
            );
          })}
          {selectedCategories.map((catId) => {
            const cat = categories.find((c) => c._id === catId);
            if (!cat) return null;
            return (
              <span
                key={catId}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-sm"
              >
                {showingTranslateValue(cat.name)}
                <IoClose
                  className="ml-1 cursor-pointer"
                  onClick={() => handleCategoryChange(catId)}
                />
              </span>
            );
          })}
          {priceRange.min > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-sm">
              Min: {priceRange.min}
              <IoClose
                className="ml-1 cursor-pointer"
                onClick={() => setPriceRange((prev) => ({ ...prev, min: 0 }))}
              />
            </span>
          )}
          {priceRange.max < 100000 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-sm">
              Max: {priceRange.max}
              <IoClose
                className="ml-1 cursor-pointer"
                onClick={() =>
                  setPriceRange((prev) => ({ ...prev, max: 100000 }))
                }
              />
            </span>
          )}
          {selectedRating > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-sm">
              {selectedRating}★ & above
              <IoClose
                className="ml-1 cursor-pointer"
                onClick={() => setSelectedRating(0)}
              />
            </span>
          )}
          {selectedDiscount > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-sm">
              {selectedDiscount}%+ Off
              <IoClose
                className="ml-1 cursor-pointer"
                onClick={() => setSelectedDiscount(0)}
              />
            </span>
          )}
        </div>
      )}

      {/* Categories */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection("category")}
          className="w-full p-4 flex justify-between items-center text-sm font-bold uppercase text-gray-700"
        >
          Categories
          {openSections.category ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {openSections.category && (
          <div className="px-4 pb-4 max-h-60 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`cat-${cat._id}`}
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => handleCategoryChange(cat._id)}
                  className="rounded border-gray-300 text-store-600 focus:ring-store-500"
                />
                <label
                  htmlFor={`cat-${cat._id}`}
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  {showingTranslateValue(cat.name)}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-b border-gray-100 p-4">
        <h3 className="text-sm font-bold uppercase text-gray-700 mb-4">Price</h3>
        <div className="flex items-center gap-2">
          <select
            value={priceRange.min}
            onChange={(e) => handlePriceChange(e, "min")}
            className="w-full text-sm border-gray-300 rounded-sm focus:ring-store-500"
          >
            <option value="0">0 {currency}</option>
            <option value="500">500 {currency}</option>
            <option value="1000">1000 {currency}</option>
            <option value="2000">2000 {currency}</option>
            <option value="5000">5000 {currency}</option>
          </select>
          <span className="text-gray-400 text-xs">to</span>
          <select
            value={priceRange.max}
            onChange={(e) => handlePriceChange(e, "max")}
            className="w-full text-sm border-gray-300 rounded-sm focus:ring-store-500"
          >
            <option value={priceRange.max}>
              {priceRange.max === 100000 ? "Max" : `${priceRange.max} ${currency}`}
            </option>
            <option value="5000">5000 {currency}</option>
            <option value="10000">10000 {currency}</option>
            <option value="20000">20000 {currency}</option>
            <option value="50000">50000 {currency}</option>
            <option value="100000">100000+ {currency}</option>
          </select>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={priceRange.max}
          onChange={(e) => handlePriceChange(e, "max")}
          className="w-full mt-4 h-1.5 rounded-lg appearance-none cursor-pointer accent-store-600"
          style={{
            background: `linear-gradient(to right, var(--store-color-600) 0%, var(--store-color-600) ${
              (priceRange.max / 100000) * 100
            }%, #e5e7eb ${(priceRange.max / 100000) * 100}%, #e5e7eb 100%)`,
          }}
        />
      </div>

      {/* Brand */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection("brand")}
          className="w-full p-4 flex justify-between items-center text-sm font-bold uppercase text-gray-700"
        >
          Brand
          {openSections.brand ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {openSections.brand && (
          <div className="px-4 pb-4 max-h-60 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`brand-${brand._id}`}
                  checked={selectedBrands.includes(brand._id)}
                  onChange={() => handleBrandChange(brand._id)}
                  className="rounded border-gray-300 text-store-600 focus:ring-store-500"
                />
                <label
                  htmlFor={`brand-${brand._id}`}
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  {showingTranslateValue(brand.name)}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Ratings */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection("rating")}
          className="w-full p-4 flex justify-between items-center text-sm font-bold uppercase text-gray-700"
        >
          Customer Ratings
          {openSections.rating ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {openSections.rating && (
          <div className="px-4 pb-4">
            {ratings.map((rating) => (
              <div
                key={rating}
                className="flex items-center mb-2 cursor-pointer"
                onClick={() => setSelectedRating(rating)}
              >
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(rating)}
                  className="text-store-600 focus:ring-store-500"
                />
                <div className="ml-2 flex items-center text-sm text-gray-600">
                  {rating} <IoStar className="text-yellow-400 ml-1 mr-1" /> & above
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discount */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection("discount")}
          className="w-full p-4 flex justify-between items-center text-sm font-bold uppercase text-gray-700"
        >
          Discount
          {openSections.discount ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {openSections.discount && (
          <div className="px-4 pb-4">
            {discounts.map((discount) => (
              <div
                key={discount}
                className="flex items-center mb-2 cursor-pointer"
                onClick={() => setSelectedDiscount(discount)}
              >
                <input
                  type="radio"
                  name="discount"
                  checked={selectedDiscount === discount}
                  onChange={() => setSelectedDiscount(discount)}
                  className="text-store-600 focus:ring-store-500"
                />
                <label className="ml-2 text-sm text-gray-600 cursor-pointer">
                  {discount}% or more
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
