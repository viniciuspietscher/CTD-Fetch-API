document.addEventListener("DOMContentLoaded", function() {
  const characterSelect = document.getElementById('characters')
  const container = document.querySelector('.dataContainer');

  fetch('https://www.swapi.tech/api/people/')
    .then(response => response.json())
    .then(data => {
      data.results.forEach(element => {
        const option = document.createElement('option')
        option.setAttribute('value', element.uid)
        option.innerText = element.name
        characterSelect.add(option)
      });
    });
  

  const selectCharacter = (event) => {
    const character_id = event.target.value;
    if (!character_id) {
      return
    }

  fetch(`https://www.swapi.tech/api/people/${character_id}`)
    .then(response => response.json())
    .then(data => {
      const characters = document.querySelectorAll('.character')
      characters.forEach(character => character.classList.add('hide'))

      const characterName = data.result.properties.name.toLowerCase().replace(/\s/g, '-');
      console.log(characterName)

      let characterContainer = document.querySelector(`.${characterName}`)
      if (characterContainer) {
        characterContainer.classList.remove('hide')
        return
      }

      //create character
      characterContainer = document.createElement('div')
      characterContainer.classList.add('character', characterName)

      const keys = ['name','height','mass','hair_color','skin_color','eye_color','birth_year','gender']
      keys.forEach(key => {
        const value = data.result.properties[key]
        if (value) {
          const p = document.createElement('p')
          p.innerText = `${key}: ${value}`
          characterContainer.appendChild(p);
        } else {
          console.error(`Error! Key: "${key}" is "${value}"`)
        }
      })
      const characterImage = document.createElement('span')
      characterImage.classList.add('characterImage')
      characterContainer.appendChild(characterImage)
      container.appendChild(characterContainer)
    })
  }

  characterSelect.addEventListener('change', selectCharacter)
})
