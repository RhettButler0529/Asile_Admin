import { fetchScheduleRequest, fetchScheduleSuccess, fetchScheduleError } from "../../redux/actions/ScheduleAction";
import { SERVER_URL } from "../../common/config";
// import ScheduleReducer from "../../redux/reducers/ScheduleReducer";

function fetchSchedule() {
    return dispatch => {
        dispatch(fetchScheduleRequest());
        setTimeout(() => {
            fetch(`${SERVER_URL}getSchedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchScheduleSuccess(res));
                console.log("Get Schedule===>", res)
                return res;
            })
            .catch(error => {
                dispatch(fetchScheduleError(error));
            })
        }, 1000);
        
    }
}

export default fetchSchedule;