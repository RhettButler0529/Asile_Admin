import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon,
  AssessmentOutlined,
  AccountCircleOutlined,
  PeopleAltOutlined,
  TransferWithinAStationOutlined,
  TimerOutlined,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import SpellcheckOutlinedIcon from '@material-ui/icons/SpellcheckOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

//logo
import logo from "../../assets/images/logo.png";
// import biglogo from "../../assets/images/biglogo.jpg";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { Typography } from "../Wrappers/Wrappers";

const structure = localStorage.getItem('allow_so') != 0 ? [
  {
    id: 0,
    label: "User",
    link: "/app/userview",
    icon: <AccountCircleOutlined fontSize="small" />,
  },
  {
    id: 1,
    label: "CRM",
    link: "/app/clientview",
    icon: <PeopleAltOutlined fontSize="small" />,
    children: [
      {
        label: "Clients",
        link: "/app/clientview",
        icon: <VisibilityOutlinedIcon fontSize="small" />,
      },
      {
        label: "Sales Client",
        link: "/app/salesview",
        icon: <TransferWithinAStationOutlined fontSize="small" />,
      },
    ]
  },
  {
    id: 2,
    label: "Inventory",
    link: "/app/salesorder/group",
    icon: <BusinessOutlinedIcon fontSize="small" />,
    children: [
      {
        label: "Category",
        link: "/app/salesorder/group",
        icon: <SpellcheckOutlinedIcon fontSize="small" />,
      },
      {
        label: "Items Database",
        link: "/app/salesorder/item",
        icon: <StorageOutlinedIcon fontSize="small" />,
      },
    ]
  },
  {
    id: 7,
    label: "Promotions",
    link: "/app/salesorder/promotion",
    icon: <LocalOfferOutlinedIcon fontSize="small" />,
  },
  {
    id: 3,
    label: "Sales Target",
    link: "/app/salesorder/itemcategory",
    icon: <TrendingUpOutlinedIcon fontSize="small" />,
    children: [
      {
        label: "Item Categories",
        link: "/app/salesorder/itemcategory",
        icon: <SpellcheckOutlinedIcon fontSize="small" />,
      },
      {
        label: "Company Users",
        link: "/app/salesorder/companyusers",
        icon: <StorageOutlinedIcon fontSize="small" />,
      }
    ]
  },
  {
    id: 4,
    label: "Schedule",
    link: "/app/scheduleview",
    icon: <TimerOutlined fontSize="small" />,
  },
  {
    id: 6,
    label: "Sales Order",
    link: "/app/salesorder/review",
    icon: <ShoppingCartOutlinedIcon fontSize="small" />,
    children: [
      {
        label: "Review Orders",
        link: "/app/salesorder/review",
        icon: <VisibilityOutlinedIcon fontSize="small" />,
      },
      {
        label: "Orders History",
        link: "/app/salesorder/history",
        icon: <HistoryOutlinedIcon fontSize="small" />,
      },
    ],
  },
  {
    id: 5,
    label: "Report",
    link: "/app/schedule_report",
    icon: <AssessmentOutlined fontSize="small" />,
    children: [
      {
        label: "Schedules Report",
        link: "/app/schedule_report",
        icon: <VisibilityOutlinedIcon fontSize="small" />,
      },
      {
        label: "Sales Order Report",
        link: "/app/salesorder_report",
        icon: <HistoryOutlinedIcon fontSize="small" />,
      }
    ]
  },

] : [
    {
      id: 0,
      label: "User",
      link: "/app/userview",
      icon: <AccountCircleOutlined fontSize="small" />,
    },
    {
      id: 1,
      label: "CRM",
      link: "/app/clientview",
      icon: <PeopleAltOutlined fontSize="small" />,
      children: [
        {
          label: "Clients",
          link: "/app/clientview",
          icon: <VisibilityOutlinedIcon fontSize="small" />,
        },
        {
          label: "Sales Client",
          link: "/app/salesview",
          icon: <TransferWithinAStationOutlined fontSize="small" />,
        },
      ]
    },
    // {
    //   id: 2,
    //   label: "Inventory",
    //   link: "/app/salesorder/group",
    //   icon: <BusinessOutlinedIcon fontSize="small" />,
    //   children: [
    //     {
    //       label: "Category",
    //       link: "/app/salesorder/group",
    //       icon: <SpellcheckOutlinedIcon fontSize="small" />,
    //     },
    //     {
    //       label: "Items Database",
    //       link: "/app/salesorder/item",
    //       icon: <StorageOutlinedIcon fontSize="small" />,
    //     },
    //   ]
    // },
    // {
    //   id: 6,
    //   label: "Promotions",
    //   link: "/app/salesorder/promotion",
    //   icon: <LocalOfferOutlinedIcon fontSize="small" />,
    // },
    // {
    //   id: 3,
    //   label: "Sales Target",
    //   link: "/app/salesorder/itemcategory",
    //   icon: <TrendingUpOutlinedIcon fontSize="small" />,
    //   children: [
    //     {
    //       label: "Item Categories",
    //       link: "/app/salesorder/itemcategory",
    //       icon: <SpellcheckOutlinedIcon fontSize="small" />,
    //     },
    //     {
    //       label: "Company Users",
    //       link: "/app/salesorder/companyusers",
    //       icon: <StorageOutlinedIcon fontSize="small" />,
    //     }
    //   ]
    // },
    {
      id: 4,
      label: "Schedule",
      link: "/app/scheduleview",
      icon: <TimerOutlined fontSize="small" />,
    },
    {
      id: 5,
      label: "Report",
      link: "/app/schedule_report",
      icon: <AssessmentOutlined fontSize="small" />,
      children: [
        {
          label: "Schedules Report",
          link: "/app/schedule_report",
          icon: <VisibilityOutlinedIcon fontSize="small" />,
        },
        // {
        //   label: "Sales Order Report",
        //   link: "/app/salesorder_report",
        //   icon: <HistoryOutlinedIcon fontSize="small" />,
        // }
      ]
    },

  ];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // global
  var layoutState = useLayoutState();
  // var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames(classes.drawerPaper, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >


      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            style={{ color: 'white' }}
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
      <div style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
        <IconButton style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
          <ArrowBackIcon
            style={{ marginRight: 5 }}
          />
          Log Out
        </IconButton>
      </div>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
