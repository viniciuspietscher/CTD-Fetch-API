fetch('https://www.swapi.tech/api/planets/')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(element => {
      // console.log(element);
      $(`<option value="${element.uid}"/>`).html(element.name).appendTo("#planets")
    });
  });

const selectPlanet = () => {
  const planet_id = $("#planets")[0].value;
  fetch(`https://www.swapi.tech/api/planets/${planet_id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('planet_name').textContent = `Planet name: ${data.result.properties.name}`
      document.getElementById('planet_diameter').textContent = `Planet diameter: ${data.result.properties.diameter}`
      document.getElementById('planet_rotation_period').textContent = `Planet rotation period: ${data.result.properties.rotation_period}`
      document.getElementById('planet_orbital_period').textContent = `Planet orbital period: ${data.result.properties.orbital_period}`
      document.getElementById('planet_population').textContent = `Planet population: ${data.result.properties.population}`
      document.getElementById('planet_climate').textContent = `Planet climate: ${data.result.properties.climate}`
      document.getElementById('planet_terrain').textContent = `Planet terrain: ${data.result.properties.terrain}`
      document.getElementById('planet_surface_water').textContent = `Planet surface water: ${data.result.properties.surface_water}`
    });
}

