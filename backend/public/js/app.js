document.getElementById('parqueForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const pais = document.getElementById('pais').value;
  const municipio = document.getElementById('municipio').value;
  const extension = document.getElementById('extension').value;
  const atracciones = document.getElementById('atracciones').value.split(',').map(a => a.trim());

  fetch('http://localhost:3000/api/parques', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      ubicacion: { pais, municipio },
      extension,
      atracciones
    })
  })
    .then(res => res.json())
    .then(parque => {
      alert("✅ Parque registrado con éxito");
      location.reload();
    })
    .catch(err => console.error('❌ Error al registrar parque:', err));
});

// Mostrar todos los parques y asignar eventos a botones
fetch('http://localhost:3000/api/parques')
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById('parques');
    data.forEach(parque => {
      const el = document.createElement('div');
      el.innerHTML = `
        <h3>${parque.nombre}</h3>
        <p><strong>Ubicación:</strong> ${parque.ubicacion.municipio}, ${parque.ubicacion.pais}</p>
        <p><strong>Extensión:</strong> ${parque.extension}</p>
        <p><strong>Atracciones:</strong></p>
        <ul>${parque.atracciones.map(a => `<li>${a}</li>`).join('')}</ul>
        <button class="eliminar" data-id="${parque._id}">Eliminar</button>
        <button class="editar" data-id="${parque._id}">Editar</button>
      `;

      div.appendChild(el);

      // Eliminar parque
      el.querySelector('.eliminar').addEventListener('click', () => {
        const id = parque._id;
        if (confirm('¿Seguro que deseas eliminar este parque?')) {
          fetch(`http://localhost:3000/api/parques/${id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(() => {
              alert("🗑️ Parque eliminado");
              location.reload();
            });
        }
      });

      // Editar parque
      el.querySelector('.editar').addEventListener('click', () => {
        const id = parque._id;

        const nuevoNombre = prompt("Nuevo nombre del parque:", parque.nombre);
        const nuevaExtension = prompt("Nueva extensión:", parque.extension);
        const nuevoMunicipio = prompt("Nuevo municipio:", parque.ubicacion.municipio);
        const nuevoPais = prompt("Nuevo país:", parque.ubicacion.pais);
        const nuevasAtracciones = prompt("Nuevas atracciones separadas por coma:", parque.atracciones.join(', '));

        if (nuevoNombre && nuevoPais && nuevoMunicipio && nuevaExtension && nuevasAtracciones) {
          const datos = {
            nombre: nuevoNombre,
            ubicacion: {
              pais: nuevoPais,
              municipio: nuevoMunicipio
            },
            extension: nuevaExtension,
            atracciones: nuevasAtracciones.split(',').map(a => a.trim())
          };

          console.log("📤 Enviando datos al backend:", datos);

          fetch(`http://localhost:3000/api/parques/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          })
            .then(res => res.json())
            .then(() => {
              alert("✏️ Parque editado");
              location.reload();
            })
            .catch(err => console.error('❌ Error al editar parque:', err));
        }
      });
    });
  })
  .catch(err => console.error('❌ Error cargando parques:', err));

