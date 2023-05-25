import React, { useEffect, useState } from 'react';
import ConcertsService from '../services/ConcertsService';
import CreateConcertForm from './CreateConcertForm';

function ConcertsPage() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = () => {
    ConcertsService.getConcerts()
      .then((res) => {
        setConcerts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching concerts:', error);
      });
  };

  return (
    <div>
      <h1>Список концертов</h1>
      {/* Отобразить список концертов */}
      {concerts.map((concert) => (
        <div key={concert.id}>
          <h2>{concert.name}</h2>
          <p>Место проведения: {concert.location}</p>
          {/* Другая информация о концерте */}
        </div>
      ))}
      {/* Отобразить форму создания концерта */}
      <CreateConcertForm />
    </div>
  );
}

export default ConcertsPage;
