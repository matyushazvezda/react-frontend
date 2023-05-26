import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MusiciansService from '../services/MusiciansService';
import '../MusiciansList.css';

function MusiciansList() {
  const [musicians, setMusicians] = useState([]);

  useEffect(() => {
    fetchMusicians();
  }, []);

  const fetchMusicians = () => {
    MusiciansService.getMusicians().then((response) => {
      setMusicians(response.data);
    });
  };

  return (
    <div className="musicians-list">
      <h2 className="list-heading">Musicians List</h2>
      {musicians.map((musician) => (
        <div className="musician-card" key={musician.id}>
          <Link to={`/musicians/${musician.id}`} className="musician-name">
            <h3>{musician.firstName} {musician.lastName}</h3>
          </Link>
          <p className="musician-info">Bio: {musician.bio}</p>
          <p className="musician__music-style">Music Style: {musician.musicStyle}</p>
        </div>
      ))}
    </div>
  );
}

export default MusiciansList;
