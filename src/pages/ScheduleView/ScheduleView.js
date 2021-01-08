import React, { useState, useEffect } from "react";
import { Grid, Toolbar, IconButton, InputBase, Tooltip, FormControlLabel, Switch, Menu, MenuItem, Divider } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Status from "../../components/Status/Status";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import fetchScheduleView from "../../services/scheduleview/ScheduleViewService";
import { bindActionCreators } from "redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../common/config';


function ScheduleViewPage(props) {
  var classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);   // Table action menu
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const scheduleviewData = useSelector(state => state.scheduleview);

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
  useEffect(() => {
    console.log(scheduleviewData)
    props.fetchScheduleView();
    setDataSource(scheduleviewData.scheduleview);
  }, [])

  const columns = [
    {
      name: "schedule_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "full_name",
      label: "Full Name",
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
    {
      name: "schedule_datetime",
      label: "DateTime",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "predicted_time_spent",
      label: "Predicted Time Spent",
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
      },
    },
    {
      name: "upload_picture",
      label: "Upload",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value)
          return (
            <a href={value} target="_blank"> {value} </a>
          );
        }
      },
    },
    {
      name: "check_in_datetime",
      label: "Check In",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "check_out_datetime",
      label: "Check Out",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "reason",
      label: "Visiting Reason",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "isLate",
      label: "Late",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status status={value ? "yes" : "no"} />
          );
        }
      },
    },
    {
      name: "check_in_datetime",
      label: "Present/Absent",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status status={value != "0000-00-00 00:00:00"? "yes" : "no"} />
          );
        }
      },
    },
    {
      name: "signature",
      label: "Signature",
      options: {
        filter: true,
        sort: true,
      },
    },

  ];

  /**
   * Table Action menu event
   * @param {*} event 
   * @param {*} i 
   */


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
    selectableRows: false,
    onTableChange: (action, tableState) => {
      console.log(action, tableState);
      let tmp = [];
      tableState.data.map((item, i) => {
        tmp.push(item.data);
      });
      console.log(tmp);
    }

  };



  return (
    <>
      <PageTitle title="Schedules" data={dataSource} history={history} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Schedules"}
              data={scheduleviewData.scheduleview}
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
  scheduleview: state.scheduleview
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchScheduleView: fetchScheduleView
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleViewPage);