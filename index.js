fetch('https://www.swapi.tech/api/planets/1')
  .then(response => response.json())
  .then(data => console.log(data.result.properties.name));