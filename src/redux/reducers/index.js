import { combineReducers } from 'redux'
import AdminReducer from './AdminReducer';
import UserReducer from './UserReducer';
import CompanyReducer from './CompanyReducer';
import ClientReducer from './ClientReducer';
import ClientViewReducer from './ClientViewReducer';
import SalesReducer from './SalesReducer';
import ScheduleReducer from './ScheduleReducer'
import UserViewReducer from './UserViewReducer'
import ScheduleViewReducer from './ScheduleViewReducer'
import SalesViewReducer from './SalesViewReducer';

const rootReducer = combineReducers({
    //Super Admin Reducer
    admin: AdminReducer,
    user: UserReducer, 
    company: CompanyReducer, 
    client: ClientReducer,
    sales: SalesReducer,
    schedule: ScheduleReducer,
    //Admin Reducer
    userview: UserViewReducer,
    clientview: ClientViewReducer,
    scheduleview: ScheduleViewReducer,
    salesview: SalesViewReducer,
})

export default rootReducer;