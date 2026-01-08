import React from "react";
import { FiTruck, FiClock, FiMapPin, FiPackage, FiAlertCircle, FiCheckCircle, FiGlobe } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const ShippingDeliveryPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Layout title="Shipping & Delivery Policy" description="This is shipping and delivery policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.shipping_delivery_policy?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.shipping_delivery_policy?.title
        )}
      />
      <div className="bg-gray-50  ">
        <div className=" mx-auto  ">
          {/* Main Content Card */}
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-6 lg:p-10">
              {/* Last Updated Section */}
              <div className="mb-8 pb-6 border-b border-gray-200">
              </div>

              {/* Content Section */}
              <div className="shipping-policy-content">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .shipping-policy-content h1, 
                    .shipping-policy-content h2, 
                    .shipping-policy-content h3, 
                    .shipping-policy-content h4, 
                    .shipping-policy-content h5, 
                    .shipping-policy-content h6,
                    .shipping-policy-content strong {
                      font-weight: 400 !important;
                    }
                  `
                }} />
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    <CMSkeleton
                      html
                      count={15}
                      height={15}
                      error={error}
                      loading={loading}
                      data={storeCustomizationSetting?.shipping_delivery_policy?.description}
                    />
                  </div>
                </div>
              </div>

              {/* Loading States */}
              {loading && (
                <>
                  <div className="mt-6 space-y-4">
                    <CMSkeleton count={15} height={15} loading={loading} />
                    <CMSkeleton count={15} height={15} loading={loading} />
                  </div>
                </>
              )}

              {/* Quick Info Cards */}
              {!loading && !error && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-store-50 border-l-4 border-store-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiTruck className="w-6 h-6 text-store-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
                        <p className="text-sm text-gray-600">We offer multiple shipping options to ensure your orders arrive on time and in perfect condition.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiClock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Track Your Order</h3>
                        <p className="text-sm text-gray-600">Get real-time tracking updates for your shipment and know exactly when your order will arrive.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {!loading && !error && (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="w-6 h-6 text-store-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Need Help with Shipping or Delivery?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          If you have any questions about our shipping and delivery policy, please contact our customer support team.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-store-600">
                          <FiGlobe className="w-4 h-4" />
                          <span>We're committed to timely and safe delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingDeliveryPolicy;

