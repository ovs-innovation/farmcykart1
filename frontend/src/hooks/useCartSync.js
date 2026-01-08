import { useEffect, useRef } from "react";
import { useCart } from "react-use-cart";
import { useContext } from "react";
import { UserContext } from "@context/UserContext";
import CustomerServices from "@services/CustomerServices";

const useCartSync = () => {
  const { addItem, items, updateItemQuantity, getItem } = useCart();
  const {
    state: { userInfo },
  } = useContext(UserContext);
  
  const isSyncedRef = useRef(false);
  const lastUserIdRef = useRef(null);
  const isSyncingRef = useRef(false);

  // Sync from Customer.cart (Backend Cart)
  useEffect(() => {
    const syncBackendCart = async () => {
      const userId = userInfo?._id || userInfo?.id;
      
      // Reset sync state if user changes or logs out
      if (!userId) {
        isSyncedRef.current = false;
        lastUserIdRef.current = null;
        isSyncingRef.current = false;
        return;
      }

      // Allow re-sync if user changed
      if (lastUserIdRef.current !== userId) {
        isSyncedRef.current = false;
      }

      // If already synced for this user or currently syncing, skip
      if (isSyncedRef.current || isSyncingRef.current) {
        return;
      }

      // Mark as syncing to prevent multiple simultaneous syncs
      isSyncingRef.current = true;

      try {
        const res = await CustomerServices.getCustomerById(userId);
        const backendCart = res.cart || [];

        if (backendCart.length > 0) {
          // Collect all items to add/update first
          const itemsToProcess = [];
          
          backendCart.forEach((cartItem) => {
            const product = cartItem.productId;
            // Ensure product is valid and populated
            if (!product || !product._id) {
              return;
            }

            const id = product._id;
            const backendQty = cartItem.quantity || 1;
            
            // Check if item exists in local cart with exact ID
            const localItem = getItem(id);
            
            // Check if any variant of this product exists in local cart
            // Variant IDs are constructed as "PRODUCT_ID-VARIANT_INFO"
            const hasVariantInCart = items.some(item => String(item.id).startsWith(String(id) + '-'));

            if (localItem) {
              // If local quantity is different from backend quantity, update it
              if (localItem.quantity !== backendQty) {
                itemsToProcess.push({ type: 'update', id, quantity: backendQty });
              }
            } else if (!hasVariantInCart) {
              // Only add if no variant exists and no exact match exists
              itemsToProcess.push({
                type: 'add',
                item: {
                  id: id,
                  price: product.prices?.price || product.prices?.originalPrice || 0,
                  title: product.title?.en || product.title || "Product",
                  image: Array.isArray(product.image) ? product.image[0] : (typeof product.image === 'string' ? product.image : ''),
                  quantity: backendQty,
                  slug: product.slug
                },
                quantity: backendQty
              });
            }
          });

          // Process all updates/adds in batch
          itemsToProcess.forEach((action) => {
            if (action.type === 'update') {
              updateItemQuantity(action.id, action.quantity);
            } else if (action.type === 'add') {
              // Double-check item doesn't exist before adding
              if (!getItem(action.item.id)) {
                addItem(action.item, action.quantity);
              }
            }
          });
        }
        
        // Mark as synced for this user
        isSyncedRef.current = true;
        lastUserIdRef.current = userId;

      } catch (err) {
        console.error("Error syncing cart:", err);
      } finally {
        isSyncingRef.current = false;
      }
    };

    syncBackendCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?._id, userInfo?.id]); // Only sync when user changes, not when cart items change
};

export default useCartSync;
