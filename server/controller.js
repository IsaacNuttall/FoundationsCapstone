const democratpoliticians = require('./democrats.json')
const republicanpoliticians = require('./republicans.json')
const shuffle = require('./shuffle.js')

let globalId = 4

let playerRecord = 1

module.exports = {
    getDemocratPoliticians: (req, res) => {
        res.status(200).send(democratpoliticians)
    },

    deleteDemocratPolitician: (req, res) => {
        let index = democratpoliticians.findIndex(elem => elem.id === +req.params.id)
        democratpoliticians.splice(index, 1)
        res.status(200).send(democratpoliticians)
    },

    createDemocratPolitician: (req, res) => {
        let { name, politicalstrength, imageURL } = req.body
        let newdemocratpolitician = {
            id: globalId,
            name, 
            politicalstrength,
            imageURL
        }
        console.log(newdemocratpolitician,'d')
        democratpoliticians.push(newdemocratpolitician)
        res.status(200).send(democratpoliticians)
        globalId++
    },

    updateDemocratPolitician: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = 0//democratpoliticians.findIndex(elem => +elem.id === +id).politicalstrength++
        let indexExists = false

        console.log(id, type, index, republicanpoliticians, 'helloworld')

        for(let value of democratpoliticians) {
            if(+value.id === +id){
                indexExists=true;
                if(type==='plus')value.politicalstrength++;
                else value.politicalstrength--;
                break;
            }
            index++

        }


        res.status(200).send(democratpoliticians)
    },
    getRepublicanPoliticians: (req, res) => {
        res.status(200).send(republicanpoliticians)
    },

    deleteRepublicanPolitician: (req, res) => {
        let index = republicanpoliticians.findIndex(elem => elem.id === +req.params.id)
        republicanpoliticians.splice(index, 1)
        res.status(200).send(republicanpoliticians)
    },
    createRepublicanPolitician: (req, res) => {
        let { name, politicalstrength, imageURL } = req.body
        let newrepublicanpolitician = {
            id: globalId,
            name, 
            politicalstrength,
            imageURL
        }
        republicanpoliticians.push(newrepublicanpolitician)
        res.status(200).send(republicanpoliticians)
        globalId++
    },

    updateRepublicanPolitician: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = 0//republicanpoliticians.findIndex(elem => +elem.id === +id).politicalstrength++
        let indexExists = false

        console.log(id, type, index, republicanpoliticians, 'helloworld')

        for(let value of republicanpoliticians) {
            if(+value.id === +id){
                indexExists=true;
                if(type==='plus')value.politicalstrength++;
                else value.politicalstrength--;
                break;
            }
            index++

        }
        if(indexExists)res.status(200).send(republicanpoliticians)
        else res.status(404)

    },

    shuffleDemocratPoliticians: (req, res) => {
        try {
          let shuffleddemocrats = shuffle(democratpoliticians);
          res.status(200).send(shuffleddemocrats);
        } catch (error) {
          console.error("ERROR GETTING SHUFFLED DEMOCRATS", error);
          res.sendStatus(400);
        }
      },

      shuffleRepublicanPoliticians: (req, res) => {
        try {
          let shuffledrepublicans = shuffle(republicanpoliticians);
          res.status(200).send(shuffledrepublicans);
        } catch (error) {
          console.error("ERROR GETTING SHUFFLED REPUBLICANS", error);
          res.sendStatus(400);
        }
},

chooseDemocratCandidate: (req, res) => {
  let { name, politicalstrength, imageURL } = req.body
  let newdemocratpolitician = {
      id: globalId,
      name, 
      politicalstrength,
      imageURL
  }
  democratpoliticians.push(newdemocratpolitician)
  res.status(200).send(democratpoliticians)
  globalId++
},

chooseRepublicanCandidate: (req, res) => {
  let { name, politicalstrength, imageURL } = req.body
  let newdemocratpolitician = {
      id: globalId,
      name, 
      politicalstrength,
      imageURL
  }
  democratpoliticians.push(newdemocratpolitician)
  res.status(200).send(democratpoliticians)
  globalId++
},

Election: (req, res) => {
    try {
      console.log('election body')
      console.log(req.body)
      const { chosendemocrat, chosenrepublican } = req.body;
  
      // const { democratpoliticalstrength, republicanpoliticalstrength } = req.body
  
      // comparing the total health to determine a winner
      if (chosendemocrat.politicalstrength > chosenrepublican.politicalstrength) {
        playerRecord.democratwins += 1;
        res.status(200).send(`Democrat candidate ${chosendemocrat.name} won!`);
      } else {
        playerRecord.republicanwins += 1;
        // console.log(republicancandidate)
        res.status(200).send(`Republican candidate ${chosenrepublican.name} won!`);
      }
    } catch (error) {
      console.log("ERROR WITH ELECTION", error);
      res.sendStatus(400);
    }
  },
  
  GetElectionStats: (req, res) => {
    try {
      res.status(200).send(playerRecord + '');
    } catch (error) {
      console.log("ERROR GETTING PLAYER STATS", error);
      res.sendStatus(400);
    }
  }
  
}

