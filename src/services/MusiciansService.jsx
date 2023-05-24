import axios from "axios";

const Musicians_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/api/musicians';

class MusiciansService {
  getMusicians() {
    return axios.get(Musicians_REST_API_URL);
  }

  getMusicianById(id) {
    return axios.get(`${Musicians_REST_API_URL}/${id}`);
  }
}

export default new MusiciansService();
