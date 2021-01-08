import { fetchSalesClientViewRequest, fetchSalesClientViewSuccess, fetchSalesClientViewError } from "../../redux/actions/SalesClientViewAction";
import { SERVER_URL } from "../../common/config";
import SalesReducer from "../../redux/reducers/SalesReducer";

function fetchSalesClientView() {
    return dispatch => {
        dispatch(fetchSalesClientViewRequest());
        let body = {
            company_id: localStorage.getItem('company_id')
        }
        setTimeout(() => {
            fetch(`${SERVER_URL}getSalesClientByCompanyId`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchSalesClientViewSuccess(res));
                console.log("Get SalesClientView===>", res)
                return res;
            })
            .catch(error => {
                dispatch(fetchSalesClientViewError(error));
            })
        }, 1000);
        
    }
}

export default fetchSalesClientView;