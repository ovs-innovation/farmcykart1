import {
  Card,
  CardBody,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//internal import
import NewsletterServices from "@/services/NewsletterServices";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import PageTitle from "@/components/Typography/PageTitle";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import NewsletterTable from "@/components/newsletter/NewsletterTable";
import NotFound from "@/components/table/NotFound";

const Newsletters = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useAsync(NewsletterServices.getAllNewsletter);
  
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { allId, serviceId, handleDeleteMany } = useToggleDrawer();

  const {
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
  } = useFilter(data);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  return (
    <>
      <PageTitle>Newsletters</PageTitle>

      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Newsletter"
      />
      
      <BulkActionDrawer ids={allId} title="Newsletters" />

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex justify-end items-center">
            {/* Can add search here later */}
          </div>
        </CardBody>
      </Card>

      <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </tr>
          </TableHeader>
          <NewsletterTable
            newsletters={dataTable}
            isCheck={isCheck}
            setIsCheck={setIsCheck}
          />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      
      {loading && <TableLoading row={12} col={4} width={190} height={20} />}
      {error && <span className="text-center mx-auto text-red-500">{error}</span>}
      {serviceData?.length !== 0 && !loading && (
        <NotFound title="Newsletter" />
      )}
    </>
  );
};

export default Newsletters;
