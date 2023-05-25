import React from 'react';

function MusicianInput({ index, musicianData, onMusicianChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onMusicianChange(index, {
      ...musicianData,
      [name]: value,
    });
  };

  return (
    <div className="mb-3">
      <h4>Музыкант {index + 1}</h4>
      <div className="mb-3">
        <label htmlFor={`musicianFirstName${index}`} className="form-label">
          Имя:
        </label>
        <input
          type="text"
          id={`musicianFirstName${index}`}
          className="form-control"
          name="firstName"
          value={musicianData.firstName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`musicianLastName${index}`} className="form-label">
          Фамилия:
        </label>
        <input
          type="text"
          id={`musicianLastName${index}`}
          className="form-control"
          name="lastName"
          value={musicianData.lastName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`musicianBio${index}`} className="form-label">
          Биография:
        </label>
        <textarea
          id={`musicianBio${index}`}
          className="form-control"
          name="bio"
          value={musicianData.bio || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`musicianMusicStyle${index}`} className="form-label">
          Музыкальный стиль:
        </label>
        <input
          type="text"
          id={`musicianMusicStyle${index}`}
          className="form-control"
          name="musicStyle"
          value={musicianData.musicStyle || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default MusicianInput;
