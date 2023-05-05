import express from "express"; 
import session from "express-session";

const app = express(); 
const port = 3030

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: true,
  cookie: {}
}))

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


app.use("/tasks", function (req, res, next) {
  if (req.session.email == null){
    res.status(403).json({error: "not authenticated"})
  }else{
    next() 
  }
})

app.get("/tasks", (req, res, next) => { 
  res.status(200).json(tasks)
})

app.post("/tasks", (req, res) => {
  if (req.body.Titel == null){
    res.status(406).json({error: "task must have a title"})
  }else{
    let newTask = {}
  //for-loop inspiriert durch Ben Brändle 
  for (const value in req.body){
      newTask[value] = req.body[value]
  }
  //mit Lehrer
  tasks = [...tasks, newTask]
  res.status(201).json(newTask)
  }  
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
  if (req.body.Titel == null){
    res.status(406).json({error: "task must have a title"})
  }else{
    let putTask = {}
    for (const value in req.body){
      putTask[value] = req.body[value]
    }
    //eigene Unterlagen
    tasks = tasks.map((t) => t.id == putTask.id ? putTask : t)
    res.json(putTask) 
  }
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

const secretAdminCredentials = {email: "beispielmail", password: "m295"}
//Unterlagen Moodle
app.post("/login", (req, res) => {
  const {email, password} = req.body
  if (password == secretAdminCredentials.password){
    req.session.email = email 

    res.status(200).json({email: req.session.email})
  }
  else{
    res.status(401).json({error: "Invalid credentials"})
  }
})

//Unterlagen Moodle
app.get("/verify", (req, res) => {
  if (req.session.email){
    res.status(200).json({email: req.session.email})
  }else{
    res.status(401).json({error: "You are not logged in"})
  }
})

//Unterlagen Moodle
app.delete("/logout", (req, res) => {
  if (req.session.email){
    req.session.email = null
    res.status(204).send()
  }else{
    res.json({error: "logout not possible"}) 
  }
})

//inspiriert durch Ben Brändle 
app.get("/*", (req, res) => {
  res.status(404).json({error: "Task not found"})
})

app.listen(port, () => {
    console.log("Server ist gestartet.");
});
