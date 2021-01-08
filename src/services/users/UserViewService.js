import { fetchUserViewRequest, fetchUserViewSuccess, fetchUserViewError } from "../../redux/actions/UserViewAction";
import { SERVER_URL } from "../../common/config";

function fetchUserView() {
    console.log('fetching Users ...')
    return dispatch => {
        dispatch(fetchUserViewRequest());
        const body = { company_id: localStorage.getItem('company_id') };
        setTimeout(() => {
            fetch(`${SERVER_URL}getUserById`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        throw (res.error);
                    }
                    dispatch(fetchUserViewSuccess(res));
                    return res;
                })
                .catch(error => {
                    dispatch(fetchUserViewError(error));
                })
        }, 1000);

    }
}

export default fetchUserView;