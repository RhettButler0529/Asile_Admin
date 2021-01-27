import { fetchGroupRequest, fetchGroupSuccess, fetchGroupError } from "../../redux/actions/OrderGroupAction";
import { SERVER_URL } from "../../common/config";
import SalesGroupReducer from "../../redux/reducers/SalesGroupReducer";

function fetchGroup() {
    return dispatch => {
        dispatch(fetchGroupRequest());
        let body = {
            company_id: localStorage.getItem('company_id')
        }
        setTimeout(() => {
            fetch(`${SERVER_URL}getCategoryByCompanyId`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchGroupSuccess(res));
                console.log("Get SalesItem===>", res)
                return res;
            })
            .catch(error => {
                dispatch(fetchGroupError(error));
            })
        }, 1000);
        
    }
}

export default fetchGroup;