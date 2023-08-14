const inspirationBtn = document.getElementById("inspirationButton")

const getInspiration = () => {
    axios.get("http://localhost:5000/api/inspiration")
        .then(res => {
            alert(res.data)
        })
};

const jokeBtn = document.getElementById("jokeButton")

const tellJoke = () => {
    axios.get("http://localhost:5000/api/joke")
        .then(res => {
            alert(res.data)
        })
};

const addGoalBtn = document.getElementById("addGoalButton");
const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");

const goalsArr = []
const checkedGoals = []

const addGoal = () => {
  
  const goal = goalInput.value
   
  

  axios.post("http://localhost:5000/api/goals", {goal})
    .then(res => {
        alert(res.data.message);
        goalInput.value = '';
        displayGoals();
        goalsArr.push(goal)
        checkedGoals.push(false)
        console.log(goalsArr)
        console.log(checkedGoals)
    });
}

const displayGoals = () => {
    axios.get("http://localhost:5000/api/goals")
        .then(res => {
            const goal = goalInput.value
            const goals = res.data
    goalList.innerHTML = '';
  
    goals.forEach((goal, index) => {
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checkedGoals[index]
          checkbox.type = "checkbox";
          checkbox.addEventListener("click", () => {
            if (checkbox.checked) {
              li.style.textDecoration = "line-through";
              alert("Wow! You've reached your goal!");
              checkedGoals[index] = true
              console.log(checkedGoals)
            } else {
              li.style.textDecoration = "none";
              alert('Your goal has not been completed.');
              checkedGoals[index] = false
              console.log(checkedGoals)
            }
          });


    const updateBtn = document.createElement("button");
    updateBtn.id = 'updateButton'
    updateBtn.textContent = "Update";
    updateBtn.addEventListener("click", () => {
      updateGoal(index, goal);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteButton'
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteGoal(index));
    
    const completionDate = document.createElement('input');
    completionDate.type = 'date';
    completionDate.id = 'completionDate'
    completionDate.value = goal.completionDate;

    const label = document.createElement('label')
    label.htmlFor = 'completionDate'
    label.textContent = 'Completion Goal'
    
    li.textContent = goal
    li.appendChild(checkbox);
    li.appendChild(updateBtn)
    li.appendChild(deleteButton);
    li.appendChild(label)
    li.appendChild(completionDate);
    
    goalList.appendChild(li);
  });
})
}



const updateBtn = document.getElementById("updateButton");

const updateGoal = (id, goal) => {
    const updatedGoal = prompt("Enter the updated goal:", goal);
    if (updatedGoal) {
      const completionDate = goalsArr[id].completionDate
      axios.put(`http://localhost:5000/api/goals/${id}`, { goal: updatedGoal})
        .then(res => {
          alert(res.data.message);
          displayGoals();
          goalsArr[id] = updatedGoal;
          checkedGoals[id] = false; 
          console.log(goalsArr)
          console.log(checkedGoals)
        });
    }
};



const deleteGoalBtn = document.getElementById("deleteButton");

const deleteGoal = (id) => {
    axios.delete(`http://localhost:5000/api/goals/${id}`)
      .then(res => {
        alert(res.data.message);
        displayGoals();
        goalsArr.splice(id, 1)
        checkedGoals.splice(id, 1)
        console.log(goalsArr)
        console.log(checkedGoals)
      });
};


inspirationBtn.addEventListener('click', getInspiration);
jokeBtn.addEventListener('click', tellJoke)
addGoalBtn.addEventListener('click', addGoal)
updateBtn.addEventListener('click', updateGoal);
deleteGoalBtn.addEventListener('click', deleteGoal);
