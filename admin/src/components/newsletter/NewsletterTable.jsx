import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

//internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import Tooltip from "@/components/tooltip/Tooltip";
import { FiTrash2 } from "react-icons/fi";

const NewsletterTable = ({ isCheck, newsletters, setIsCheck }) => {
  const [updatedNewsletters, setUpdatedNewsletters] = useState([]);
  const { title, serviceId, handleModalOpen } = useToggleDrawer();
  const { showDateFormat } = useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    setUpdatedNewsletters(newsletters);
  }, [newsletters]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <TableBody>
        {updatedNewsletters?.map((newsletter, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={newsletter?.email}
                id={newsletter._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(newsletter._id)}
              />
            </TableCell>

            <TableCell>
              <span className="text-sm">{newsletter?.email}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateFormat(newsletter.createdAt)}
              </span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <button
                  disabled={isCheck?.length > 0}
                  onClick={() => handleModalOpen(newsletter._id, "Newsletter")}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                >
                  <Tooltip
                    id="delete"
                    Icon={FiTrash2}
                    title="Delete"
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

export default NewsletterTable;
