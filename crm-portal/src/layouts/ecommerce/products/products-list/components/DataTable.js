import { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonInput from "components/ArgonInput";
import ArgonPagination from "components/ArgonPagination";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import { useNavigate } from "react-router-dom";

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  pageCount,
  table,
  pagination,
  isSorted,
  noEndBorder,
  limit ,
  setLimit,
  currentPage,
  setCurrentPage,
  totalPages,
  totalRecords,
  setSearch,
  search ,
  table_name
}) {
  const defaultValue = 5;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 50];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table ]);
  const navigate = useNavigate()
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(limit || 10), [limit]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = ({ value }) => {
    setLimit(value);
    setCurrentPage(1)
  }

  const handlePaginationChange = (i)=>{
    setCurrentPage(i+1)
  }

  const getStartandEndEntries = ()=>{
    let entriesStart =  ((currentPage-1) * limit) +1 ;
    let entriesEnd = ((currentPage-1) * limit ) + limit;

    return {entriesStart : entriesStart , entriesEnd : entriesEnd}
  }



  const renderPagination = Array.from({ length: totalPages }, (_, i) => (
    <ArgonPagination
      item
      key={i}
      active={currentPage === i+1}
      onClick = {()=>{handlePaginationChange(i)}}
    >
      {i + 1}
    </ArgonPagination>
  ));





  return (
    <TableContainer sx={{ boxShadow: "none" }}>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonBox display="flex" alignItems="center">
              <ArgonBox width="25%">
                <ArgonSelect
                  defaultValue={{ value: defaultValue, label: defaultValue }}
                  options={entries.map((entry) => ({ value: entry, label: entry }))}
                  onChange={setEntriesPerPage}
                  size="small"
                />
              </ArgonBox>
              <ArgonTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </ArgonTypography>
            </ArgonBox>
          {canSearch && (
            <ArgonBox width="12rem" ml="auto">
              <ArgonInput
                placeholder="Search..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </ArgonBox>
          )}
        </ArgonBox>
      <Table {...getTableProps()}>
        <ArgonBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <DataTableHeadCell
                  key={index}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  // sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </ArgonBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()} sx={{cursor : 'pointer'}}
              // onClick ={()=> navigate('/leads/leaddetail', { state: { userId: row.original.id , table_name : table_name } })}
                            // onClick ={()=>console.log(row)}


              >
                {row.cells.map((cell, index) => (
                  <DataTableBodyCell
                    key={index}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ArgonBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <ArgonBox mb={{ xs: 3, sm: 0 }}>
            <ArgonTypography variant="button" color="secondary" fontWeight="regular">
              Showing {getStartandEndEntries().entriesStart} to {getStartandEndEntries().entriesEnd} of {totalRecords} entries
            </ArgonTypography>
          </ArgonBox>
        )}
          <ArgonPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <ArgonPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </ArgonPagination>
            )}

            {renderPagination.length > 6 ? (
              <ArgonBox width="5rem" mx={1}>
                <ArgonInput
                  inputProps={{ type: "number", min: 1, max: totalPages }}
                  value={currentPage}
                  onChange={(e)=>{setCurrentPage(e.target.value)}}
                />
              </ArgonBox>
            ) : (
              renderPagination
            )}

            {/* {canNextPage && (
              <ArgonPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </ArgonPagination>
            )} */}
          </ArgonPagination>
      </ArgonBox>
    </TableContainer>
  );
}

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  pageCount : PropTypes.number,
  showTotalEntries: PropTypes.bool,
  limit :PropTypes.number,
  setCurrentPage : PropTypes.func,
  currentPage : PropTypes.currentPage,
  setLimit : PropTypes.number,
  totalPages : PropTypes.number,
  totalRecords : PropTypes.number,
  setSearch : PropTypes.func,
  search : PropTypes.string,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  table_name : PropTypes.any,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;