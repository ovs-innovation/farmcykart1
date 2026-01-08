import React from "react";
import { FiShield, FiLock, FiRefreshCw, FiFileText, FiAlertCircle, FiCheckCircle, FiPackage } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const RefundReturnPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

//   const refundIcon = (
//     <div className="flex justify-center mb-6">
//       <div className="w-20 h-20 rounded-full bg-store-100 flex items-center justify-center">
//         <FiRefreshCw className="w-10 h-10 text-store-500" />
//       </div>
//     </div>
//   );

  return (
    <Layout title="Refund & Return Policy" description="This is refund and return policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.refund_return_policy?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.refund_return_policy?.title
        )}
      />
      <div className="bg-gray-50  ">
        <div className=" mx-auto  ">
          {/* Icon Section */}
          
          
          {/* Main Content Card */}
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-6 lg:p-10">
              {/* Last Updated Section */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                {/* <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiFileText className="w-5 h-5 text-store-500" />
                  <span>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div> */}
              </div>

              {/* Content Section */}
              <div className="refund-policy-content">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .refund-policy-content h1, 
                    .refund-policy-content h2, 
                    .refund-policy-content h3, 
                    .refund-policy-content h4, 
                    .refund-policy-content h5, 
                    .refund-policy-content h6,
                    .refund-policy-content strong {
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
                      data={storeCustomizationSetting?.refund_return_policy?.description}
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
                      <FiPackage className="w-6 h-6 text-store-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                        <p className="text-sm text-gray-600">Return products within the specified time frame with our hassle-free return process.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Quick Refunds</h3>
                        <p className="text-sm text-gray-600">Get your money back quickly once we receive and verify your returned items.</p>
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
                        <h3 className="font-semibold text-gray-900 mb-2">Need Help with Returns or Refunds?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          If you have any questions about our refund and return policy, please contact our customer support team.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-store-600">
                          <FiLock className="w-4 h-4" />
                          <span>We're committed to your satisfaction</span>
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

export default RefundReturnPolicy;

