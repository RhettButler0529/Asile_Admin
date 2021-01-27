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
import { SERVER_URL } from '../../../common/config';
import fetchCompany from "../../../services/company/CompanyService";
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
    const companyData = useSelector(state => state.company);

    // input form datas
    const update_id = props.match.params.promotion
    const [state, setState] = useState({
        promotion_id: update_id,
        code: '',
        typeList: ['PERCENT', 'UNIT', 'TOTAL'],
        type: 'PERCENT',
        amount: '',
        company_entity_name: '',
        company_id: '',
        companyIDList: localStorage.getItem('company_id').split(', '),
    })
    useEffect(() => {
        props.fetchCompany();
        console.log(companyData)
        setDataSource(companyData.company);
        getPromotion(update_id)

    }, [])

    const getPromotion = (update_id) => {
        let body = {
            promotion_id: update_id
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch(`${SERVER_URL}getPromotionsbyId`, requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setState({
                    ...state,
                    code: data.code,
                    type: data.type,
                    amount: data.amount,
                    company_id: data.company_id,
                    company_entity_name: data.company_entity_name
                })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    //Show notification
    const notify = (message) => toast(message);
    const objArray2Array = (original) => {
        console.log('originall ====> ', state.companyIDList)
        let tmp = [];
        if (Boolean(original)) {
            if (original.length) {
                original.map(item => {
                    if (state.companyIDList.includes(item.company_id.toString()))
                        tmp.push(item?.company_entity_name);
                })
                console.log('Temp==> ', tmp)
                return tmp;
            }
            return [];
        } else {
            return []
        }
    }
    const companies = objArray2Array(companyData.company)

    const setCompanyIdfromCompanyName = (company_entity_name) => {
        let object = companyData.company.filter(item => item.company_entity_name == company_entity_name)
        if (object[0] != null) {
            setState({
                ...state,
                company_id: object[0].company_id.toString()
            })
        }

    }
    //input fields event
    const handleChange = (e, field) => {
        if (field == 'company_entity_name') {
            setCompanyIdfromCompanyName(e)
            setState(prevState => ({
                ...prevState, [field]: e
            }))
        } else {
            if (state.type == "PERCENT") {
                if (Number(e.target.value) > 100) {
                    notify("This field should smaller than 100.")
                } else {
                    setState({
                        ...state,
                        [field]: e.target.value,
                    })
                }
            } else {
                setState({
                    ...state,
                    [field]: e.target.value,
                })
            }
        }


    }

    const handleTypeChange = (e, field) => {

        if (field == "type") {
            setState({
                ...state,
                type: e
            })
        }
    }


    const onSaveandNew = () => {
        if (state.code == null || state.code == "") {
            notify("Please enter item name.")
            return
        } else if (state.amount == null || state.amount == '') {
            notify("Please enter amount.")
            return
        } else if (state.company_entity_name == null || state.company_entity_name == '') {
            notify("Please select company.")
            return
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    promotion_id: update_id,
                    code: state.code,
                    type: state.type,
                    amount: state.amount,
                    company_id: state.company_id
                })
            };
            fetch(`${SERVER_URL}updatePromotion`, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log("Response Data=============>", data)
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else if (data.promotion_id == 0) {
                        notify("This promotion code is already exist.")
                        return
                    } else if (data.promotion_id != 0) {

                        handleNotificationCall("shipped");
                    }

                })
                .catch(error => {
                    notify('Something went wrong!\n' + error)
                    console.error('There was an error!', error);
                });
        }
    }

    const onCancel = () => {
        history.push("/app/salesorder/promotion");
    }

    return (
        <>
            <PageTitle title="Edit Promotion" />
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
                            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.formContainer}>
                                <CustomInput req={true} title="Code" value={state.code}
                                    handleChange={(e) => handleChange(e, 'code')} />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.formContainer}>
                                <CustomCombobox req={true} name="Type" items={state.typeList} value={state.type}
                                    handleChange={(e) => handleTypeChange(e, 'type')} />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.formContainer}>
                                <CustomInput req={true} title={state.type == 'TOTAL' ? 'Amount(Price)' : (state.type == "UNIT" ? 'Amount(units)' : 'Amount(%)')} value={state.amount}
                                    handleChange={(e) => handleChange(e, 'amount')} />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.formContainer}>
                                <CustomCombobox req={true} name="Company Name" items={companies} value={state.company_entity_name}
                                    handleChange={(e) => handleChange(e, 'company_entity_name')} />
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
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<Icons.Save />}
                                            onClick={() => onSaveandNew()}
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
)(EditPromotionPage);