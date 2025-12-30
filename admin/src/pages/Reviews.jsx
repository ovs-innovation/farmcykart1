import {
  Card,
  Button,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import
import { notifyError, notifySuccess } from "@/utils/toast";
import useAsync from "@/hooks/useAsync";
import ReviewServices from "@/services/ReviewServices";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ReviewTable from "@/components/review/ReviewTable";
import TableLoading from "@/components/preloader/TableLoading";
import AnimatedContent from "@/components/common/AnimatedContent";
import { Modal, ModalBody, ModalFooter } from "@windmill/react-ui";

const Reviews = () => {
  const {
    currentPage,
    handleChangePage,
    resultsPerPage,
    searchText,
    searchRef,
    setSearchText,
    invoice,
    setInvoice,
  } = useContext(SidebarContext);

  const { t } = useTranslation();

  const [ratingFilter, setRatingFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("newest");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { data, loading, error } = useAsync(() => {
    const trimmedSearch = (searchText || "").trim();
    const searchIsInvoice =
      trimmedSearch && !Number.isNaN(Number(trimmedSearch));

    const effectiveInvoice =
      invoice || (searchIsInvoice ? trimmedSearch : undefined);

    return ReviewServices.getAllReviews({
      page: currentPage,
      limit: resultsPerPage,
      rating: ratingFilter || undefined,
      verified: verifiedFilter || undefined,
      sort: sortFilter,
      // Ab search hamesha review text ke liye enabled rahega
      search: trimmedSearch || undefined,
      // Invoice filter alag se, ya numeric searchText se
      invoice: effectiveInvoice || undefined,
    });
  });

  const handleDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await ReviewServices.deleteReview(reviewToDelete);
      notifySuccess("Review deleted successfully");
      setDeleteModalOpen(false);
      setReviewToDelete(null);
      refetch();
    } catch (err) {
      notifyError(err?.response?.data?.message || "Failed to delete review");
      console.error("Error deleting review:", err);
    }
  };

  const handleResetFilters = () => {
    setRatingFilter("");
    setVerifiedFilter("");
    setSortFilter("newest");
    setSearchText("");
    setInvoice(null);
    if (searchRef?.current) {
      searchRef.current.value = "";
    }
  };

  const handleSubmitFilters = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <PageTitle>Reviews & Ratings</PageTitle>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form onSubmit={handleSubmitFilters} className="py-3">
              <div className="grid gap-4 lg:gap-6 xl:gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div>
                  <Input
                    ref={searchRef}
                    type="search"
                    name="search"
                    placeholder="Search reviews..."
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div>
                  <Input
                    type="number"
                    name="invoice"
                    placeholder="Invoice no."
                    value={invoice || ""}
                    onChange={(e) => setInvoice(e.target.value)}
                  />
                </div>

                <div>
                  <Select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                  >
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </Select>
                </div>

                <div>
                  <Select
                    value={verifiedFilter}
                    onChange={(e) => setVerifiedFilter(e.target.value)}
                  >
                    <option value="">All Reviews</option>
                    <option value="true">Verified Only</option>
                    <option value="false">Not Verified</option>
                  </Select>
                </div>

                <div>
                  <Select
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value)}
                  >
                    <option value="newest">Most Recent</option>
                    <option value="rating_high">Highest Rating</option>
                    <option value="rating_low">Lowest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button type="submit" className="bg-store-700">
                  Filter
                </Button>
                <Button
                  layout="outline"
                  onClick={handleResetFilters}
                  type="button"
                  className="px-4 md:py-1 py-2 text-sm dark:bg-gray-700"
                >
                  <span className="text-black dark:text-gray-200">Reset</span>
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={8} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data?.reviews?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Product</TableCell>
                <TableCell>Invoice</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell>Helpful</TableCell>
                <TableCell>Date</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <ReviewTable
              reviews={data?.reviews}
              handleDeleteReview={handleDeleteReview}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.pagination?.total || 0}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="No reviews found" />
      )}

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-2">
            Delete Review?
          </h2>
          <p>Are you sure you want to delete this review? This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="w-full h-12 sm:w-auto bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Reviews;

