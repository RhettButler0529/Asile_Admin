import React, { useState, useEffect } from "react";
import { Grid, IconButton, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Edit } from '@material-ui/icons'
import CSVReader from 'react-csv-reader'

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import fetchClientView from "../../services/clientview/ClientViewService";
import { toast, ToastContainer } from "react-toastify";
import Status from "../../components/Status/Status";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../common/config';

function ClientViewPage(props) {
  let history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const clientViewData = useSelector(state => state.clientview);

  useEffect(() => {
    console.log(clientViewData)
    props.fetchClientView()
    setDataSource(clientViewData.clientview);
  }, [])

  //Show notification
  const notify = (message) => toast(message);
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          paddingTop: "5px",
          paddingBottom: "5px",
          fontSize: '.8125rem',
        },
      }
    },
    MuiTableCell: {
      root: {
        borderColor: '#d3d3d3',
        fontSize: '.8125rem',
      },
      head: {
        paddingTop: "5px",
        paddingBottom: "5px",
      },
    },
  })
  const columns = [
    {
      name: "client_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "client_entity_name",
      label: "Entity Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "custom_field",
      label: "Custom Field",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "approved",
      label: "Approved",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status status={value == 1 ? "yes" : "no"} />
          );
        }
      }
    },
    {
      name: "full_name",
      label: "Created by",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "location",
      label: "Location",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone_number",
      label: "Phone Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "client_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          // console.log("==================>", value, tableMeta, updateValue)
          return (
            <>
              <IconButton
                onClick={(e) => {
                  actionEdit(e, value)
                }}
              >
                <Edit style={{ fontSize: '18' }} />
              </IconButton>
            </>
          );
        }
      },
    },
  ];

  const actionEdit = (e, i) => {
    history.push("/app/clientview/" + i + "/edit");
  }

  const options = {
    filterType: 'dropdown',
    pagination: true,
    print: false,
    download: true,
    filter: true,
    responsive: 'scroll',
    fixedHeader: false, elevation: 0,
    rowsPerPageOptions: [5, 10, 20],
    resizableColumns: false,
    onRowsDelete: (rowsDeleted) => {

      const delete_id = []
      rowsDeleted.data.map((data) => {
        const newDeleteId = clientViewData.clientview[data.dataIndex].client_id
        delete_id.push(newDeleteId)
      })
      console.log("deleting Ids===> ", delete_id)
      delete_id.map((id) => {
        // row delete api call
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: id
          })
        };
        fetch(`${SERVER_URL}deleteClient`, requestOptions)
          .then(async response => {
            const data = await response.json();
            console.log("Response Data=============>", data)
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            return
          })
          .catch(error => {
            notify('Something went wrong!\n' + error)
            console.error('There was an error!', error);
          });
      })
    },
    onTableChange: (action, tableState) => {
      console.log(action, tableState);
      let tmp = [];
      tableState.data.map((item) => {
        tmp.push(item.data);
      });
      console.log(tmp);
    }

  };

  const importCSV = (data) => {
    console.log(data)


  }

  const addWithCSV = (data) => {
    for (let i = 1; i < data.length - 1; i++) {
      const row = data[i];
      let saveData = {
        client_entity_name: row[0],
        address: row[1],
        phone_number: row[3],
        location: row[2],
        company_id: row[4],
        custom_field: row[5],
        approved: row[6],
        created_by: row[7]
      }
      const reqOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      }
      fetch(`${SERVER_URL}addClient`, reqOption)
        .then(async response => {
          const data = await response.json();
          console.log("Response Data=============>", data)
          // check for error response
          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          } else if (data.client_id != null) {
            notify("This client is already exist.")
            return
          } else if (data.id != 0) {

            notify("Successfully appended");
          }
        })
        .catch(error => {
          notify('Something went wrong!\n' + error)
          console.error('There was an error!', error);
        });
    }
  }

  return (
    <>
      <PageTitle title="Clients" button={["Add New"]} data={dataSource} category="clientview" history={history} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Clients"}
              data={clientViewData.clientview}
              // data={dataSource}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6} lg={6}></Grid>
        <Grid item xs={4} md={4} lg={4}>
          <CSVReader label="Import CSV: " onFileLoaded={(data) => importCSV(data)} />
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Button variant="outlined" color="primary" onClick={() => { window.location.reload() }}>
            See Result
          </Button>
        </Grid>
      </Grid>
    </>
  );
}


const mapStateToProps = state => ({
  clientview: state.clientview
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchClientView: fetchClientView
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientViewPage);
