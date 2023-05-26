import { useEffect, useState } from 'react';
import MusiciansService from '../services/MusiciansService';
import { useNavigate, useParams } from 'react-router-dom';

function EditMusician() {
  const { id } = useParams();
  const [musician, setMusician] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMusician();
  }, []);

  const fetchMusician = () => {
    MusiciansService.getMusicianById(id).then((response) => {
      setMusician(response.data);
    });
  };
  
  const handleDelete = () => {
    MusiciansService.deleteMusician(id)
      .then((response) => {
        navigate('/musicians');
      })
      .catch((error) => {
        // Обработка ошибки при удалении
      });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    MusiciansService.updateMusician(id, musician)
      .then((response) => {
        navigate('/musicians');
      })
      .catch((error) => {
      });
  };

  if (!musician) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container"> 
      <h2>Редактирование музыканта</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group"> 
          <label htmlFor="firstName">Имя:</label>
          <input
            type="text"
            className="form-control" 
            id="firstName"
            value={musician.firstName}
            onChange={(e) => setMusician({ ...musician, firstName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Фамилия:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={musician.lastName}
            onChange={(e) => setMusician({ ...musician, lastName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Биография:</label>
          <textarea
            className="form-control"
            id="bio"
            value={musician.bio}
            onChange={(e) => setMusician({ ...musician, bio: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="musicStyle">Музыкальный стиль:</label>
          <input
            type="text"
            className="form-control"
            id="musicStyle"
            value={musician.musicStyle}
            onChange={(e) => setMusician({ ...musician, musicStyle: e.target.value })}
          />
        </div>
        <div className="form-group mt-3">
        <button type="submit" class="btn btn-outline-dark">Сохранить</button> 
        </div>
        <div className="form-group mt-3">
        <button type="button" className="btn btn-outline-danger" onClick={handleDelete}> Удалить </button> 
        </div>
      </form>
    </div>
  );
}

export default EditMusician;
