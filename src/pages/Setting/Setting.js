import React, { useState, useEffect } from "react";
import { Grid, Input, IconButton, FormControlLabel, Switch, Divider, Button } from "@material-ui/core";

// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomInput from "../../components/FormControls/CustomInput";
import CustomCombobox from "../../components/FormControls/CustomCombobox";
import * as Icons from "@material-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import Notification from "../../components/Notification/Notification";
import fetchCompany from "../../services/company/CompanyService";
import { SERVER_URL } from '../../common/config';

const positions = [
    toast.POSITION.TOP_LEFT,
    toast.POSITION.TOP_CENTER,
    toast.POSITION.TOP_RIGHT,
    toast.POSITION.BOTTOM_LEFT,
    toast.POSITION.BOTTOM_CENTER,
    toast.POSITION.BOTTOM_RIGHT,
];

function SettingPage(props) {
    var classes = useStyles();
    let history = useHistory();
    const [errorToastId, setErrorToastId] = useState(null);
    var [notificationsPosition, setNotificationPosition] = useState(2);
    const companyData = useSelector(state => state.company);

    //Show notification
    const notify = (message) => toast(message);

    // input form datas
    const [state, setState] = useState({
        comapny_id: '',
        company_entity_name: '',
        companyList: [
            {
                comapny_id: 1,
                company_entity_name: 'CompanyA'
            },
            {
                comapny_id: 2,
                company_entity_name: 'CompanyB'
            }
        ],
        sales_target: 0
    })

    const companies = [
        "CompanyA",
        "CompanyB"
    ]
    // () => {
    //     let list = [];
    //     state.companyList.map(item => {
    //         list.push(item.company_entity_name)
    //     })
    //     return list;
    // }
    // const update_id = props.match.params.company
    // useEffect(() => {
    //     getCompanyInfo(update_id)
    // }, [])


    // const getCompanyInfo = (company_id) => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             company_id: company_id
    //         })
    //     };
    //     fetch(`${SERVER_URL}getCompanyById`, requestOptions)
    //         .then(async response => {
    //             const data = await response.json();
    //             console.log("Response Data=============>", data)
    //             // check for error response
    //             if (!response.ok) {
    //                 // get error message from body or default to response status
    //                 const error = (data && data.message) || response.status;
    //                 return Promise.reject(error);
    //             }
    //             setState(() => ({
    //                 ...state,
    //                 entity_name: data.company_entity_name,
    //                 owner_name: data.company_owner_name,
    //                 address: data.address,
    //                 phone_number: data.phone_number,
    //                 time_limit_per_schedule: data.time_limit_per_schedule,
    //                 late_policy: data.late_policy,
    //                 min_schedule_time: data.min_schedule_time,
    //                 max_schedule_time: data.max_schedule_time,
    //                 notes: data.notes,
    //                 upload: data.upload,
    //                 company_infoList: data.company_info
    //             }))
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }


    // const updateCompanyInfo = (company_id) => {

    //     console.log("========", state.company_info)
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             company_id: company_id,
    //             company_entity_name: state.entity_name,
    //             company_owner_name: state.owner_name,
    //             address: state.address,
    //             phone_number: state.phone_number,
    //             notes: state.notes,
    //             upload: state.upload,
    //             time_limit_per_schedule: state.time_limit_per_schedule,
    //             late_policy: state.late_policy,
    //             min_schedule_time: state.min_schedule_time,
    //             max_schedule_time: state.max_schedule_time,
    //             company_info: state.company_info.length == 0 ? state.company_infoList : state.company_info.join(', ')
    //         })
    //     };
    //     fetch(`${SERVER_URL}updateCompany`, requestOptions)
    //         .then(async response => {
    //             const data = await response.json();
    //             console.log("Response Data=============>", data)
    //             // check for error response
    //             if (!response.ok) {
    //                 // get error message from body or default to response status
    //                 const error = (data && data.message) || response.status;
    //                 return Promise.reject(error);
    //             }
    //             handleNotificationCall("shipped");
    //         })
    //         .catch(error => {
    //             handleNotificationCall("error");
    //             console.error('There was an error!', error);
    //         });
    // }


    //input fields event
    const handleChange = (e, field) => {
        let comboFields = ['company_entity_name'];
        if (comboFields.includes(field)) {
            // setCompanyIdfromCompanyName(e)
            setState(prevState => ({
                ...prevState, [field]: e
            }))
        } else {
            const { name, value } = e.target;
            setState(prevState => ({
                ...prevState, [field]: value
            }))
        }
    }

    const onSave = () => {
        if (state.company_entity_name == null || state.company_entity_name == "") {
            notify("Please enter company entity name.")
            return
        } else if (state.sales_target == null || state.sales_target == "") {
            notify("Please enter sales target.")
            return
        } else {
            // updateCompanyInfo(update_id)
        }
    }

    const onCancel = () => {
        history.push("/app/salesorder_report");
    }

    return (
        <>
            <PageTitle title="Setting" />
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
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6} lg={3} className={classes.formContainer}>
                                <CustomCombobox req={true} name="Company Name" items={companies} value={state.company_entity_name}
                                    handleChange={(e) => handleChange(e, 'company_entity_name')} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={3} className={classes.formContainer}>
                                <CustomInput title="Sales Target" value={state.sales_target} handleChange={(e) => handleChange(e, 'sales_target')} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Grid container spacing={2} className={classes.buttonContainer}>
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
    company: state.company
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCompany: fetchCompany
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingPage);