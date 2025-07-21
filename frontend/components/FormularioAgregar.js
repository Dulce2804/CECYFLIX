import React, { useState } from 'react';

const FormularioAgregar = ({ onAgregar }) => {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [poster, setPoster] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaPelicula = { titulo, genero, descripcion, poster };

    try {
      const res = await fetch('http://localhost:4000/api/peliculas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaPelicula)
      });

      const data = await res.json();
      console.log('✅ Película agregada:', data);
      onAgregar(); // recargar la lista

      // Limpiar campos
      setTitulo('');
      setGenero('');
      setDescripcion('');
      setPoster('');
    } catch (err) {
      console.error('❌ Error al agregar película:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Agregar película</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL del Póster"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />
      <button type="submit">Guardar Película</button>
    </form>
  );
};

export default FormularioAgregar;
