import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ConcertsService from '../services/ConcertsService';
import MusiciansService from '../services/MusiciansService';

function convertMillisecondsToDate(milliseconds) {
  return new Date(milliseconds);
}

function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedConcertId, setSelectedConcertId] = useState(null);
  const [selectedConcert, setSelectedConcert] = useState(null);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = () => {
    ConcertsService.getConcerts().then((res) => {
      setConcerts(res.data);
    });
  };

  const handleSort = (field) => {
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

    setConcerts(sortedConcerts);
    setSortedBy(field);
    setSortOrder(newSortOrder);
  };

  const handleConcertClick = (id) => {
    ConcertsService.getConcertById(id).then((res) => {
      setSelectedConcertId(id);
      setSelectedConcert(res.data);
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">Список концертов</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center" onClick={() => handleSort('name')}>
                  Название {sortedBy === 'name' && <i className={`fas fa-sort-${sortOrder}`} />}
                </th>
                <th className="text-center" onClick={() => handleSort('location')}>
                  Место проведения {sortedBy === 'location' && <i className={`fas fa-sort-${sortOrder}`} />}
                </th>
                <th className="text-center" onClick={() => handleSort('ticketPriceS')}>
                  Цена билета {sortedBy === 'ticketPriceS' && <i className={`fas fa-sort-${sortOrder}`} />}
                </th>
                <th className="text-center" onClick={() => handleSort('ticketPriceV')}>
                  Цена VIP-билета {sortedBy === 'ticketPriceV' && <i className={`fas fa-sort-${sortOrder}`} />}
                </th>
                <th className="text-center" onClick={() => handleSort('date')}>
                  Дата {sortedBy === 'date' && <i className={`fas fa-sort-${sortOrder}`} />}
                </th>
                <th className="text-center" onClick={() => handleSort('time')}>
                  Время {sortedBy === 'time' && <i className={`fas fa-sort-${sortOrder}`} />}
                </th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((concert) => (
                <tr key={concert.id} onClick={() => handleConcertClick(concert.id)}>
                  <td className="text-center">{concert.name}</td>
                  <td className="text-center">{concert.location}</td>
                  <td className="text-center">{concert.ticketPriceS} $</td>
                  <td className="text-center">{concert.ticketPriceV} $</td>
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
          <p>Цена билета: {selectedConcert.ticketPriceS} $</p>
          <p>Цена VIP-билета: {selectedConcert.ticketPriceV} $</p>
          <p>Дата: {convertMillisecondsToDate(selectedConcert.date).toLocaleDateString()}</p>
          <p>Время: {selectedConcert.time}</p>
          <p>Музыканты:</p>
          <ul>
            {selectedConcert.musicians.map((musician) => (
              <li key={musician.id}>
                <Link to={`/musicians/${musician.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{musician.firstName} {musician.lastName}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Concerts;
