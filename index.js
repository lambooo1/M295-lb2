import express from "express"; 

const app = express(); 
const port = 3020

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//durch ChatGPT generiert
let tasks = [
    {
        "id": "1",
        "Titel": "Einkaufen gehen",
        "Erstellungsdatum": "2023-05-01",
        "Erfüllungsdatum": "2023-05-02"
      },
      {
        "id": "2",
        "Titel": "Geburtstagsgeschenk kaufen",
        "Erstellungsdatum": "2023-04-29",
        "Erfüllungsdatum": "2023-05-05"
      },
      {
        "id": "3",
        "Titel": "Wohnzimmer streichen",
        "Erstellungsdatum": "2023-04-30",
        "Erfüllungsdatum": "2023-05-04"
      },
      {
        "id": "4",
        "Titel": "Buch lesen",
        "Erstellungsdatum": "2023-05-01",
        "Erfüllungsdatum": null
      },
      {
        "id": "5",
        "Titel": "Flug buchen",
        "Erstellungsdatum": "2023-05-02",
        "Erfüllungsdatum": null
      }      
]

app.get("/tasks", (req, res) => {
    res.json(tasks)
})

app.post("/tasks", (req, res) => {
    let newTask = {}
    //for-loop inspiriert durch Ben Brändle 
    for (const value in req.body){
        newTask[value] = req.body[value]
    }
    //mit dem Lehrer
    tasks = [...tasks, newTask]
    res.json(newTask)
})

app.get("/tasks/:id", (req, res) => {
    try{
        const findID = tasks.find(((task) => task.id === req.params.id))
        //res.json
        res.json(findID) 
    }
    catch{
        res.sendStatus(404).send("Failed to get task.") 
    } 
}) 

app.put("/tasks/:id", (req, res) => {
  let putTask = {}
  for (const value in req.body){
    putTask[value] = req.body[value]
  }
  //eigene Unterlagen
  tasks = tasks.map((t) => t.id == putTask.id ? putTask : t)
  res.json(putTask) 
})



app.listen(port, () => {
    console.log("Server ist gestartet.");
});
