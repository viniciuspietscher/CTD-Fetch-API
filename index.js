fetch('https://www.swapi.tech/api/planets/')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(element => {
      console.log(element);
      $(`<option value="${element.uid}"/>`).html(element.name).appendTo("#planets")
    });
  });

const selectPlanet = () => {
  const planet_id = $("#planets")[0].value;
  fetch(`https://www.swapi.tech/api/planets/${planet_id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.result.properties);
    });
}

