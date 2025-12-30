import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

import { useTranslation } from "react-i18next";
import { FiZoomIn, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import

import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import PrintReceipt from "@/components/form/others/PrintReceipt";
import SelectStatus from "@/components/form/selectOption/SelectStatus";
import OrderActions from "@/components/order/OrderActions";

const OrderTable = ({ orders, visibleColumns = {} }) => {
  const { t } = useTranslation();
  const {
    showDateTimeFormat,
    currency,
    getNumberTwo,
    showingTranslateValue,
  } = useUtilsFunction();

  // Default visible columns if not provided (e.g. in Dashboard)
  const columns =
    Object.keys(visibleColumns).length > 0
      ? visibleColumns
      : {
          invoice: true,
          time: true,
          customerName: true,
          customerId: false,
          productName: false,
          productId: false,
          contact: true,
          shippingCost: true,
          discount: true,
          method: true,
          amount: true,
          status: true,
          action: true,
          actions: true,
        };

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            {columns.invoice && (
              <TableCell className="whitespace-nowrap">
                <span className="font-semibold uppercase text-xs">
                  {order?.invoice}
                </span>
              </TableCell>
            )}

            {columns.time && (
              <TableCell className="whitespace-nowrap">
                <span className="text-sm">
                  {showDateTimeFormat(order?.updatedDate)}
                </span>
              </TableCell>
            )}

            {columns.customerName && (
              <TableCell className="text-xs whitespace-nowrap">
                <span className="text-sm">{order?.user_info?.name}</span>{" "}
              </TableCell>
            )}

            {columns.customerId && (
              <TableCell className="whitespace-nowrap">
                <span className="text-xs text-gray-500">{order?.user}</span>
              </TableCell>
            )}

            {columns.productName && (
              <TableCell className="whitespace-normal">
                <div className="flex flex-col gap-1 min-w-[150px]">
                  {order?.cart?.map((item, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-600 font-semibold dark:text-gray-400 leading-tight"
                    >
                      •{" "}
                      {typeof item.title === "object"
                        ? showingTranslateValue(item.title)
                        : item.title}
                    </span>
                  ))}
                </div>
              </TableCell>
            )}

            {columns.productId && (
              <TableCell className="whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  {order?.cart?.map((item, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      • {item._id || item.id}
                    </span>
                  ))}
                </div>
              </TableCell>
            )}

            {columns.contact && (
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{order?.user_info?.contact}</span>
                  {order?.user_info?.contact && (
                    <a
                      href={`https://wa.me/${order?.user_info?.contact.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-500 p-1 rounded-md text-white hover:bg-green-600 transition-colors"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </TableCell>
            )}

            {columns.shippingCost && (
              <TableCell className="whitespace-nowrap">
                <span className="text-sm font-semibold">
                  {currency}
                  {getNumberTwo(order?.shippingCost)}
                </span>
              </TableCell>
            )}

            {columns.discount && (
              <TableCell className="whitespace-nowrap">
                <span className="text-sm font-semibold">
                  {currency}
                  {getNumberTwo(order?.discount)}
                </span>
              </TableCell>
            )}

            {columns.method && (
              <TableCell className="whitespace-nowrap">
                <span className="text-sm font-semibold">
                  {order?.paymentMethod}
                </span>
              </TableCell>
            )}

            {columns.amount && (
              <TableCell className="whitespace-nowrap">
                <span className="text-sm font-semibold">
                  {currency}
                  {getNumberTwo(order?.total)}
                </span>
              </TableCell>
            )}

            {columns.status && (
              <TableCell className="text-xs whitespace-nowrap">
                <Status status={order?.status} />
              </TableCell>
            )}

            {columns.action && (
              <TableCell className="text-center whitespace-nowrap">
                <SelectStatus id={order._id} order={order} />
              </TableCell>
            )}

            {columns.actions && (
              <TableCell className="text-right relative whitespace-nowrap">
                <OrderActions order={order} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
