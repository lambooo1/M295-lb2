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
  res.status(200).json(tasks)
})

app.post("/tasks", (req, res) => {
    let newTask = {}
    //for-loop inspiriert durch Ben Brändle 
    for (const value in req.body){
        newTask[value] = req.body[value]
    }
    //mit dem Lehrer
    tasks = [...tasks, newTask]
    res.status(201).json(newTask)
})

//eigene Unterlagen
app.get("/tasks/:id", (req, res) => {
      const findID = tasks.find(((task) => task.id === req.params.id))
      //res.json
      if (findID == null){
        res.status(404).json({error: "task not found"})
      }else{
         res.status(200).json(findID)
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

app.delete("/tasks/:id", (req, res) => {
    const deletedTask =  tasks.filter((t) => t.id === req.params.id)
    tasks = tasks.filter((t) => t.id !== req.params.id); 
    if (deletedTask == null){
      res.sendStatus(404)
    }else{
      res.status(200).json(deletedTask)
    }
})

app.listen(port, () => {
    console.log("Server ist gestartet.");
});
