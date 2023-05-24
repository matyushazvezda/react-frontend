import axios from "axios";

const USER_BASE_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/api/users';


class UserService  {
    getUsers(){
        return axios.get(USER_BASE_REST_API_URL);
    }
}

export default new UserService()
