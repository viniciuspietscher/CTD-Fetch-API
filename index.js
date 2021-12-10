document.addEventListener("DOMContentLoaded", function() {
  const planetSelect = document.getElementById('planets')
  const container = document.querySelector('.dataContainer');

  fetch('https://www.swapi.tech/api/planets/')
    .then(response => response.json())
    .then(data => {
      data.results.forEach(element => {
        const option = document.createElement('option')
        option.setAttribute('value', element.uid)
        option.innerText = element.name
        planetSelect.add(option)
      });
    });
  

  const selectPlanet = (event) => {
    const planet_id = event.target.value;
    if (!planet_id) {
      return
    }

  fetch(`https://www.swapi.tech/api/planets/${planet_id}`)
    .then(response => response.json())
    .then(data => {
      const planets = document.querySelectorAll('.planet')
      planets.forEach(planet => planet.classList.add('hide'))

      const planetName = data.result.properties.name.toLowerCase().replace(/\s/g, '-');

      let planetContainer = document.querySelector(`.${planetName}`)
      if (planetContainer) {
        planetContainer.classList.remove('hide')
        return
      }

      //create planet
      planetContainer = document.createElement('div')
      planetContainer.classList.add('planet', planetName)

      const keys = ['name','diameter','rotation_period','orbital_period','population','climate','terrain','surface_water']
      keys.forEach(key => {
        const value = data.result.properties[key]
        if (value) {
          const p = document.createElement('p')
          p.innerText = `${key}: ${value}`
          planetContainer.appendChild(p);
        } else {
          console.error(`Error! Key: "${key}" is "${value}"`)
        }
      })
      const planetImage = document.createElement('span')
      planetImage.classList.add('planetImage')
      planetContainer.appendChild(planetImage)
      container.appendChild(planetContainer)
    })
  }

  planetSelect.addEventListener('change', selectPlanet)
})
