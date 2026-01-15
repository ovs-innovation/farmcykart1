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
import TestimonialDrawer from "@/components/drawer/TestimonialDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import TestimonialTable from "@/components/testimonial/TestimonialTable";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { SidebarContext } from "@/context/SidebarContext";
import TestimonialServices from "@/services/TestimonialServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const Testimonials = () => {
  const { toggleDrawer, setIsUpdate } = useContext(SidebarContext);
  const { serviceId, setServiceId } = useToggleDrawer();

  const { data, loading, error } = useAsync(TestimonialServices.getAllTestimonials);

  const [searchText, setSearchText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const searchFormRef = useRef(null);

  const filteredTestimonials = useMemo(() => {
    if (!searchText) return data;
    return data?.filter((testimonial) =>
      testimonial?.title?.toLowerCase()?.includes(searchText.toLowerCase().trim())
    );
  }, [data, searchText]);

  const openDrawer = (testimonialId = null) => {
    setServiceId(testimonialId);
    toggleDrawer();
  };

  const handleDelete = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTestimonial) return;
    try {
      await TestimonialServices.deleteTestimonial(selectedTestimonial._id);
      notifySuccess("Testimonial deleted successfully");
      setDeleteModalOpen(false);
      setSelectedTestimonial(null);
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

  const isVideoUrl = (url = "") => {
    if (!url) return false;
    const lowered = url.toLowerCase();
    return lowered.includes(".mp4") || lowered.includes(".mov") || lowered.includes(".webm");
  };

  return (
    <>
      <PageTitle>Testimonials</PageTitle>

      <MainDrawer>
        <TestimonialDrawer id={serviceId} />
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
                  placeholder="Search testimonial title..."
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
                  onClick={() => openDrawer()}
                  className="w-full md:w-48 h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  Add Testimonial
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={6} col={4} width={180} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : (
        <Card className="shadow-xs bg-white dark:bg-gray-800">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Testimonials
              </h3>
              <Button onClick={() => openDrawer()} className="h-10 w-36">
                Add Testimonial
              </Button>
            </div>
            {filteredTestimonials?.length ? (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>Title</TableCell>
                      <TableCell className="text-right">Actions</TableCell>
                    </tr>
                  </TableHeader>
                  <TestimonialTable
                    testimonials={filteredTestimonials}
                    handleEdit={(testimonial) => openDrawer(testimonial._id)}
                    handleDelete={handleDelete}
                  />
                </Table>
              </TableContainer>
            ) : (
              <NotFound title="No testimonials yet." />
            )}
          </CardBody>
        </Card>
      )}

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-2">Delete Testimonial?</h2>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedTestimonial?.title}</span>? This
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

export default Testimonials;

