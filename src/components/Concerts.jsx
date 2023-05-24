import React, { Component } from 'react';
import ConcertsService from '../services/ConcertsService';

function convertMillisecondsToDate(milliseconds) {
  return new Date(milliseconds);
}

class Concerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concerts: []
    };
  }

  componentDidMount() {
    this.fetchConcerts();
  }

  fetchConcerts() {
    ConcertsService.getConcerts().then((res) => {
      this.setState({ concerts: res.data });
    });
  }

  render() {
    const { concerts } = this.state;

    return (
      <div className="container">
        <h2 className="text-center">Список концертов</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Название</th>
                  <th className="text-center">Место проведения</th>
                  <th className="text-center">Цена билета </th>
                  <th className="text-center">Цена vip-билета</th>
                  <th className="text-center">Дата</th>
                  <th className="text-center">Время</th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((concert) => (
                  <tr key={concert.id}>
                    <td className="text-center">{concert.name}</td>
                    <td className="text-center">{concert.location}</td>
                    <td className="text-center">{concert.ticketPriceS}</td>
                    <td className="text-center">{concert.ticketPriceV}</td>
                    <td className="text-center">{convertMillisecondsToDate(concert.date).toLocaleDateString()}</td>
                    <td className="text-center">{concert.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Concerts;
