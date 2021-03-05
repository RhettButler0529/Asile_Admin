import React, { useState, useEffect } from "react";
import {
  Grid,
  Toolbar,
  IconButton,
  InputBase,
  Tooltip,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
  Divider, Button,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URL } from "../../common/config";
import CSVReader from "react-csv-reader";
import moment from "moment";


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
          fontSize: ".8125rem",
        },
      },
    },
    MuiTableCell: {
      root: {
        borderColor: "#d3d3d3",
        fontSize: ".8125rem",
      },
      head: {
        paddingTop: "5px",
        paddingBottom: "5px",
      },
    },
  });
  useEffect(() => {
    console.log(scheduleviewData);
    props.fetchScheduleView();
    setDataSource(scheduleviewData.scheduleview);
  }, []);

  const columns = [
    {
      name: "schedule_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "full_name",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "client_entity_name",
      label: "Client Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "schedule_datetime",
      label: "DateTime",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "predicted_time_spent",
      label: "Predicted Time Spent",
      options: {
        filter: true,
        sort: true,
      },
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
          console.log(value);
          return (
            <a href={`${SERVER_URL}upload/${value}`} target="_blank"> {value} </a>
          );
        },
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
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status status={value ? "yes" : "no"} />
          );
        },
      },
    },
    {
      name: "check_in_datetime",
      label: "Present/Absent",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Status status={value != "0000-00-00 00:00:00" ? "yes" : "no"} />
          );
        },
      },
    },
    {
      name: "signature",
      label: "Signature",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value);
          return (
            <a href={`${SERVER_URL}signature/${value}`} target="_blank"> {value} </a>
          );
        },
      },
    },

  ];

  /**
   * Table Action menu event
   * @param {*} event
   * @param {*} i
   */


  const options = {
    filterType: "dropdown",
    pagination: true,
    print: false,
    download: true,
    filter: true,
    responsive: "scroll",
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
    },

  };

  const importCSV = (data) => {
    console.log(data);
    addWithCSV(data);
  };

  const addWithCSV = (data) => {
    for (let i = 1; i < data.length - 1; i++) {
      setTimeout(() => {
        const row = data[i];
        let saveData = {
          user_id: row[0],
          client_id: row[1],
          schedule_datetime: moment(row[2]).format('YYYY-MM-DD hh:mm:ss'),
          predicted_time_spent: row[3],
          reason: row[4],
        };
        const reqOption = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saveData),
        };
        fetch(`${SERVER_URL}createNewSchedule`, reqOption)
          .then(async response => {
            const data = await response.json();
            console.log("Response Data=============>", data);
            // check for error response
            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            } else if (response.schedule_id == "0") {
              notify("This timeframe is already exist.");
              return;
            } else {
              notify("Successfully appended");
            }
          })
          .catch(error => {
            notify("Something went wrong!\n" + error);
            console.error("There was an error!", error);
          });
      }, 500);
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
      <Grid container spacing={1}>
        <Grid item xs={6} md={6} lg={6}></Grid>
        <Grid item xs={4} md={4} lg={4}>
          <CSVReader label="Import CSV: " onFileLoaded={(data) => importCSV(data)} />
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Button variant="outlined" color="primary" onClick={() => {
            window.location.reload();
          }}>
            See Result
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = state => ({
  scheduleview: state.scheduleview,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchScheduleView: fetchScheduleView,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleViewPage);