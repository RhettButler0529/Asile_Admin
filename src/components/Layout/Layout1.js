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
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar1";

// pages

// context
import { useLayoutState } from "../../context/LayoutContext";
import { Grid } from "@material-ui/core";
import Error from "../../pages/error/Error";
import UserViewPage from "../../pages/UserView/UserView";
import ScheduleViewPage from "../../pages/ScheduleView/ScheduleView";
import ClientViewPage from "../../pages/ClientView/Client";
import AddClientPage from "../../pages/ClientView/AddClient";
import EditClientPage from "../../pages/ClientView/EditClient";
import SalesViewPage from "../../pages/SalesView/Sales";
import EditSalesPage from "../../pages/SalesView/EditSales";
import AddSalesPage from "../../pages/SalesView/AddSales";
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
          <div className={classnames(classes.mainContainer, {
            [classes.padding1600]: matches1600,
            [classes.padding1800]: matches1800,
          }
          )}>
            <Grid>
              <Switch>
                
                <Route exact path="/app/userview" component={UserViewPage} />
                <Route
                  exact
                  path="/app"
                  render={() => <Redirect to="/app/userview" />}
                />
                <Route exact path="/app/scheduleview" component={ScheduleViewPage} />
                <Route exact path="/app/clientview" component={ClientViewPage} />
                <Route exact path="/app/clientview/add" component={AddClientPage} />
                <Route exact path="/app/clientview/:clientview/edit" component={EditClientPage} />
                <Route exact path="/app/salesview" component={SalesViewPage} />
                <Route exact path="/app/salesview/:salesview/edit" component={EditSalesPage} />
                <Route exact path="/app/salesview/add" component={AddSalesPage} />
                
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
