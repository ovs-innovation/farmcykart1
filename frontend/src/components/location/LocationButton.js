import React, { useState, useEffect } from "react";
import { FiMapPin, FiLoader } from "react-icons/fi";
import Cookies from "js-cookie";
import { notifyError, notifySuccess } from "@utils/toast";

const LocationButton = ({ className = "" }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load location from cookies on mount
  useEffect(() => {
    const savedLocation = Cookies.get("userLocation");
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        setLocation(parsed);
      } catch (error) {
        console.error("Error parsing saved location:", error);
      }
    }
  }, []);

  const getCurrentLocation = (e) => {
    // Prevent form submission if button is in a form
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!navigator.geolocation) {
      notifyError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    
    // This will trigger the browser's native location permission popup
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);

        try {
          // Try to get address from coordinates using Nominatim (free geocoding service)
          const geocodeResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Farmacykart-App'
              }
            }
          );
          
          const geocodeData = await geocodeResponse.json();
          const address = geocodeData?.display_name || '';
          const pinCode = geocodeData?.address?.postcode || '';

          // Save location to cookies with address info
          const locationData = {
            lat,
            lng,
            address: address,
            pinCode: pinCode,
            timestamp: Date.now(),
          };

          setLocation(locationData);
          Cookies.set("userLocation", JSON.stringify(locationData), { expires: 30 });
          setIsLoading(false);
          
          // Trigger custom event to update NavBarTop
          window.dispatchEvent(new CustomEvent('locationUpdated', { detail: locationData }));
          
          notifySuccess(`Location set successfully! ${pinCode ? `PIN: ${pinCode}` : ''}`);
        } catch (error) {
          console.error("Error getting location details:", error);
          // Still save coordinates even if geocoding fails
          const locationData = {
            lat,
            lng,
            timestamp: Date.now(),
          };
          setLocation(locationData);
          Cookies.set("userLocation", JSON.stringify(locationData), { expires: 30 });
          setIsLoading(false);
          
          // Trigger custom event to update NavBarTop
          window.dispatchEvent(new CustomEvent('locationUpdated', { detail: locationData }));
          
          notifySuccess("Location set successfully!");
        }
      },
      (error) => {
        console.log("Location access denied", error);
        setIsLoading(false);
        
        let errorMessage = "Location access denied. Please allow location permission.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied. Please allow location access in browser settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timeout. Please try again.";
        }
        
        notifyError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const getDisplayText = () => {
    if (isLoading) return "Getting location...";
    if (location) return "Location set";
    return "Set location";
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        getCurrentLocation(e);
      }}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-white border-r border-gray-200 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${className}`}
    >
      {isLoading ? (
        <FiLoader className="animate-spin text-green-600" size={18} />
      ) : (
        <FiMapPin className="text-green-600" size={18} />
      )}
      <span className="hidden md:inline">{getDisplayText()}</span>
    </button>
  );
};

export default LocationButton;

