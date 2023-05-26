import React, { useEffect, useState } from "react";
import MusiciansService from "../services/MusiciansService";
import { useParams, Link } from "react-router-dom";
import "../MusicianDetails.css";

function MusicianDetails() {
  const [musician, setMusician] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchMusician();
  }, []);

  const fetchMusician = async () => {
    try {
      const response = await MusiciansService.getMusicianById(id);
      setMusician(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!musician) {
    return <div>Loading...</div>;
  }

  return (
    <div className="musician-details">
      <h2 className="musician-details__name">{musician.firstName} {musician.lastName}</h2>
      <p className="musician-details__bio">{musician.bio}</p>
      <p className="musician-details__music-style">Music Style: {musician.musicStyle}</p>
      <Link to={`/edit-musician/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="edit-button">Редактировать</Link>
    </div>
  );
}

export default MusicianDetails;
