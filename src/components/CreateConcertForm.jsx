import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConcertsService from '../services/ConcertsService';
import MusicianInput from './MusicianInput';




function CreateConcertForm() {
    const navigate = useNavigate();
  const [concertData, setConcertData] = useState({
    name: '',
    location: '',
    ticketPriceS: '',
    ticketPriceV: '',
    date: '',
    time: '',
    musicians: [],
  });

  

  const selectedDate = new Date(concertData.date);
  const dateInMilliseconds = selectedDate.getTime();

  const concertDataWithFormattedTime = {
    ...concertData,
    time: concertData.time.split(':').join(''), // Удаление двоеточий из времени
    date: dateInMilliseconds, // Использование миллисекунд для даты
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConcertData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMusicianChange = (index, musicianData) => {
    setConcertData((prevData) => {
      const updatedMusicians = [...prevData.musicians];
      updatedMusicians[index] = musicianData;
      return {
        ...prevData,
        musicians: updatedMusicians,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const concertDataWithFormattedTime = {
      ...concertData,
      //time: concertData.time.split(':').join('')
      date: dateInMilliseconds, // Использование миллисекунд для дат, // Удаление двоеточий из времени
    };

    ConcertsService.createConcert(concertDataWithFormattedTime)
      .then((res) => {
        console.log('Concert created successfully:', res.data);
        navigate('/'); // Перенаправление на начальную страницу
      })
      .catch((error) => {
        console.error('Error creating concert:', error);
      });
  };

  const addMusicianInput = () => {
    setConcertData((prevData) => ({
      ...prevData,
      musicians: [...prevData.musicians, {}],
    }));
  };

  return (
    <div className="container">
      <h2 className="text-center">Форма создания концерта</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Название:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            name="name"
            value={concertData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Место проведения:
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            name="location"
            value={concertData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ticketPriceS" className="form-label">
            Цена билета:
          </label>
          <input
            type="number"
            id="ticketPriceS"
            className="form-control"
            name="ticketPriceS"
            value={concertData.ticketPriceS}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ticketPriceV" className="form-label">
            Цена VIP-билета:
          </label>
          <input
            type="number"
            id="ticketPriceV"
            className="form-control"
            name="ticketPriceV"
            value={concertData.ticketPriceV}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Дата:
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            name="date"
            value={concertData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Время:
          </label>
          <input
            type="text"
            id="time"
            className="form-control"
            name="time"
            value={concertData.time}
            onChange={handleChange}
            required
          />
        </div>
        {concertData.musicians.map((musician, index) => (
          <MusicianInput
            key={index}
            index={index}
            musicianData={musician}
            onMusicianChange={handleMusicianChange}
          />
        ))}
        <button type="button" onClick={addMusicianInput} className="btn btn-primary">
          Добавить музыканта
        </button>
        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </form>
    </div>
  );
}

export default CreateConcertForm;
