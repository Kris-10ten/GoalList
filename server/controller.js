const goals = []

module.exports = {
    getInspiration: (req, res) => {
        const inspirations = [
          "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          "The only way to do great work is to love what you do.",
          "Believe you can and you're halfway there.",
          "The future belongs to those who believe in the beauty of their dreams.",
          "Don't watch the clock; do what it does. Keep going."
        ];
        let randomIndex = Math.floor(Math.random() * inspirations.length);
        let randomInspiration = inspirations[randomIndex];
        res.status(200).send(randomInspiration);
    },

    tellJoke: (req, res) => {
        const jokes = [
            "My IQ test results came back. They were negative.",
            "Before you marry a person, you should first make them use a computer with a slow Internet connection to see who they really are.",
            "You can’t believe everything you hear—but you can repeat it.",
            "I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.",
            "I went to buy some camo pants but couldn’t find any.",
            "I know they say that money talks, but all mine says is ‘Goodbye.’"
        ];
        let randomIndex = Math.floor(Math.random() * jokes.length);
        let randomJokes = jokes[randomIndex];
        res.status(200).send(randomJokes);
    },

    addGoal: (req, res) => {
        const { goal } = req.body;
        goals.push(goal);
        res.status(200).send({ message: "Goal added successfully" });
    },

    updateGoal: (req, res) => {
        const { id } = req.params;
        const { goal } = req.body;
        goals[id] = goal;
        res.status(200).send({ message: "Goal updated successfully" });
    },

    deleteGoal: (req, res) => {
        const { id } = req.params;
        goals.splice(id, 1);
        res.status(200).send({ message: "Goal deleted successfully" });
    },

    displayGoals: (req, res) => {
        res.status(200).send(goals);
    }
}