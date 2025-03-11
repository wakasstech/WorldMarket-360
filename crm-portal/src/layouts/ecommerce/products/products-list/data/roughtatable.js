import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "../../components/DataTable";
import ArgonSnackbar from "components/ArgonSnackbar"; 
import axios from '../../../../../../axios/axios';
import moment from 'moment'
import ActionCell from "../../components/ActionCell";




function Index() {
  const [shouldReload, setShouldReload] = useState(false);
  const [leads, setLeads] = useState([]); // leads are the data to show in the table 
  const [pageCount, setPageCount] = useState(0);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [loading, setLoading] = useState(false);
  const [total , setTotal] = useState(0)
  const [currentPage , setCurrentPage] = useState(1);
  const [limit , setLimit] = useState(5);
  const [search , setSearch] = useState('');

  const table_name = 'AppSetczones'
  let getUrl = '/leadPages/getUsers'
  let searachUrl = '/leadPages/searchUsers'


  const fetchData = useCallback(async (pageSize, pageIndex) => {
    setLoading(true);
    try {
      const response = await axios.post(getUrl, {
        page: pageIndex,
        limit: pageSize, 
        table_name : table_name
      });
      setLeads(response.data.result);
      setPageCount(response.data.totalPages);
      setTotal(response?.data?.total);
    } catch (error) {
      setAlert({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

 

  const searchRecords = useCallback(async (search) => {
    setLoading(true);
    try {
      const response = await axios.post(searachUrl, {
        search : search,
        table_name : table_name
      });
      setLeads(response.data?.result);
    } catch (error) {
      setAlert({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  }, []);



  useEffect(() => {
    fetchData(limit, currentPage);
  }, [fetchData, shouldReload , currentPage , limit]);

  useEffect(()=>{
      if(search.length > 0){
        searchRecords(search)
      }
      else{
        fetchData(limit, currentPage);
      }
  } , [search])

  const dataTableData = {
    columns: [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Business Name",
        accessor: "business_name",
      },
      {
        Header: "Trade Name",
        accessor: "trade_name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
    {
        Header : "Action",
        accessor : 'action'
      }
      
    ],
    rows: leads && leads.map((item) => ({
      first_name: item.first_name || '-',
      id : item?.id || '-',
      last_name: item.last_name || '-',
      email: item.email || '-',
      business_name: item.business_name || '-',
      trade_name: item.trade_name || '-',
      phone: item.phone || '-',
 created_at: moment(item?.created_at)?.format("MMM Do YYYY") || '-',  
 
action : <ActionCell userid = {item?.id} table_name ={table_name} shouldReload={shouldReload} setShouldReload={setShouldReload}/>

    })),
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
          <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                App Setczones
              </ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                This Page shows all App Setczones User
              </ArgonTypography>
            </ArgonBox>
            {/* <Stack spacing={1} direction="row">
              <ArgonButton variant="gradient" color="info" size="small" onClick={() => setModalOpen(true)}>
                + Create New
              </ArgonButton>
            </Stack> */}
          </ArgonBox>
          <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: limit,
              entries: [5, 20, 50, 100],
            }}
            canSearch
            fetchData={fetchData}
            loading={loading}
            currentPage ={currentPage}
            setCurrentPage ={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
            totalPages ={pageCount}
            totalRecords = {total}
            setSearch = {setSearch}
            search = {search}
            table_name={table_name}
          />
        </Card>
      </ArgonBox>
      <Footer />
      <ArgonSnackbar
        color={alert.severity}
        title="Notification"
        content={alert.message}
        open={alert?.open}
        close={() => setAlert({ ...alert, open: false })}
      />
    </DashboardLayout>
  );
}

Index.propTypes = {
  value: PropTypes.string,
};

export default Index;