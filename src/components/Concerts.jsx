import React, { Component } from 'react';
import ConcertsService from '../services/ConcertsService';

function convertMillisecondsToDate(milliseconds) {
  return new Date(milliseconds);
}

class Concerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concerts: [],
      sortedBy: null,
      sortOrder: 'asc',
      selectedConcertId: null,
      selectedConcert: null,
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

  handleSort = (field) => {
    const { concerts, sortedBy, sortOrder } = this.state;
    let newSortOrder = 'asc';

    if (field === sortedBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    const sortedConcerts = concerts.slice().sort((a, b) => {
      if (field === 'name') {
        if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1;
        if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
      if (field === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (field === 'ticketPriceS' || field === 'ticketPriceV') {
        const priceA = parseFloat(a[field]);
        const priceB = parseFloat(b[field]);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      }
      if (field === 'time') {
        const timeA = a.time;
        const timeB = b.time;
        return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
      }
      return 0;
    });

    this.setState({ concerts: sortedConcerts, sortedBy: field, sortOrder: newSortOrder });
  };

  handleConcertClick = (id) => {
    ConcertsService.getConcertById(id).then((res) => {
      this.setState({ selectedConcertId: id, selectedConcert: res.data });
    });
  };

  render() {
    const { concerts, sortedBy, sortOrder, selectedConcertId, selectedConcert } = this.state;

    return (
      <div className="container">
        <h2 className="text-center">Список концертов</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center" onClick={() => this.handleSort('name')}>
                    Название {sortedBy === 'name' && <i className={`fas fa-sort-${sortOrder}`} />}
                  </th>
                  <th className="text-center" onClick={() => this.handleSort('location')}>
                    Место проведения {sortedBy === 'location' && <i className={`fas fa-sort-${sortOrder}`} />}
                  </th>
                  <th className="text-center" onClick={() => this.handleSort('ticketPriceS')}>
                    Цена билета {sortedBy === 'ticketPriceS' && <i className={`fas fa-sort-${sortOrder}`} />}
                  </th>
                  <th className="text-center" onClick={() => this.handleSort('ticketPriceV')}>
                    Цена VIP-билета {sortedBy === 'ticketPriceV' && <i className={`fas fa-sort-${sortOrder}`} />}
                  </th>
                  <th className="text-center" onClick={() => this.handleSort('date')}>
                    Дата {sortedBy === 'date' && <i className={`fas fa-sort-${sortOrder}`} />}
                  </th>
                  <th className="text-center" onClick={() => this.handleSort('time')}>
                    Время {sortedBy === 'time' && <i className={`fas fa-sort-${sortOrder}`} />}
                  </th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((concert) => (
                  <tr key={concert.id} onClick={() => this.handleConcertClick(concert.id)}>
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
        {selectedConcert && (
          <div>
            <h3>Информация о выбранном концерте:</h3>
            <p>Название: {selectedConcert.name}</p>
            <p>Место проведения: {selectedConcert.location}</p>
            <p>Цена билета: {selectedConcert.ticketPriceS}</p>
            <p>Цена VIP-билета: {selectedConcert.ticketPriceV}</p>
            <p>Дата: {convertMillisecondsToDate(selectedConcert.date).toLocaleDateString()}</p>
            <p>Время: {selectedConcert.time}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Concerts;
