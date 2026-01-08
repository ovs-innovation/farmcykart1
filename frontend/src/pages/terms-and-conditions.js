import React from "react";
import { FiFileText, FiAlertCircle, FiCheckCircle, FiShield, FiInfo, FiLock, FiLink } from "react-icons/fi";
import Link from "next/link";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const TermAndConditions = () => {
  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  return (
    <Layout
      title="Terms & Conditions"
      description="This is terms and conditions page"
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.term_and_condition?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.term_and_condition?.title
        )}
      />
      <div className="bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-10">
          {/* Main Content Card */}
          <div className="rounded-xl overflow-hidden">
            <div className="">
              {/* Icon Section */}
               

              
              {/* Content Section */}
              <div className="terms-conditions-content">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .terms-conditions-content h1, 
                    .terms-conditions-content h2, 
                    .terms-conditions-content h3, 
                    .terms-conditions-content h4, 
                    .terms-conditions-content h5, 
                    .terms-conditions-content h6,
                    .terms-conditions-content strong {
                      font-weight: 400 !important;
                    }
                  `
                }} />
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6 text-justify">
                    <CMSkeleton
                      html
                      count={15}
                      height={15}
                      error={error}
                      loading={loading}
                      data={storeCustomizationSetting?.term_and_condition?.description}
                    />
                  </div>
                </div>
              </div>

              {/* Loading States */}
              {loading && (
                <div className="mt-6 space-y-4">
                  <CMSkeleton count={15} height={15} loading={loading} />
                  <CMSkeleton count={15} height={15} loading={loading} />
                </div>
              )}

              {/* Quick Info Cards */}
              {!loading && !error && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiShield className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Legal Protection</h3>
                        <p className="text-sm text-gray-600">These terms protect both you and us, ensuring a clear understanding of our mutual rights and responsibilities.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiInfo className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Clear Guidelines</h3>
                        <p className="text-sm text-gray-600">Our terms provide clear guidelines on how to use our services and what to expect from us.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Links Section */}
              {!loading && !error && (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <FiLink className="w-6 h-6 text-store-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Related Information</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          For more information, please review our related policies:
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link 
                            href="/privacy-policy"
                            className="inline-flex items-center gap-2 text-sm text-store-600 hover:text-store-700 font-medium transition-colors"
                          >
                            <FiLock className="w-4 h-4" />
                            <span>Privacy Policy</span>
                          </Link>
                          <Link 
                            href="/refund-return-policy"
                            className="inline-flex items-center gap-2 text-sm text-store-600 hover:text-store-700 font-medium transition-colors"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                            <span>Refund & Return Policy</span>
                          </Link>
                          <Link 
                            href="/shipping-delivery-policy"
                            className="inline-flex items-center gap-2 text-sm text-store-600 hover:text-store-700 font-medium transition-colors"
                          >
                            <FiFileText className="w-4 h-4" />
                            <span>Shipping & Delivery Policy</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {!loading && !error && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-store-50 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="w-6 h-6 text-store-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Questions About Our Terms?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          If you have any questions or concerns about our terms and conditions, please contact our support team.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-store-600">
                          <FiCheckCircle className="w-4 h-4" />
                          <span>We're here to help clarify any questions</span>
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

export default TermAndConditions;
