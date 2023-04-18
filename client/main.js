const form = document.querySelector('form')
const choicesDiv = document.querySelector("#choices");
const democratCandidateDiv = document.querySelector("#democrat-candidate");
const republicanCandidateDiv = document.querySelector("#republican-candidate");
const electionBtn = document.querySelector("#election");
const resultsText = document.querySelector("#results");
const playAgainBtn = document.querySelector("#play-again");
const democratwinText = document.querySelector("#democratwins");
const republicanwinText = document.querySelector("#republicanwins");
const chooseHeader = document.querySelector("#choose-header");
const democratHeader = document.querySelector("#democrat-candidate-header");
const republicanHeader = document.querySelector("#republican-candidate-header");


const baseURL = `http://localhost:5505/api`

let currRepObj = {}
let currDemObj = {}
let choices = [];
let chosendemocrat;
let chosenrepublican;
let democratcandidate = [];
let republicancandidate = [];

electionBtn.classList.add("hide");
playAgainBtn.classList.add("hide");
chooseHeader.classList.add("hide");
democratHeader.classList.add("hide");
republicanHeader.classList.add("hide");


const displayDemocratPolitician = (arr) => {
    const democratpoliticiansContainer = document.querySelector('#democrat-politicians-container')
    democratcandidate = arr

    democratpoliticiansContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createDemocratPoliticianCard(arr[i])
    }
}


