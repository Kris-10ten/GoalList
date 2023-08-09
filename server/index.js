const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {getInspiration, tellJoke, addGoal, displayGoals, updateGoal, deleteGoal} = require('./controller')

app.get('/api/inspiration', getInspiration)
app.get('/api/joke', tellJoke)
app.post('/api/goals', addGoal)
app.get('/api/goals', displayGoals)
app.put("/api/goals/:id", updateGoal);
app.delete("/api/goals/:id", deleteGoal);


app.listen(5000, () => console.log("Server running on 5000"));
