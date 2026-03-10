import './App.css';
import React, { useEffect, useState } from "react";
import DigimonCard from './components/DigimonCard';

function App() {
	const [list, setList] = useState ([]); 
	const [name, setName] = useState(""); 
	const [image, setImage] = useState(""); 
	const [error, setError] = useState (""); 

	useEffect(() => {
    	fetch("https://digi-api.com/api/v1/digimon?pageSize=10")
      		.then((res) => res.json())
      		.then((data) => {
        		const digimons = data.content.map((d) => ({
         		 name: d.name,
          		 image: d.image
        		}));

       		 	setList(digimons);
      		})
      		.catch(() => {
        	  setError("Error cargando Digimon");
      		});
  }, []);

  const handleSubmit = (e) => {
	e.preventDefault(); 

	if(name.trim() === "" || image.trim() === "" || !image.startsWith("http")){
		setError("Por favor ingresa un nombre y una URL válida"); 
		return; 
	}

	const newDigimon = {
		name,
		image
	}; 

	setList([...list, newDigimon]); 
	setName("");
	setImage(""); 
	setError(""); 

  }; 

  const handleDelete = (index) => {
	const newList = list.filter((_, i)=> i !== index); 
	setList(newList); 

  }
	return <>
	<div>

      <h1>Digimon List Builder</h1>

      {/* FORMULARIO */}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Imagen URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button type="submit">Agregar</button>

      </form>

      {error && <p>{error}</p>}

      {/* LISTADO */}

      <div>

        {list.map((digimon, index) => (
          <DigimonCard
            key={index}
            name={digimon.name}
            image={digimon.image}
            onDelete={() => handleDelete(index)}
          />
        ))}

      </div>

    </div>
	</>;
}

export default App;

