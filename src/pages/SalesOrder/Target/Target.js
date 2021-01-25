import React, { useState, useEffect } from "react";
import { Grid, Button, IconButton, InputBase, Tooltip, FormControlLabel, Typography, Menu, MenuItem, Divider } from "@material-ui/core";
import CustomCombobox from "../../../components/FormControls/CustomCombobox";
// styles
import useStyles from "./styles";

// components
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { useSelector, connect } from "react-redux";
// import fetchSalesClientView from "../../services/salesview/SalesClientViewService";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../../common/config';
import TotalWidget from "./components/TotalWidget/TotalWidget";
// import DoughnutWidget from "./components/DoughnutWidget/DoughnutWidget";
import CompanyTarget from './CompanyTarget'
import ItemTarget from './ItemTarget'

function TargetPage(props) {
  let history = useHistory();
  const [activate, setActivate] = useState(true)
  const [company, setCompany] = useState('Default')
  const [item, setItem] = useState('Default')
  const companyList = [
    'Default',
    'CompanyA',
    'CompanyB',
    'CompanyC'
  ]

  const itemList = [
    'Default',
    'ItemA',
    'ItemB',
    'ItemC'
  ]

  const handleCompanyChange = (e, field) => {
    if (field == 'company') {
      setCompany(e)
    }
  }

  const handleItemChange = (e, field) => {
    if (field == 'item') {
      setItem(e)
    }
  }

  return (
    <>

      <div>
        <Grid container spacing={1} >
          <Grid item
            lg={3}
            md={3}
            sm={3}
            xs={12}>
            <Typography variant="h3" size="sm" color="initial" weight="bold">
              Sales Target
            </Typography>
          </Grid>
          <Grid item
            lg={6}
            md={6}
            sm={6}
            xs={12}>
          </Grid>
          <Grid item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            style={{ display: 'flex' }}
          >
            <Grid item>
              <Button
                variant={!activate ? "outlined" : "contained"}
                size="large"
                color="primary"
                style={{ margin: 5 }}
                // startIcon={iconVar[item]}
                onClick={() => {
                  setActivate(true);
                  setItem("Default")
                }}
              >
                Company
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={activate ? "outlined" : "contained"}
                size="large"
                color="primary"
                style={{ margin: 5 }}
                // startIcon={iconVar[item]}
                onClick={() => {
                  setActivate(false);
                  setCompany("Default")
                }}
              >
                Item
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={1} >
          <Grid item
            lg={3}
            md={3}
            sm={3}
            xs={12}>
            {
              activate ? <CustomCombobox req={true} name="Company"
                items={companyList} value={company}
                handleChange={(e) => handleCompanyChange(e, 'company')}
              /> : <CustomCombobox req={true} name="Item"
                items={itemList} value={item}
                handleChange={(e) => handleItemChange(e, 'item')}
                />
            }

          </Grid>
          <Grid item
            lg={6}
            md={6}
            sm={6}
            xs={12}>
          </Grid>
          <Grid item
            lg={3}
            md={3}
            sm={3}
            xs={12}
          >
            <Button
              variant={'outlined'}
              size="large"
              color="primary"
              style={{ marginTop: 10, marginLeft: 10 }}
              // startIcon={iconVar[item]}
              onClick={() => {
                history.push('/app/salesorder/setting')
              }}
            >
              Setting
              </Button>

          </Grid>
        </Grid>
      </div>
      {
        (company == "Default" && item == 'Default') ? null : <Grid container spacing={8}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TotalWidget title="Sales Target" />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TotalWidget title="Current Total Sales" />
          </Grid>
        </Grid>
      }
      {
        activate ? <CompanyTarget /> : <ItemTarget />
      }



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
)(TargetPage);

