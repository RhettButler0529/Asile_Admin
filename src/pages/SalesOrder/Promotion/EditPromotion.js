import React, { useState, useEffect } from "react";
import { Grid, Input, IconButton, FormControlLabel, Switch, Divider, Button } from "@material-ui/core";

// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components
import Widget from "../../../components/Widget/Widget";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomCombobox from "../../../components/FormControls/CustomCombobox";
import * as Icons from "@material-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import Notification from "../../../components/Notification/Notification";
import fetchClientView from "../../../services/clientview/ClientViewService";
// import fetchUserView from "../../../services/users/UserViewService";
import { SERVER_URL } from '../../../common/config';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import CustomInput from "../../../components/FormControls/CustomInput";

const positions = [
    toast.POSITION.TOP_LEFT,
    toast.POSITION.TOP_CENTER,
    toast.POSITION.TOP_RIGHT,
    toast.POSITION.BOTTOM_LEFT,
    toast.POSITION.BOTTOM_CENTER,
    toast.POSITION.BOTTOM_RIGHT,
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function EditPromotionPage(props) {
    var classes = useStyles();
    let history = useHistory();
    const [errorToastId, setErrorToastId] = useState(null);
    var [notificationsPosition, setNotificationPosition] = useState(2);
    const [dataSource, setDataSource] = useState([]);
    // const userData = useSelector(state => state.userview);
    // const clientData = useSelector(state => state.clientview);

    // input form datas
    const [state, setState] = useState({
        code: 'AAAAAA',
        typeList: ['PERCENT', 'UNIT', 'TOTAL'],
        type: 'PERCENT',
        amount: 10
    })

    useEffect(() => {
        // props.fetchClientView()
        // props.fetchUserView();
    }, [])

    // const [userList, setUserList] = React.useState([]);

    //Show notification
    const notify = (message) => toast(message);

    //input fields event
    const handleChange = (e, field) => {
        setState({
            ...state,
            [field]: e.target.value,
        })
        // if (field == "type") {
        //     if (clients.filter(item => item.value == e)[0] != null) {
        //         setState({
        //             ...state,
        //             client_name: e,
        //             client_id: clients.filter(item => item.value == e)[0].key
        //         })
        //     }

        // }
    }

    const handleTypeChange = (e, field) => {

        if (field == "type") {
            setState({
                ...state,
                type: e
            })
        }
    }


    const onSave = () => {
        // if (state.code == null || state.code == "") {
        //     notify("Please enter item name.")
        //     return
        // } else {
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             client_id: state.client_id,
        //             // user_id: state.userIDList,
        //         })
        //     };
        //     fetch(`${SERVER_URL}addSalesClient`, requestOptions)
        //         .then(async response => {
        //             const data = await response.json();
        //             console.log("Response Data=============>", data)
        //             // check for error response
        //             if (!response.ok) {
        //                 // get error message from body or default to response status
        //                 const error = (data && data.message) || response.status;
        //                 return Promise.reject(error);
        //             } else if (data.sales_client_id != null) {
        //                 notify("This client is already exist.")
        //                 return
        //             } else if (data.id != 0) {

        //                 handleNotificationCall("shipped");
        //                 setState(() => ({
        //                     client_name: '',
        //                     user_name: "",
        //                     client_id: '',
        //                     user_id: '',
        //                 }))

        //             }

        //         })
        //         .catch(error => {
        //             notify('Something went wrong!\n' + error)
        //             console.error('There was an error!', error);
        //         });
        // }
    }

    const onCancel = () => {
        history.push("/app/salesorder/promotion");
    }

    // const clientList = clients.map(item => {
    //     return item?.value
    // })

    return (
        <>
            <PageTitle title="New Promotion" />
            <Grid container spacing={4}>
                <ToastContainer
                    className={classes.toastsContainer}
                    closeButton={
                        <CloseButton className={classes.notificationCloseButton} />
                    }
                    closeOnClick={false}
                    progressClassName={classes.notificationProgress}
                />
                <Grid item xs={12} md={12}>
                    <Widget title="" disableWidgetMenu>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.formContainer}>
                                <CustomInput req={true} title="Code" value={state.code}
                                    handleChange={(e) => handleChange(e, 'code')} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.formContainer}>
                                <CustomCombobox req={true} name="Type" items={state.typeList} value={state.type}
                                    handleChange={(e) => handleTypeChange(e, 'type')} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.formContainer}>
                                <CustomInput req={true} title={state.type=='TOTAL'?'Amount(Price)':(state.type=="UNIT"?'Amount(units)': 'Amount(%)')} value={state.amount}
                                    handleChange={(e) => handleChange(e, 'amount')} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid item xs={8} md={8} lg={8}></Grid>
                            <Grid item xs={4} md={4} lg={4}>

                                <Grid container spacing={2} className={classes.buttonContainer}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<Icons.Cancel />}
                                            onClick={() => onCancel()}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<Icons.Save />}
                                            onClick={() => onSave()}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
            </Grid>
        </>
    );

    /**
     * Notification Bar Functions
     * @param {*} componentProps
     * @param {*} options
     */
    // #############################################################
    function sendNotification(componentProps, options) {
        return toast(
            <Notification
                {...componentProps}
                className={classes.notificationComponent}
            />,
            options,
        );
    }

    function retryErrorNotification() {
        var componentProps = {
            type: "message",
            message: "Message was sent successfully!",
            variant: "contained",
            color: "success",
        };
        toast.update(errorToastId, {
            render: <Notification {...componentProps} />,
            type: "success",
        });
        setErrorToastId(null);
    }

    function handleNotificationCall(notificationType) {
        var componentProps;

        if (errorToastId && notificationType === "error") return;

        switch (notificationType) {
            case "info":
                componentProps = {
                    type: "feedback",
                    message: "New user feedback received",
                    variant: "contained",
                    color: "primary",
                };
                break;
            case "error":
                componentProps = {
                    type: "message",
                    message: "Message was not sent!",
                    variant: "contained",
                    color: "secondary",
                    extraButton: "Resend",
                    extraButtonClick: retryErrorNotification,
                };
                break;
            default:
                componentProps = {
                    type: "shipped",
                    message: "The item was successfully saved!",
                    variant: "contained",
                    color: "success",
                };
        }

        var toastId = sendNotification(componentProps, {
            type: notificationType,
            position: positions[notificationsPosition],
            progressClassName: classes.progress,
            onClose: notificationType === "error" && (() => setErrorToastId(null)),
            className: classes.notification,
        });

        if (notificationType === "error") setErrorToastId(toastId);
    }

    function changeNotificationPosition(positionId) {
        setNotificationPosition(positionId);
    }
    // #############################################################
    function CloseButton({ closeToast, className }) {
        return <Icons.Close className={className} onClick={closeToast} />;
    }

}

const mapStateToProps = state => ({
    // userview: state.userview,
    clientview: state.clientview
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // fetchUserView: fetchUserView,
    fetchClientView: fetchClientView
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPromotionPage);