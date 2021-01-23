import React, { useState, useEffect } from "react";
import { Grid, Button, IconButton, InputBase, Tooltip, FormControlLabel, Switch, Menu, MenuItem, Divider } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// styles
import useStyles from "./styles";

// components
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
// import fetchSalesClientView from "../../services/salesview/SalesClientViewService";
import { SERVER_URL } from '../../../common/config';

function ItemTarget(props) {
  var classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);   // Table action menu
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataSource, setDataSource] = useState([
    {
      item_id: 1,
      item_name: 'Item Name1',
      sales_name: 'Sales Name1',
      company_entity_name : 'CompanyA',
      client: 'Client1',
      total_units: 300, 
      sold: 250
    },
    {
      item_id: 2,
      item_name: 'Item Name2',
      sales_name: 'Sales Name2',
      company_entity_name : 'CompanyB',
      client: 'Client2',
      total_units: 1000, 
      sold: 600
    }
  ]);
  // const salesviewData = useSelector(state => state.salesview);

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
    // props.fetchSalesClientView()
    // setDataSource(salesviewData.salesview);
  }, [])

  const columns = [
    {
      name: "item_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "item_name",
      label: "Item Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "sales_name",
      label: "Sales Name",
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
      name: "client",
      label: "Client",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "total_units",
      label: "Total Units",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "sold",
      label: "Sold",
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
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Item Target"}
              data={dataSource}
              // data={salesviewData.salesview}
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
  // sales: state.sales
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // fetchSalesClientView: fetchSalesClientView
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTarget);

