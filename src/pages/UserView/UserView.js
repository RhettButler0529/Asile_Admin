import React, { useState, useEffect } from "react";
import { Grid, Toolbar, IconButton, InputBase, Tooltip, Switch, Menu, MenuItem, Divider } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import BackdropLoading from "../../components/Loading/BackdropLoading";
import { bindActionCreators } from "redux";
import fetchUserView from "../../services/users/UserViewService";
import { useUserState } from "../../context/UserContext";


function UserViewPage(props) {
  var classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);   // Table action menu
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const userviewData = useSelector(state => state.userview);

  //loading image
  const [open, setOpen] = useState(false);
  let user = useUserState();

  useEffect(() => {
    props.fetchUserView();
    setDataSource(userviewData.userview);     // from backend(redux)
    // setDataSource(data);
  }, [])

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          paddingTop: "5px",
          paddingBottom: "5px",
          fontSize: '.8125rem',
          height: '50px'
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
      name: "user_id",
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
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "phone_number",
      label: "Phone Number",
      options: {
        filter: true,
        sort: true,
      }
    },
  ];

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
    },
    onRowsDelete: (rowsDeleted) => {

    },
  };

  if (userviewData.loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <PageTitle title="Users" data={dataSource} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Users"}
              data={userviewData.userview}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
      <BackdropLoading open={open} />
    </>
  );
}

const mapStateToProps = state => ({
  userview: state.userview
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserView: fetchUserView
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);
