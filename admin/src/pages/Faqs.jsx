import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useMemo, useRef, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import AnimatedContent from "@/components/common/AnimatedContent";
import MainDrawer from "@/components/drawer/MainDrawer";
import FaqDrawer from "@/components/drawer/FaqDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import FaqTable from "@/components/faq/FaqTable";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { SidebarContext } from "@/context/SidebarContext";
import FaqServices from "@/services/FaqServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const Faqs = () => {
  const { toggleDrawer, setIsUpdate } = useContext(SidebarContext);
  const { serviceId, setServiceId } = useToggleDrawer();

  const { data, loading, error } = useAsync(FaqServices.getAllFaqs);

  const [searchText, setSearchText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [drawerType, setDrawerType] = useState("qa");
  const searchFormRef = useRef(null);

  const filteredFaqs = useMemo(() => {
    if (!searchText) return data;
    return data?.filter((faq) =>
      faq?.question?.toLowerCase()?.includes(searchText.toLowerCase().trim())
    );
  }, [data, searchText]);

  const qaFaqs = useMemo(
    () => filteredFaqs?.filter((faq) => faq?.type !== "video") || [],
    [filteredFaqs]
  );
  const videoFaqs = useMemo(
    () => filteredFaqs?.filter((faq) => faq?.type === "video") || [],
    [filteredFaqs]
  );

  const openDrawer = (type = "qa", faqId = null) => {
    setDrawerType(type);
    setServiceId(faqId);
    toggleDrawer();
  };

  const handleDelete = (faq) => {
    setSelectedFaq(faq);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedFaq) return;
    try {
      await FaqServices.deleteFaq(selectedFaq._id);
      notifySuccess("FAQ deleted successfully");
      setDeleteModalOpen(false);
      setSelectedFaq(null);
      setIsUpdate(true);
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search?.value;
    setSearchText(value || "");
  };

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
    <>
      <PageTitle>Customer FAQs</PageTitle>

      <MainDrawer>
        <FaqDrawer id={serviceId} type={drawerType} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <form
                ref={searchFormRef}
                onSubmit={handleSearchSubmit}
                className="flex flex-1 items-center gap-3 w-full"
              >
                <Input
                  name="search"
                  type="search"
                  placeholder="Search question..."
                />
                <Button type="submit" className="h-12 w-32 bg-store-700">
                  Filter
                </Button>
                <Button
                  layout="outline"
                  type="reset"
                  onClick={() => {
                    setSearchText("");
                    searchFormRef.current?.reset();
                  }}
                  className="h-12 w-24 text-sm dark:bg-gray-700"
                >
                  Reset
                </Button>
              </form>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button
                  onClick={() => openDrawer("qa")}
                  className="w-full md:w-48 h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  Add Question
                </Button>
                <Button
                  onClick={() => openDrawer("video")}
                  className="w-full md:w-48 h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  Add Video
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={6} col={5} width={180} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : (
        <div className="space-y-8">
          {/* Videos first */}
          <Card className="shadow-xs bg-white dark:bg-gray-800">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  FAQ Videos
                </h3>
                <Button onClick={() => openDrawer("video")} className="h-10 w-36">
                  Add Video
                </Button>
              </div>
              {videoFaqs?.length ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {videoFaqs.map((video) => {
                    const embedUrl = getEmbedUrl(video.videoUrl);
                    return (
                      <div
                        key={video._id}
                        className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900 flex flex-col"
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
                              className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-sm px-4 text-center"
                            >
                              {video.videoUrl || "Open video"}
                            </a>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col space-y-2">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {video.question}
                          </h4>
                          {video.answer && (
                            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                              {video.answer}
                            </p>
                          )}
                          <div className="mt-2 flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => openDrawer("video", video._id)}
                              className="p-2 text-gray-400 hover:text-store-600 focus:outline-none"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(video)}
                              className="p-2 text-gray-400 hover:text-red-600 focus:outline-none"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <NotFound title="No FAQ videos yet." />
              )}
            </CardBody>
          </Card>

          {/* Questions below */}
          <Card className="shadow-xs bg-white dark:bg-gray-800">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  FAQ Questions
                </h3>
                <Button onClick={() => openDrawer("qa")} className="h-10 w-36">
                  Add Question
                </Button>
              </div>
              {qaFaqs?.length ? (
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>Question</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell className="text-right">Actions</TableCell>
                      </tr>
                    </TableHeader>
                    <FaqTable
                      faqs={qaFaqs}
                      handleEdit={(faq) => openDrawer("qa", faq._id)}
                      handleDelete={handleDelete}
                      variant="qa"
                    />
                  </Table>
                </TableContainer>
              ) : (
                <NotFound title="No FAQ questions yet." />
              )}
            </CardBody>
          </Card>
        </div>
      )}

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-2">Delete FAQ?</h2>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedFaq?.question}</span>? This
            action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            className="w-full h-12 sm:w-auto bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Faqs;