const getAllDemocratPoliticians= () => {
    axios.get(`${baseURL}/democrats`)
        .then((res) => {
            displayDemocratPolitician(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteDemocratPolitician = (id) => {
    console.log("DemDelete", id)
    axios.delete(`${baseURL}/deleteDemocrat/${id}`)
        .then((res) => {
            displayDemocratPolitician(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const selectDemocratPolitician = (id) => {
  let index = democratcandidate.findIndex((candidate) => candidate.id === id)
  currDemObj = democratcandidate[index]
  renderDemocratCandidate(democratcandidate[index])
}


const updateDemocratPolitician = (id, type) => {
    console.log("DemUpdate", id, type)
    axios.put(`${baseURL}/updateDemocrat/${id}`, {type})
        .then((res) => {
            displayDemocratPolitician(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const createDemocratPolitician = (body) => {
    console.log("DemCreate",body)
    axios.post(`${baseURL}/createDemocrat`, body)
        .then((res) => {
            displayDemocratPolitician(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const submitDemocratHandler = (e) => {
    e.preventDefault()

    let name = document.querySelector('#democratname')
    let politicalstrength = document.querySelector('#democratpoliticalstrength')
    let imageURL = document.querySelector('#democratimg')

    let bodyObj = {
        name: name.value,
        politicalstrength: politicalstrength.value, 
        imageURL: imageURL.value
    }

    createDemocratPolitician(bodyObj)
  }






    const displayRepublicanPolitician = (arr) => {
      const republicanpoliticiansContainer = document.querySelector('#republican-politicians-container')
      republicancandidate = arr

      republicanpoliticiansContainer.innerHTML = ``
      for (let i = 0; i < arr.length; i++) {
          createRepublicanPoliticianCard(arr[i])
      }
  }
  
  
  const getAllRepublicanPoliticians= () => {
      axios.get(`${baseURL}/republicans`)
          .then((res) => {
              displayRepublicanPolitician(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }
  
  const deleteRepublicanPolitician = (id) => {
      console.log("RepDelete", id)
      axios.delete(`${baseURL}/deleteRepublican/${id}`)
          .then((res) => {
              displayRepublicanPolitician(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }

  const selectRepublicanPolitician = (id) => {
    let index = republicancandidate.findIndex((candidate) => candidate.id === id)
    currRepObj = republicancandidate[index]
    renderRepublicanCandidate(republicancandidate[index])
  }
  
  const updateRepublicanPolitician = (id, type) => {
      console.log("RepUpdate", id, type)
      axios.put(`${baseURL}/updateRepublican/${id}`, {type})
          .then((res) => {
              displayRepublicanPolitician(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }
  
  const createRepublicanPolitician = (body) => {
      console.log("RepCreate",body)
      axios.post(`${baseURL}/createRepublican`, body)
          .then((res) => {
              displayRepublicanPolitician(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }
  
  const submitRepublicanHandler = (e) => {
      e.preventDefault()
  
      let name = document.querySelector('#republicanname')
      let politicalstrength = document.querySelector('#republicanpoliticalstrength')
      let imageURL = document.querySelector('#republicanimg')
  
      let bodyObj = {
          name: name.value,
          politicalstrength: politicalstrength.value, 
          imageURL: imageURL.value
      }
  
      createRepublicanPolitician(bodyObj)


    

    //? Nande dayo?
    name.value = ''
    politicalstrength.value = ''
    imageURL.value = ''
}

const createRepublicanPoliticianCard = (republicanpolitician) => {
  // locate section on HTML where we will be putting our movie card
  const republicanpoliticiansContainer = document.querySelector('#republican-politicians-container')

  // Create a new HTML div element
  const republicanpoliticianCard = document.createElement('div')

  // Add the house-card class to the houseCard div we just created. This is mainly just for styling.
  republicanpoliticianCard.classList.add('republican-politician-card')

  // Define which additional HTML elements need to exist inside our houseCard div
  republicanpoliticianCard.innerHTML = `
  <img alt='republicanpolitician cover image' src=${republicanpolitician.imageURL} class="republican-politician-cover-image"/>
  <p class="name">${republicanpolitician.name}</p>
  <div class="btns-container">
      <button onclick="updateRepublicanPolitician(${republicanpolitician.id}, 'minus')">-</button>
      <p class="republicanpolitician-politicalstrength">Political Strength: ${republicanpolitician.politicalstrength}</p>
      <button onclick="updateRepublicanPolitician(${republicanpolitician.id}, 'plus')">+</button>
  </div>
  <button onclick="selectRepublicanPolitician(${republicanpolitician.id})">select</button>
  <button onclick="deleteRepublicanPolitician(${republicanpolitician.id})">delete</button>
  `

  // Attach the houseCard div (with all of it's nested elements) to the housesContainer on our HTML
  republicanpoliticiansContainer.appendChild(republicanpoliticianCard)
}

form.addEventListener('submit', submitRepublicanHandler)

getAllRepublicanPoliticians() 


const createDemocratPoliticianCard = (democratpolitician) => {
    // locate section on HTML where we will be putting our movie card
    const democratpoliticiansContainer = document.querySelector('#democrat-politicians-container')

    // Create a new HTML div element
    const democratpoliticianCard = document.createElement('div')

    // Add the house-card class to the houseCard div we just created. This is mainly just for styling.
    democratpoliticianCard.classList.add('politician-card')

    // Define which additional HTML elements need to exist inside our houseCard div
    democratpoliticianCard.innerHTML = `
    <img alt='democratpolitician cover image' src=${democratpolitician.imageURL} class="democratpolitician-cover-image"/>
    <p class="name">${democratpolitician.name}</p>
    <div class="btns-container">
        <button onclick="updateDemocratPolitician(${democratpolitician.id}, 'minus')">-</button>
        <p class="democratpolitician-politicalstrength">Political Strength: ${democratpolitician.politicalstrength}</p>
        <button onclick="updateDemocratPolitician(${democratpolitician.id}, 'plus')">+</button>
    </div>
    <button onclick="selectDemocratPolitician(${democratpolitician.id})">select</button>
    <button onclick="deleteDemocratPolitician(${democratpolitician.id})">delete</button>
    `

    // Attach the houseCard div (with all of it's nested elements) to the housesContainer on our HTML
    democratpoliticiansContainer.appendChild(democratpoliticianCard)
}

form.addEventListener('submit', submitDemocratHandler)

getAllDemocratPoliticians() 




const makeDemocratChoiceCard = (democratcandidate) => {
    return `
          <div id="demChoice" class="democratcandidate-card outline">
          <img src='${democratcandidate.imageURL}' alt='${democratcandidate.name}'/>
          <h3>${democratcandidate.name}</h3>
          <h4>politicalstrength: ${democratcandidate.politicalstrength}</h4>
          <button class="democratcandidate-btn" onclick="choosedemocratcandidate(${democratcandidate.id})">Add to Duo</button>
          </div>
      `;
  }

  const makeRepublicanChoiceCard = (republicancandidate) => {
    return `
          <div id="repChoice" class="republicancandidate-card outline">
          <img src='${republicancandidate.imageURL}' alt='${republicancandidate.name}'/>
          <h3>${republicancandidate.name}</h3>
          <h4>politicalstrength: ${republicancandidate.politicalstrength}</h4>
          <button class="republicancandidate-btn" onclick="chooserepublicancandidate(${republicancandidate.id})">Add to Duo</button>
          </div>
      `;
  }
  
  const makeDemocratPlayerCard = (democratcandidate) => {
    return `
          <div class="democratcandidate-card outline">
          <img src='${democratcandidate.imageURL}' alt='${democratcandidate.name}'/>
          <h3>${democratcandidate.name}</h3>
          <h4>politicalstrength: ${democratcandidate.politicalstrength}</h4>
          <button class="democratcandidate-btn" onclick="putdemocratcandidateBack(${democratcandidate.id})">Remove from Duo</button>
          </div>
      `;
  }

  const makeRepublicanPlayerCard = (republicancandidate) => {
    return `
          <div class="republicancandidate-card outline">
          <img src='${republicancandidate.imageURL}' alt='${republicancandidate.name}'/>
          <h3>${republicancandidate.name}</h3>
          <h4>politicalstrength: ${republicancandidate.politicalstrength}</h4>
          <button class="republicancandidate-btn" onclick="putrepublicancandidateBack(${republicancandidate.id})">Remove from Duo</button>
          </div>
      `;
  }
  
  const makeDemocratDisplayCard = (democratcandidate) => {
    return `
          <div id="democratDisplayCard" class="democratcandidate-card outline">
          <img src='${democratcandidate.imageURL}' alt='${democratcandidate.name}'/>
          <h3>${democratcandidate.name}</h3>
          <h4>politicalstrength: ${democratcandidate.politicalstrength}</h4>
          </div>
      `;
  }

  const makeRepublicanDisplayCard = (republicancandidate) => {
    return `
          <div class="republicancandidate-card outline">
          <img src='${republicancandidate.imageURL}' alt='${republicancandidate.name}'/>
          <h3>${republicancandidate.name}</h3>
          <h4>politicalstrength: ${republicancandidate.politicalstrength}</h4>
          </div>
      `;
  }
  
  const renderDemocratChoices = () => {
    choicesDiv.innerHTML = "";
    chooseHeader.classList.remove("hide");
  
    democratcandidate.forEach((choice) => {
      let democratHtml = makeDemocratChoiceCard(choice);
      choicesDiv.innerHTML += democratHtml;
    });
  }

  const renderRepublicanChoices = () => {
    choicesDiv.innerHTML = "";
    chooseHeader.classList.remove("hide");
  
    republicancandidate.forEach((choice) => {
      let republicanHtml = makeRepublicanChoiceCard(choice);
      choicesDiv.innerHTML += republicanHtml;
    });
  }
  
  const renderRepublicanCandidate = (candidate) => {
    republicanCandidateDiv.innerHTML = "";
    republicanHeader.classList.remove("hide");
  
    let republicanHtml = makeRepublicanDisplayCard(candidate);
    republicanCandidateDiv.innerHTML = republicanHtml
  }
  
  const renderDemocratCandidate = (candidate) => {
    democratCandidateDiv.innerHTML = "";
    democratHeader.classList.remove("hide");
  
    let democratHtml = makeDemocratDisplayCard(candidate);
    democratCandidateDiv.innerHTML = democratHtml
  }
  
  const chooseDemocratCandidate = (id) => {
    if (democratcandidate.length === 2) {
      return alert("You can only choose two candidates!");
    }
    let index = democratcandidate.findIndex((democratcandidate) => democratcandidate.id === id);
    democratcandidate.push(democratcandidate[index]);
    democratcandidate.splice(index, 1);
    renderDemocratChoices();
    renderDemocratCandidate();
    if (democratcandidate.length === 2) {
      electionBtn.classList.remove("hide");
    }
  }

  const chooseRepublicanCandidate = (id) => {
    if (republicancandidate.length === 2) {
      return alert("You can only choose two candidates!");
    }
    let index = republicancandidate.findIndex((republicancandidate) => republicancandidate.id === id);
    republicancandidate.push(republicancandidate[index]);
    republicancandidate.splice(index, 1);
    renderRepublicanChoices();
    renderRepublicanCandidate();
    if (republicancandidate.length === 2) {
      electionBtn.classList.remove("hide");
    }
  }

  
  const Election = () => {
    resultsText.textContent = "Election...";
    electionBtn.classList.add("hide");
    choicesDiv.innerHTML = "";
    chooseHeader.classList.add("hide");
    document
      .querySelectorAll(".democrat-candidate-btn", ".republican-candidate-btn")
      .forEach((btn) => btn.classList.add("hide"))
    setTimeout(() => {
      axios.post(`${baseURL}/election`, { chosenrepublican:currRepObj, chosendemocrat: currDemObj }).then(({ data }) => {
        resultsText.textContent = data;
        playAgainBtn.classList.remove("hide");
        getElectionStats();
        console.log(data)

      });
    }, 1500);
  } 
  
  const reset = () => {
    resultsText.textContent = "";
    choices = [];
    republicancandidate = [];
    democratcandidate = [];
    playAgainBtn.classList.add("hide");
    location.reload()
    republicanHeader.classList.add("hide");
    democratHeader.classList.add("hide");
  }
  
  const getElectionStats = () => {
    axios.get(`${baseURL}/getelectionstats`).then(({ data: { democratwin, republicanwin} }) => {
      // democratwinText.textContent = `democratWins: ${democratwin}`;
      // republicanwinText.textContent = `republicanWins: ${republicanwin}`;
    });
  }
  
electionBtn.addEventListener("click", Election);
playAgainBtn.addEventListener("click", reset);

getElectionStats();
 





