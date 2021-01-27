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
import fetchCompany from "../../../services/company/CompanyService";
import { SERVER_URL } from '../../../common/config';
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

function AddItemPage(props) {
    var classes = useStyles();
    let history = useHistory();
    const [errorToastId, setErrorToastId] = useState(null);
    var [notificationsPosition, setNotificationPosition] = useState(2);
    const [dataSource, setDataSource] = useState([]);
    const companyData = useSelector(state => state.company);

    // input form datas
    const [state, setState] = useState({
        company_entity_name: '',
        item_name: "",
        company_id: '',
        category_id: '',
        category_name: '',
        unit_price: '',
        unit: '',
        companyIDList: localStorage.getItem('company_id').split(', '),
        categoryList: [],
        categoryNameList: []
    })

    useEffect(() => {
        props.fetchCompany();
        console.log(companyData)
        setDataSource(companyData.company);
        getGroup()
    }, [])

    const getGroup = () => {
        let body = {
            company_id: localStorage.getItem('company_id')
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch(`${SERVER_URL}getCategoryByCompanyId`, requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("groupdData--> ", data)
                let list = []
                data.map(item => {
                    list.push(item.category_name)
                })
                setState({
                    ...state,
                    categoryList: data,
                    categoryNameList: list
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
                    if(state.companyIDList.includes(item.company_id.toString()))
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

    const setGroupIdfromGroupName = (category_name) => {
        let object = state.categoryList.filter(item => item.category_name == category_name)
        if (object[0] != null) {
            console.log("object[0].category_id==>", object[0].category_id)
            setState({
                ...state,
                category_id: object[0].category_id
            })
        }

    }

    const handleChange = (e, field) => {

        if (field == 'company_entity_name') {
            setCompanyIdfromCompanyName(e)
            setState(prevState => ({
                ...prevState, [field]: e
            }))
        } else if (field == 'category_name') {
            setGroupIdfromGroupName(e)
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

    const onSaveandNew = () => {
        if (state.company_entity_name == null || state.company_entity_name == "") {
            notify("Please enter client name.")
            return
        } else if (state.category_name == null || state.category_name == "") {
            notify("Please enter group name.")
            return
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_name: state.item_name,
                    category_id: state.category_id,
                    company_id: state.company_id,
                    unit_price: state.unit_price,
                    unit: state.unit,
                })
            };
            fetch(`${SERVER_URL}createItem`, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log("Response Data=============>", data)
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else if (data.category_id == 0) {
                        notify("This Item is already exist.")
                        return
                    } else if (data.category_id != 0) {

                        handleNotificationCall("shipped");
                        setState({
                            ...state,
                            company_entity_name: '',
                            item_name: "",
                            category_id: '',
                            category_name: '',
                            unit_price: '',
                            unit: '',
                        })

                    }

                })
                .catch(error => {
                    notify('Something went wrong!\n' + error)
                    console.error('There was an error!', error);
                });
        }

    }

    const onSaveandBack = () => {
        if (state.company_entity_name == null || state.company_entity_name == "") {
            notify("Please enter client name.")
            return
        } else if (state.category_name == null || state.category_name == "") {
            notify("Please enter group name.")
            return
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_name: state.item_name,
                    category_id: state.category_id,
                    company_id: state.company_id,
                    unit_price: state.unit_price,
                    unit: state.unit,
                })
            };
            fetch(`${SERVER_URL}createItem`, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log("Response Data=============>", data)
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else if (data.category_id == 0) {
                        notify("This Item is already exist.")
                        return
                    } else if (data.category_id != 0) {

                        handleNotificationCall("shipped");
                        history.push("/app/salesorder/item");
                    }

                })
                .catch(error => {
                    notify('Something went wrong!\n' + error)
                    console.error('There was an error!', error);
                });
        }

    }

    const onAddDiscount = () => {
        history.push("/app/salesorder/discount/add");
    }

    const onCancel = () => {
        history.push("/app/salesorder/item");
    }

    return (
        <>
            <PageTitle title="New Item" />
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
                            <Grid item xs={8} md={8} lg={8}></Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <Grid container spacing={2} className={classes.buttonContainer}>
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
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.formContainer}>
                                <CustomInput req={true} title="Name" value={state.item_name}
                                    handleChange={(e) => handleChange(e, 'item_name')} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} className={classes.formContainer}>
                                <CustomCombobox req={true} name="Company Name" items={companies} value={state.company_entity_name}
                                    handleChange={(e) => handleChange(e, 'company_entity_name')} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6} md={6} lg={4} className={classes.formContainer}>
                                <CustomCombobox req={true} name="Category Name" items={state.categoryNameList} value={state.category_name}
                                    handleChange={(e) => handleChange(e, 'category_name')} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} className={classes.formContainer}>
                                <CustomInput req={true} title="Unit Price" value={state.unit_price}
                                    handleChange={(e) => handleChange(e, 'unit_price')} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} className={classes.formContainer}>
                                <CustomInput req={true} title="Unit" value={state.unit}
                                    handleChange={(e) => handleChange(e, 'unit')} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={6} lg={6}></Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Grid container spacing={2} className={classes.buttonContainer}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<Icons.Save />}
                                            onClick={() => onSaveandNew()}
                                        >
                                            Save & New
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<Icons.Save />}
                                            onClick={() => onSaveandBack()}
                                        >
                                            Save & Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<Icons.Add />}
                                            onClick={() => onAddDiscount()}
                                        >
                                            Add Discount
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
)(AddItemPage);