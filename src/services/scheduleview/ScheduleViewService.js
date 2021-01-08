import { fetchScheduleViewRequest, fetchScheduleViewSuccess, fetchScheduleViewError } from "../../redux/actions/ScheduleViewAction";
import { SERVER_URL } from "../../common/config";
// import ScheduleViewReducer from "../../redux/reducers/ScheduleViewReducer";

function fetchScheduleView() {
    return dispatch => {
        dispatch(fetchScheduleViewRequest());
        const body = { company_id: localStorage.getItem('company_id') };
        setTimeout(() => {
            fetch(`${SERVER_URL}getScheduleByCompanyId`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchScheduleViewSuccess(res));
                console.log("Get Schedule===>", res)
                return res;
            })
            .catch(error => {
                dispatch(fetchScheduleViewError(error));
            })
        }, 1000);
        
    }
}

export default fetchScheduleView;