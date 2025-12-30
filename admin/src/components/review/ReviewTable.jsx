import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";
import { FiCheck, FiX } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiTrash2 } from "react-icons/fi";
import Tooltip from "@/components/tooltip/Tooltip";

dayjs.extend(relativeTime);

const ReviewTable = ({ reviews, handleDeleteReview }) => {
  const { t } = useTranslation();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <AiFillStar
        key={idx}
        className={`w-4 h-4 ${
          idx < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatText = (value, fallback = "N/A") => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      if (value.en) return value.en;
      const firstValue = Object.values(value)[0];
      return typeof firstValue === "string" ? firstValue : fallback;
    }
    return String(value);
  };

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {reviews?.map((review, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <div className="flex items-center space-x-2">
                {review.product?.image && (
                  <img
                    src={
                      Array.isArray(review.product.image)
                        ? review.product.image[0]
                        : review.product.image
                    }
                    alt={review.product?.title || "Product"}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {formatText(review.product?.title)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.product?.slug || ""}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {review.orderInvoice ? `#${review.orderInvoice}` : "N/A"}
              </p>
            </TableCell>

            <TableCell>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {formatText(review.user?.name, "Anonymous")}
                </p>
                <p className="text-xs text-gray-500">{review.user?.email || ""}</p>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
                <span className="ml-1 text-sm font-semibold">
                  {review.rating}/5
                </span>
              </div>
            </TableCell>

            <TableCell>
              <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                {review.reviewText}
              </p>
              {review.images && review.images.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {review.images.length} image(s)
                </p>
              )}
            </TableCell>

            <TableCell>
              <div className="flex items-center space-x-2">
                {review.verified ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FiCheck className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <FiX className="w-3 h-3 mr-1" />
                    Not Verified
                  </span>
                )}
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {review.helpfulCount || 0} helpful
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {dayjs(review.createdAt).fromNow()}
              </span>
              <p className="text-xs text-gray-500">
                {dayjs(review.createdAt).format("MMM DD, YYYY")}
              </p>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end">
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                >
                  <Tooltip
                    id={`delete-${review._id}`}
                    Icon={FiTrash2}
                    title="Delete Review"
                    bgColor="#EF4444"
                  />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ReviewTable;

