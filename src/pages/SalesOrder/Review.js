import React, { useState, useEffect } from "react";
import { Grid, IconButton, Tooltip, Menu, MenuItem} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import MenuIcon from '@material-ui/icons/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import fetchReview from "../../services/Review/ReviewService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../common/config';
import Status3 from "../../components/Status/Status3";
import Status2 from "../../components/Status/Status2";

function ReviewPage(props) {
  let history = useHistory();
  const [dataSource, setDataSource] = useState([
    {
      order_id: 1,
      full_name: "User1",
      client_entity_name: 'Client1',
      order_items: 'Item1, Item2',
      promotions: 'Promotion1',
      tax: 10,
      shipping_cost: 20,
      net_total: 30,
      order_date: '2021-01-25 01:20:35',
      notes: 'Note1',
      client_signature: 'Client_Signature1.png',
      user_signature: 'User_Signature1.png',
      upload_picture: 'Upload_Picture1.png',
      custom_field: 'Custom Field',
      location: '-35.2654 122.3659',
      status: 0,
      order_method: 'in',
    },
    {
      order_id: 2,
      full_name: "User2",
      client_entity_name: 'Client2',
      order_items: 'Item1, Item4',
      promotions: 'Promotion2',
      tax: 10,
      shipping_cost: 20,
      net_total: 30,
      order_date: '2021-01-25 01:20:35',
      notes: 'Note2',
      client_signature: 'Client_Signature1.png',
      user_signature: 'User_Signature1.png',
      upload_picture: 'Upload_Picture1.png',
      custom_field: 'Custom Field',
      location: '-35.2654 122.3659',
      status: 0,
      order_method: 'out',
    }
  ]);
  const [anchorEl, setAnchorEl] = useState(null);   // Table action menu
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  // const ReviewData = useSelector(state => state.review);

  useEffect(() => {
    // console.log(ReviewData)
    // props.fetchReview()
    // setDataSource(ReviewData.Review);
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
      name: "order_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "full_name",
      label: "User",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "client_entity_name",
      label: "Client",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "order_items",
      label: "Items",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "promotions",
      label: "Promotion",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "tax",
      label: "Tax",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "shipping_cost",
      label: "Shipping Cost",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "net_total",
      label: "Total",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "order_date",
      label: "Due Date",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "notes",
      label: "Notes",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "client_signature",
      label: "Client Signature",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value)
          return (
            <a href={`${SERVER_URL}signature/${value}`} target="_blank"> {value} </a>
          );
        }
      }
    },
    {
      name: "user_signature",
      label: "User Signature",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value)
          return (
            <a href={`${SERVER_URL}signature/${value}`} target="_blank"> {value} </a>
          );
        }
      }
    },
    {
      name: "upload_picture",
      label: "Uploaded Picture",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value)
          return (
            <a href={`${SERVER_URL}upload/${value}`} target="_blank"> {value} </a>
          );
        }
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
      name: "location",
      label: "Location",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status3 status={
              value == 0 ? 'pending' : (value = 1 ? 'accept' : 'reject')
            } />
          );
        }
      }
    },
    {
      name: "order_method",
      label: "Order Method",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status2 status={
              value
            } />
          );
        }
      }
    },
    {
      name: "order_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <>
              <Tooltip title="Action">
                <IconButton
                  onClick={(e) => {
                    actionClick(e, value)
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="accept"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={actionClose}
              >
                <MenuItem onClick={() => actionEdit(value, 1)}>Accept</MenuItem>
                <MenuItem onClick={() => actionEdit(value, -1)}>Reject</MenuItem>
              </Menu>
            </>
          );
        }
      },
    },
  ];
  const actionClick = (event, i) => {
    setSelectedRowIndex(i);
    setAnchorEl(event.currentTarget);
  };

  const actionEdit = (value, state) => {
    if(state == 1) {
      // Set Accept
    } else {
      // Set Reject
    }
  }
  
  const actionClose = () => {
    setAnchorEl(null);
  };

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
      // rowsDeleted.data.map((data) => {
      //   const newDeleteId = ReviewData.Review[data.dataIndex].client_id
      //   delete_id.push(newDeleteId)
      // })
      // console.log("deleting Ids===> ", delete_id)
      // delete_id.map((id) => {
      //   // row delete api call
      //   const requestOptions = {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       client_id: id
      //     })
      //   };
      //   fetch(`${SERVER_URL}deleteClient`, requestOptions)
      //     .then(async response => {
      //       const data = await response.json();
      //       console.log("Response Data=============>", data)
      //       // check for error response
      //       if (!response.ok) {
      //         // get error message from body or default to response status
      //         const error = (data && data.message) || response.status;
      //         return Promise.reject(error);
      //       }
      //       return
      //     })
      //     .catch(error => {
      //       notify('Something went wrong!\n' + error)
      //       console.error('There was an error!', error);
      //     });
      // })
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

  return (
    <>
      <PageTitle title="Review Orders" data={dataSource} category="review" history={history} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Review Orders"}
              // data={ReviewData.Review}
              data={dataSource}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </>
  );
}


const mapStateToProps = state => ({
  // Review: state.Review
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // fetchReview: fetchReview
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPage);
