import React, { useState, useEffect } from 'react';
import './App.css';
import FormularioAgregar from './components/FormularioAgregar';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modoDescripcion, setModoDescripcion] = useState(false);
  const [recomendacion, setRecomendacion] = useState('');

  useEffect(() => {
  fetch('https://cecyflix-mee9.onrender.com')
    .then(res => res.json())
    .then(data => {
      console.log('📦 Datos recibidos:', data); // ← agrega esto
      setPeliculas(data);
      setPeliculasFiltradas(data);
    })
    .catch(err => console.error('Error al obtener películas:', err));
}, []);


  const handleBuscar = (e) => {
    e.preventDefault();
    const texto = busqueda.toLowerCase();

    const resultado = peliculas.filter(p =>
      p.titulo.toLowerCase().includes(texto) ||
      p.genero.toLowerCase().includes(texto) ||
      p.titulo.toLowerCase().startsWith(texto)
    );

    setPeliculasFiltradas(resultado);
    setRecomendacion('');
  };

  const handleBuscarPorDescripcion = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/recomendaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Dame una recomendación basada en esta descripción:
          ${busqueda}. Usa solo películas de este catálogo:
          ${peliculas.map(p => p.titulo).join(', ')}.`
        })
      });

      const data = await res.json();
      setRecomendacion(data.recomendacion);

      const seleccionadas = peliculas.filter(p =>
        data.recomendacion.toLowerCase().includes(p.titulo.toLowerCase())
      );

      if (seleccionadas.length > 0) {
        setPeliculasFiltradas(seleccionadas);
      }
    } catch (err) {
      console.error('Error con IA:', err);
    }
  };

  return (
    <div className="App">
      <h1>CineVerse</h1>
<FormularioAgregar onAgregar={() => window.location.reload()} />

      <form className="buscador" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder={modoDescripcion ? 'Describe la peli que buscas...' : 'Busca por título o género'}
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        {modoDescripcion ? (
          <button type="button" onClick={handleBuscarPorDescripcion}>Buscar por descripción</button>
        ) : (
          <button type="submit">Buscar</button>
        )}
        <button type="button" onClick={() => setModoDescripcion(!modoDescripcion)}>
          {modoDescripcion ? '🔄 Búsqueda clásica' : '🧠 IA'}
        </button>
      </form>

      {recomendacion && (
        <div className="bloque-recomendaciones">
          <h2>IA sugiere:</h2>
          <p>{recomendacion}</p>
        </div>
      )}

      <div className="grid">
       {Array.isArray(peliculasFiltradas) && peliculasFiltradas.map((p, i) => (
          <div className="tarjeta" key={i}>
            <img src={p.poster} alt={p.titulo} />
            <div className="info">
              <h3>{p.titulo}</h3>
              <p>{p.genero}</p>
              <span>{p.descripcion?.slice(0, 60)}...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
