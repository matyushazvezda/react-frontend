import axios from "axios";

const Concert_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/api/concerts';


class ConcertsService  {
    getConcerts(){
        return axios.get(Concert_REST_API_URL);
    }
}

export default new ConcertsService()