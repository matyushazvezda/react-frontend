import axios from "axios";

const Concert_REST_API_URL = 'http://localhost:8080/my_project-1.0-SNAPSHOT/api/concerts';


class ConcertsService  {
    getConcerts(){
        return axios.get(Concert_REST_API_URL);
    }
    getConcertById(id) {
        return axios.get(`${Concert_REST_API_URL}/${id}`);
      }
      createConcert(concertData) {
        return axios.post(Concert_REST_API_URL, concertData);
      }
      deleteConcert(id) {
        return axios.delete(`${Concert_REST_API_URL}/${id}`);
      }

      updateConcert(id, concertData) {
  return axios.post(`${Concert_REST_API_URL}/${id}`, concertData);
}
}

export default new ConcertsService()
