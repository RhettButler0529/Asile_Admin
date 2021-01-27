import React, { useState, useEffect } from "react";
import { Grid, Button, IconButton, InputBase, Tooltip, FormControlLabel, Switch, Menu, MenuItem, Divider } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons'
import CSVReader from 'react-csv-reader'
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import fetchPromotion from "../../../services/salesorder/SalesPromotionService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../../common/config';

function PromotionPage(props) {
  var classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);   // Table action menu
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataSource, setDataSource] = useState([
    {
      promotion_id: 1,
      code: 'AAAAAA',
      type: 'PERCENT',
      amount: 10,
    },
    {
      promotion_id: 2,
      code: 'BBBBBB',
      type: 'UNIT',
      amount: 5,
    },
    {
      promotion_id: 3,
      code: 'CCCCCC',
      type: 'TOTAL',
      amount: 560,
    }
  ]);
  const promotionData = useSelector(state => state.promotion);

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
  useEffect(() => {
    props.fetchPromotion()
    setDataSource(promotionData.promotion);
  }, [])

  const columns = [
    {
      name: "promotion_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "code",
      label: "Code",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "company_entity_name",
      label: "Company",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "promotion_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
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

  /**
   * Table Action menu event
   * @param {*} event 
   * @param {*} i 
   */

  const actionEdit = (e, i) => {
    // console.log(dataSource[selectedRowIndex]);
    // history.push("/app/sales/" + selectedRowIndex + "/edit");
    // console.log(dataSource[i]);
    history.push("/app/salesorder/promotion/" + i + "/edit");
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
    // onRowsDelete: (rowsDeleted) => {

    //   const delete_id = []
    //   rowsDeleted.data.map((data) => {
    //     const newDeleteId = salesviewData.salesview[data.dataIndex].sales_client_id
    //     delete_id.push(newDeleteId)
    //   })
    //   console.log("deleting Ids===> ", delete_id)
    //   delete_id.map((id) => {
    //     // row delete api call
    //     const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         sales_client_id: id
    //       })
    //     };
    //     fetch(`${SERVER_URL}deleteSalesClient`, requestOptions)
    //       .then(async response => {
    //         const data = await response.json();
    //         console.log("Response Data=============>", data)
    //         // check for error response
    //         if (!response.ok) {
    //           // get error message from body or default to response status
    //           const error = (data && data.message) || response.status;
    //           return Promise.reject(error);
    //         }
    //         return
    //       })
    //       .catch(error => {
    //         notify('Something went wrong!\n' + error)
    //         console.error('There was an error!', error);
    //       });
    //   })
    // },
    onTableChange: (action, tableState) => {
      console.log(action, tableState);
      let tmp = [];
      tableState.data.map((item, i) => {
        tmp.push(item.data);
      });
      console.log(tmp);
    }

  };


  const importCSV = (data) => {
    console.log(data)
    addWithCSV(data)
  }

  const addWithCSV = (data) => {
    // for (let i = 1; i < data.length - 1; i++) {
    //   const row = data[i];
    //   let saveData = {
    //     user_id: row[0],
    //     client_id: row[1],
    //   }
    //   const reqOption = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(saveData)
    //   }
    //   fetch(`${SERVER_URL}addSalesClientWithCSV`, reqOption)
    //     .then(async response => {
    //       const data = await response.json();
    //       console.log("Response Data=============>", data)
    //       // check for error response
    //       if (!response.ok) {
    //         const error = (data && data.message) || response.status;
    //         return Promise.reject(error);
    //       } else if (data.client_id != null) {
    //         notify("This client is already exist.")
    //         return
    //       } else if (data.id != 0) {

    //         notify("Successfully appended");
    //       }
    //     })
    //     .catch(error => {
    //       notify('Something went wrong!\n' + error)
    //       console.error('There was an error!', error);
    //     });
    // }
  }

  return (
    <>
      <PageTitle title="Promotion" button={["Add New"]} data={dataSource} category="salesorder_promotion" history={history} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Promotion"}
              // data={dataSource}
              data={promotionData.promotion}
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
  promotion: state.promotion
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPromotion: fetchPromotion
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromotionPage);

