import React, { useState } from "react";
import { useRouter } from "next/router";
import { IoSearchOutline } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";
import LocationButton from "@components/location/LocationButton";

const HeroBanner = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
    }
  };

  return (
    <div className="w-full relative overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
        {/* Background Image - Full Screen */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
                 backgroundImage: 'url(/home/par.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
             }}>
        </div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Hero Text Section */}
        <div className="relative z-10 w-full flex flex-col items-center px-4 pt-8">
          <div className="text-center max-w-5xl mx-auto mb-8 px-4">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
              Order medicines & healthcare essentials.Trusted pharmacy.Farmecy Kart it!
            </h1>
           
          </div>
        </div>

        {/* Search Box Section */}
        <div className="relative z-10 w-full flex flex-col items-center px-4 pt-4">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl relative flex items-center bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                {/* Location Button */}
                <LocationButton className="h-full" />
                
                {/* Search Input */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search for medicine or store..."
                        className="w-full py-4 pl-4 pr-12 focus:outline-none focus:ring-0 text-gray-700 text-lg bg-transparent"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-store-600 transition-colors"
                    >
                        <IoSearchOutline className="text-2xl" />
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default HeroBanner;
