const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.static(`${__dirname}/client`))

app.use(express.json())
app.use(cors())

const {
    getDemocratPoliticians,
    deleteDemocratPolitician, 
    createDemocratPolitician, 
    updateDemocratPolitician,
    getRepublicanPoliticians,
    deleteRepublicanPolitician, 
    createRepublicanPolitician, 
    updateRepublicanPolitician,
    chooseDemocratCandidate,
    chooseRepublicanCandidate,
    shuffleDemocratPoliticians,
    shuffleRepublicanPoliticians,
    Election,
    GetElectionStats
} = require('./controller')

app.get(`/api/democrats`, getDemocratPoliticians)
app.delete(`/api/deleteDemocrat/:id`, deleteDemocratPolitician)
app.post(`/api/createDemocrat`, createDemocratPolitician)
app.put(`/api/updateDemocrat/:id`, updateDemocratPolitician)
app.get(`/api/republicans`, getRepublicanPoliticians)
app.delete(`/api/deleteRepublican/:id`, deleteRepublicanPolitician)
app.post(`/api/createRepublican`, createRepublicanPolitician)
app.put(`/api/updateRepublican/:id`, updateRepublicanPolitician)
app.get(`/api/chooseDemocratCandidate/:id`, chooseDemocratCandidate)
app.get(`/api/chooseRepublicanCandidate/:id`, chooseRepublicanCandidate)
app.get(`/api/shuffledemocrats`, shuffleDemocratPoliticians)
app.get(`/api/shufflerepublicans`, shuffleRepublicanPoliticians)
app.post(`/api/election`, Election)
app.get('/api/getelectionstats', GetElectionStats)

app.listen(5505, () => console.log(`running on 5505`))