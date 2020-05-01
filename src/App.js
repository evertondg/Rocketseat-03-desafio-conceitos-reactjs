import React, { useState, useEffect } from "react";
import { uuid } from 'uuidv4';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    // TODO
    const repository = {
      id: uuid(),
      url: `https://github.com/evertondg/projeto${Date.now()}`,
      title: `Projeto ReactJs ${Date.now()}`,
      techs: ["NodeJS", "ReactJS", "ReactNative"],
      likes: 0
    }

    const response = await api.post('/repositories', repository);

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    // console.log(id);

    api.delete(`repositories/${id}`).then((response) => {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(newRepositories);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
