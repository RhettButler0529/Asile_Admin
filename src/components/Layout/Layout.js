import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import useMediaQuery from '@material-ui/core/useMediaQuery';

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages

// context
import { useLayoutState } from "../../context/LayoutContext";
import { Grid } from "@material-ui/core";
import Error from "../../pages/error/Error";
import AdminPage from "../../pages/UserManage/Admins/Admins";
import EditAdminPage from "../../pages/UserManage/Admins/EditAdmin";
import AddAdminPage from "../../pages/UserManage/Admins/AddAdmin";
import UserPage from "../../pages/UserManage/Users/Users";
import EditUserPage from "../../pages/UserManage/Users/EditUser";
import AddUserPage from "../../pages/UserManage/Users/AddUser";

import CompanyPage from "../../pages/Companys/Companys";
import AddCompanyPage from "../../pages/Companys/AddCompany";
import EditCompanyPage from "../../pages/Companys/EditCompany";
import ClientsPage from "../../pages/Client/Client";
import AddClientPage from "../../pages/Client/AddClient";
import EditClientPage from "../../pages/Client/EditClient";
import SalesPage from "../../pages/Sales/Sales";
import EditSalesPage from "../../pages/Sales/EditSales";
import AddSalesPage from "../../pages/Sales/AddSales";
import SchedulePage from "../../pages/Schedule/Schedule";
import Footer from "../Footer/Footer";

function Layout(props) {
  var classes = useStyles();
  const matches1600 = useMediaQuery('(min-width:1600px)');
  const matches1800 = useMediaQuery('(min-width:1800px)');

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        {/* <Header history={props.history} /> */}
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
            
          })}
        >
          <Header history={props.history} />
          <div className={classnames(classes.mainContainer,{
            [classes.padding1600]: matches1600,
            [classes.padding1800]: matches1800,
            }
          )}>
            <Grid>
              <Switch>
                <Route exact path="/app/usermanage" component={AdminPage} />
                <Route
                  exact
                  path="/app"
                  render={() => <Redirect to="/app/usermanage/admin" />}
                />
                <Route exact path="/app/usermanage/admin" component={AdminPage} /> 
                <Route exact path="/app/usermanage/admin/:admin/edit" component={EditAdminPage} /> 
                <Route exact path="/app/usermanage/admin/add" component={AddAdminPage} />
                <Route exact path="/app/usermanage/user" component={UserPage} /> 
                <Route exact path="/app/usermanage/user/:user/edit" component={EditUserPage} /> 
                <Route exact path="/app/usermanage/user/add" component={AddUserPage} />
                <Route exact path="/app/company" component={CompanyPage} />
                <Route exact path="/app/company/add" component={AddCompanyPage} />
                <Route exact path="/app/company/:company/edit" component={EditCompanyPage} />
                <Route exact path="/app/client" component={ClientsPage} />
                <Route exact path="/app/client/add" component={AddClientPage} />
                <Route exact path="/app/client/:client/edit" component={EditClientPage} />
                <Route exact path="/app/sales" component={SalesPage} />
                <Route exact path="/app/sales/:sales/edit" component={EditSalesPage} />
                <Route exact path="/app/sales/add" component={AddSalesPage} />
                <Route exact path="/app/schedule" component={SchedulePage} />
                <Route component={Error} />
              </Switch>
            </Grid>
            <Footer />
          </div>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
