import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConcertsService from '../services/ConcertsService';

function EditConcert() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [concert, setConcert] = useState({
    name: '',
    location: '',
    ticketPriceS: 0,
    ticketPriceV: 0,
    date: '',
    time: '',
    musicians: [],
  });

  useEffect(() => {
    fetchConcert();
  }, []);

  const fetchConcert = () => {
    ConcertsService.getConcertById(id).then((res) => {
      const { name, location, ticketPriceS, ticketPriceV, date, time, musicians } = res.data;
      setConcert({
        name,
        location,
        ticketPriceS,
        ticketPriceV,
        date: convertMillisecondsToDate(date),
        time,
        musicians,
      });
    });
  };

  const convertMillisecondsToDate = (milliseconds) => {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setConcert((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedConcert = {
      name: concert.name,
      location: concert.location,
      ticketPriceS: parseFloat(concert.ticketPriceS),
      ticketPriceV: parseFloat(concert.ticketPriceV),
      date: new Date(concert.date).getTime(),
      time: concert.time,
      musicians: concert.musicians,
    };

    ConcertsService.updateConcert(id, updatedConcert).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">Редактирование концерта</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={concert.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Место проведения</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={concert.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticketPriceS">Цена билета</label>
          <input
            type="number"
            className="form-control"
            id="ticketPriceS"
            name="ticketPriceS"
            value={concert.ticketPriceS}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticketPriceV">Цена VIP-билета</label>
          <input
            type="number"
            className="form-control"
            id="ticketPriceV"
            name="ticketPriceV"
            value={concert.ticketPriceV}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={concert.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Время</label>
          <input
            type="text"
            className="form-control"
            id="time"
            name="time"
            value={concert.time}
            onChange={handleInputChange}
          />
        </div>
        {/* Render additional form fields for musicians if needed */}
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
}

export default EditConcert;
