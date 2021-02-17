import React, { useState, useEffect } from "react";
import { Grid, IconButton, Tooltip, Menu, MenuItem } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import MenuIcon from '@material-ui/icons/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityIcon from '@material-ui/icons/Visibility';
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import fetchSalesReview from "../../services/salesorder/SalesReviewService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../common/config';
import Status3 from "../../components/Status/Status3";
import Status2 from "../../components/Status/Status2";

function ReviewPage(props) {
  let history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);   // Table action menu
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const reviewData = useSelector(state => state.salesreview);

  useEffect(() => {
    console.log(reviewData)
    props.fetchSalesReview()
    setDataSource(reviewData.salesreview);
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
      name: "order_date",
      label: "Order Date",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "due_date",
      label: "Due Date",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "full_name",
      label: "Sales Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "client_entity_name",
      label: "Client Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    // {
    //   name: "order_items",
    //   label: "Items",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    // {
    //   name: "promotions",
    //   label: "Promotion",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    // {
    //   name: "tax",
    //   label: "Tax",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    // {
    //   name: "shipping_cost",
    //   label: "Shipping Cost",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    {
      name: "net_total",
      label: "Total Amount",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "company_entity_name",
      label: "Area",
      options: {
        filter: true,
        sort: true,
      }
    },
    // {
    //   name: "notes",
    //   label: "Notes",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    // {
    //   name: "client_signature",
    //   label: "Client Signature",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       console.log(value)
    //       return (
    //         <a href={`${SERVER_URL}signature/${value}`} target="_blank"> {value} </a>
    //       );
    //     }
    //   }
    // },
    // {
    //   name: "user_signature",
    //   label: "User Signature",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       console.log(value)
    //       return (
    //         <a href={`${SERVER_URL}signature/${value}`} target="_blank"> {value} </a>
    //       );
    //     }
    //   }
    // },
    // {
    //   name: "upload_picture",
    //   label: "Uploaded Picture",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       console.log(value)
    //       return (
    //         <a href={`${SERVER_URL}upload/${value}`} target="_blank"> {value} </a>
    //       );
    //     }
    //   }
    // },
    // {
    //   name: "custom_field",
    //   label: "Custom Field",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    // {
    //   name: "location",
    //   label: "Location",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   }
    // },
    {
      name: "status",
      label: "Order Status",
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
    // {
    //   name: "order_method",
    //   label: "Order Method",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Status2 status={
    //           value
    //         } />
    //       );
    //     }
    //   }
    // },
    {
      name: "order_id",
      label: "View Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          // console.log("==================>", value, tableMeta, updateValue)
          return (
            <>
              <IconButton
                // onClick={(e) => {
                //   actionView(e, value)
                // }}
              >
                <VisibilityIcon style={{ fontSize: '20' }} />
              </IconButton>
            </>
          );
        }
      },
    },
    {
      name: "order_id",
      label: "Accept/Reject",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <>
              <Tooltip title="Accept/Reject">
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
                <MenuItem onClick={() => {
                  actionEdit(value, 1)
                }}>Accept</MenuItem>
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
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: selectedRowIndex,
        status: state
      })
    };
    fetch(`${SERVER_URL}setStatus`, requestOptions)
      .then(async response => {
        const data = await response.json();
        console.log("Response Data=============>", data)
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
        }
        actionClose()
        props.fetchSalesReview()
        setDataSource(reviewData.salesreview);
      })
      .catch(error => {
        notify('Something went wrong!\n' + error)
        console.error('There was an error!', error);
      });
  }

  const actionClose = () => {
    setAnchorEl(null);
  };

  const options = {
    filterType: 'dropdown',
    pagination: true,
    print: false,
    download: false,
    filter: true,
    responsive: 'scroll',
    fixedHeader: false, elevation: 0,
    rowsPerPageOptions: [5, 10, 20],
    resizableColumns: false,
    onRowsDelete: (rowsDeleted) => {

      const delete_id = []
      rowsDeleted.data.map((data) => {
        const newDeleteId = reviewData.salesreview[data.dataIndex].order_id
        delete_id.push(newDeleteId)
      })
      console.log("deleting Ids===> ", delete_id)
      delete_id.map((id) => {
        // row delete api call
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: id
          })
        };
        fetch(`${SERVER_URL}removeOrder`, requestOptions)
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

  return (
    <>
      <PageTitle title="Review Orders" data={dataSource} category="review" history={history} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Review Orders"}
              data={reviewData.salesreview}
              // data={dataSource}
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
  salesreview: state.salesreview
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSalesReview: fetchSalesReview
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPage);
