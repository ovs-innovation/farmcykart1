import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import useUtilsFunction from "@hooks/useUtilsFunction";
import FaqServices from "@services/FaqServices";
import { notifyError } from "@utils/toast";

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
    >
      <span className="text-lg font-semibold text-gray-900">{question}</span>
      <span
        className={`flex items-center justify-center w-9 h-9 rounded-full border border-purple-500 text-purple-600 text-2xl font-light transition-transform ${
          isOpen ? "" : ""
        }`}
      >
        {isOpen ? "−" : "+"}
      </span>
    </button>
    {isOpen && (
      <div className="pb-6 text-base leading-7 text-gray-700">{answer}</div>
    )}
  </div>
);

const Faq = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    setLoadingFaqs(true);
    FaqServices.getPublicFaqs()
      .then((res) => {
        setFaqs(res || []);
      })
      .catch((err) => {
        notifyError(err?.response?.data?.message || "Failed to load FAQs");
      })
      .finally(() => setLoadingFaqs(false));
  }, []);

  const fallbackFaqs = useMemo(() => {
    const faqContent = storeCustomizationSetting?.faq || {};
    const keys = [
      ["faq_one", "description_one"],
      ["faq_two", "description_two"],
      ["faq_three", "description_three"],
      ["faq_four", "description_four"],
      ["faq_five", "description_five"],
      ["faq_six", "description_six"],
      ["faq_seven", "description_seven"],
      ["faq_eight", "description_eight"],
    ];
    return keys
      .map(([qKey, aKey]) => {
        const question = showingTranslateValue(faqContent?.[qKey]);
        const answer = showingTranslateValue(faqContent?.[aKey]);
        if (!question) return null;
        return { question, answer, type: "qa" };
      })
      .filter(Boolean);
  }, [storeCustomizationSetting, showingTranslateValue]);

  const faqItems = faqs.length ? faqs : fallbackFaqs;
  const qaFaqs = useMemo(
    () => faqItems.filter((item) => item?.type !== "video"),
    [faqItems]
  );
  const videoFaqs = useMemo(
    () => faqItems.filter((item) => item?.type === "video"),
    [faqItems]
  );

  const getEmbedUrl = (url = "") => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtube.com")) {
        const videoId = parsed.searchParams.get("v");
        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : url.replace("watch?v=", "embed/");
      }
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsed.pathname}`;
      }
      if (parsed.hostname.includes("vimeo.com")) {
        return `https://player.vimeo.com/video${parsed.pathname}`;
      }
    } catch (err) {
      return null;
    }
    return null;
  };

  return (
    <Layout title="FAQ" description="This is faq page">
      <PageHeader
        headerBg={storeCustomizationSetting?.faq?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.faq?.title)}
      />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 py-10 lg:py-12">
          <div className="grid gap-4 lg:mb-8 items-center md:grid-cols-2 xl:grid-cols-2">
            <div className="pr-16">
              <Image
                width={720}
                height={550}
                src={storeCustomizationSetting?.faq?.left_img || "/faq.svg"}
                alt="logo"
              />
            </div>
            <div className="">
              {loadingFaqs && (
                <p className="text-sm text-gray-500 mb-4">Loading FAQs...</p>
              )}
              {!loadingFaqs && qaFaqs.length === 0 && (
                <p className="text-sm text-gray-500">No FAQs available.</p>
              )}

              <div className="border border-gray-200 rounded-2xl divide-y divide-gray-200">
                {qaFaqs.map((faq, idx) => (
                  <AccordionItem
                    key={faq?._id || faq?.question || idx}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === idx}
                    onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                  />
                ))}
              </div>

              {videoFaqs.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Video Guides
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {videoFaqs.map((video) => {
                      const embedUrl = getEmbedUrl(video.videoUrl);
                      return (
                        <div
                          key={video?._id || video.question}
                          className="border rounded-2xl shadow-sm overflow-hidden"
                        >
                          <div className="relative w-full pb-[56.25%] bg-black">
                            {embedUrl ? (
                              <iframe
                                src={embedUrl}
                                title={video.question}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <a
                                href={video.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-lg"
                              >
                                Watch Video
                              </a>
                            )}
                          </div>
                          <div className="p-4 space-y-3">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {video.question}
                            </h4>
                            {video.answer && (
                              <p className="text-sm text-gray-600">
                                {video.answer}
                              </p>
                            )}
                            {video.videoUrl && !embedUrl && (
                              <a
                                href={video.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-store-600 font-medium text-sm"
                              >
                                Open video
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

export default Faq;
