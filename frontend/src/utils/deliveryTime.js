/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * Geocode an address to get coordinates
 * @param {string} address - Address string
 * @returns {Promise<{lat: number, lng: number}>} Coordinates
 */
export const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'Farmacykart-App'
        }
      }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

/**
 * Calculate expected delivery time based on distance
 * @param {number} distance - Distance in kilometers
 * @returns {string} Expected delivery time (e.g., "1-2 days")
 */
export const calculateDeliveryTime = (distance) => {
  // For now, always return 1-2 days as per requirement
  // You can customize this based on distance if needed
  // if (distance < 50) return "1 day";
  // if (distance < 200) return "1-2 days";
  // return "2-3 days";
  return "1-2 days";
};

/**
 * Get store location coordinates from globalSetting
 * @param {object} globalSetting - Global setting object with address and post_code
 * @returns {Promise<{lat: number, lng: number} | null>} Store coordinates
 */
export const getStoreLocation = async (globalSetting) => {
  if (!globalSetting) {
    console.log('getStoreLocation: globalSetting is null');
    return null;
  }
  
  const address = globalSetting.address || '';
  const postCode = globalSetting.post_code || '';
  
  if (!address && !postCode) {
    console.log('getStoreLocation: Both address and post_code are empty');
    return null;
  }
  
  // Combine address and post code for better geocoding
  const fullAddress = [address, postCode].filter(Boolean).join(', ');
  console.log('getStoreLocation: Geocoding address:', fullAddress);
  
  const result = await geocodeAddress(fullAddress);
  if (!result) {
    console.log('getStoreLocation: Geocoding failed for:', fullAddress);
  } else {
    console.log('getStoreLocation: Geocoding successful:', result);
  }
  
  return result;
};

/**
 * Get user location from cookies or shipping address
 * @param {object} shippingAddress - Shipping address object
 * @returns {Promise<{lat: number, lng: number} | null>} User coordinates
 */
export const getUserLocation = async (shippingAddress = null) => {
  // If shipping address is provided and has coordinates, use it
  if (shippingAddress?.lat && shippingAddress?.lng) {
    console.log('getUserLocation: Using coordinates from shipping address');
    return {
      lat: parseFloat(shippingAddress.lat),
      lng: parseFloat(shippingAddress.lng)
    };
  }
  
  // If shipping address is provided but no coordinates, try to geocode it
  if (shippingAddress) {
    const addressParts = [
      shippingAddress.address,
      shippingAddress.area,
      shippingAddress.city,
      shippingAddress.zipCode,
      shippingAddress.country
    ].filter(Boolean);
    
    if (addressParts.length > 0) {
      const fullAddress = addressParts.join(', ');
      console.log('getUserLocation: Geocoding shipping address:', fullAddress);
      const geocoded = await geocodeAddress(fullAddress);
      if (geocoded) {
        console.log('getUserLocation: Geocoding successful:', geocoded);
        return geocoded;
      } else {
        console.log('getUserLocation: Geocoding failed for shipping address');
      }
    } else {
      console.log('getUserLocation: Shipping address provided but no address parts');
    }
  }
  
  // Otherwise, try to get from cookies
  if (typeof window === 'undefined') {
    console.log('getUserLocation: window is undefined (SSR)');
    return null;
  }
  
  try {
    const Cookies = require('js-cookie');
    const savedLocation = Cookies.get('userLocation');
    if (savedLocation) {
      const location = JSON.parse(savedLocation);
      if (location.lat && location.lng) {
        console.log('getUserLocation: Using location from cookies:', location);
        return {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng)
        };
      } else {
        console.log('getUserLocation: Cookie location found but no lat/lng');
      }
    } else {
      console.log('getUserLocation: No location cookie found');
    }
  } catch (error) {
    console.error('Error getting user location from cookies:', error);
  }
  
  console.log('getUserLocation: No user location available');
  return null;
};

/**
 * Calculate and return expected delivery time
 * @param {object} globalSetting - Global setting with store location
 * @param {object} shippingAddress - User shipping address
 * @returns {Promise<string | null>} Expected delivery time or null
 */
export const getExpectedDeliveryTime = async (globalSetting, shippingAddress = null) => {
  try {
    // Check if globalSetting exists
    if (!globalSetting) {
      console.log('Delivery Time: globalSetting is missing');
      // Return default delivery time even if store location is not available
      return "1-2 days";
    }

    // Get store location
    const storeLocation = await getStoreLocation(globalSetting);
    if (!storeLocation) {
      console.log('Delivery Time: Store location not found or geocoding failed', {
        address: globalSetting.address,
        post_code: globalSetting.post_code
      });
      // Return default delivery time even if store location is not available
      return "1-2 days";
    }

    // Get user location
    const userLocation = await getUserLocation(shippingAddress);
    if (!userLocation) {
      console.log('Delivery Time: User location not found (no shipping address or cookies)');
      // Return default delivery time even if user location is not available
      return "1-2 days";
    }
    
    // Calculate distance
    const distance = calculateDistance(
      storeLocation.lat,
      storeLocation.lng,
      userLocation.lat,
      userLocation.lng
    );
    
    console.log('Delivery Time: Distance calculated', distance, 'km');
    
    return calculateDeliveryTime(distance);
  } catch (error) {
    console.error('Error calculating delivery time:', error);
    // Return default delivery time on error
    return "1-2 days";
  }
};

