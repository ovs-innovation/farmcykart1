import React from "react";
import { FiShield, FiLock, FiEye, FiFileText, FiAlertCircle, FiCheckCircle, FiUser } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const PrivacyPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Layout title="Privacy Policy" description="This is privacy policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.privacy_policy?.title
        )}
      />
      <div className="bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-10">
          {/* Main Content Card */}
          <div className=" rounded-xl overflow-hidden">
            <div className="">
              {/* Icon Section */}
               

              {/* Last Updated Section */}
              

              {/* Content Section */}
              <div className="privacy-policy-content">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .privacy-policy-content h1, 
                    .privacy-policy-content h2, 
                    .privacy-policy-content h3, 
                    .privacy-policy-content h4, 
                    .privacy-policy-content h5, 
                    .privacy-policy-content h6,
                    .privacy-policy-content strong {
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
                      data={storeCustomizationSetting?.privacy_policy?.description}
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
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiLock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
                        <p className="text-sm text-gray-600">Your personal information is encrypted and securely stored using industry-standard security measures.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FiEye className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
                        <p className="text-sm text-gray-600">We clearly explain how we collect, use, and protect your personal information.</p>
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
                        <h3 className="font-semibold text-gray-900 mb-2">Have Questions About Privacy?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          If you have any questions or concerns about our privacy policy, please contact our privacy team.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-store-600">
                          <FiShield className="w-4 h-4" />
                          <span>Your privacy is our priority</span>
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

export default PrivacyPolicy;
