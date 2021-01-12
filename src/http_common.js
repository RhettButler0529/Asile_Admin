import axios from "axios";
import { SERVER_URL } from './common/config'

export default axios.create({
  baseURL: 'http://admin.asile.id:4000',
  headers: {
    "Content-Type": "application/json"
  }
});
// export default axios.create({
//   baseURL: 'http://localhost:4000',
//   headers: {
//     "Content-Type": "application/json"
//   }
// });