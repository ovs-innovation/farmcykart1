import React, { useState } from "react";
import { IoCallOutline, IoDocumentTextOutline } from "react-icons/io5";
import PrescriptionUploadModal from "@components/prescription/PrescriptionUploadModal";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getPalette } from "@utils/themeColors";

const OrderOptions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { storeCustomizationSetting, globalSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  // Get theme colors
  const storeColor = storeCustomizationSetting?.theme?.color || "green";
  const palette = getPalette(storeColor);

  // Get contact number from settings with fallbacks
  const contactNumber = 
    storeCustomizationSetting?.navbar?.phone || 
    showingTranslateValue(storeCustomizationSetting?.contact_us?.call_box_phone) ||
    globalSetting?.contact ||
    "09240250346"; // Fallback to default

  return (
    <>
      <div className="w-full max-w-3xl mx-auto mt-6">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gray-300 w-16 md:w-24"></div>
          <span className="px-4 text-gray-500 text-xs md:text-sm font-semibold tracking-wider uppercase">
            PLACE YOUR ORDER VIA
          </span>
          <div className="h-px bg-gray-300 w-16 md:w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <a
            href={`tel:${contactNumber.replace(/\s+/g, '')}`}
            className="flex items-center p-4 rounded-xl transition-colors cursor-pointer group"
            style={{ 
              backgroundColor: `${palette[50]}`, 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette[100];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette[50];
            }}
          >
            <div 
              className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
              style={{ color: palette[600] }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = palette[700];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = palette[600];
              }}
            >
              <IoCallOutline className="text-2xl" />
            </div>
            <span className="ml-4 text-gray-700 font-medium">
              Call <span className="font-bold text-gray-900">{contactNumber}</span>{" "}
              to place order
            </span>
          </a>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center p-4 rounded-xl transition-colors cursor-pointer group w-full text-left"
            style={{ 
              backgroundColor: `${palette[50]}`, 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette[100];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette[50];
            }}
          >
            <div 
              className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
              style={{ color: palette[600] }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = palette[700];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = palette[600];
              }}
            >
              <IoDocumentTextOutline className="text-2xl" />
            </div>
            <span className="ml-4 text-gray-700 font-medium">
              Upload a <span className="font-bold text-gray-900">prescription</span>
            </span>
          </button>
        </div>
      </div>

      <PrescriptionUploadModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};

export default OrderOptions;
