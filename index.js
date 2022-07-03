const express = require('express')
const app = express()
const port = 9000
const {user_game,user_game_biodata,user_game_history} = require('./models')

app.use('/assets', express.static("./assets"));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('home.ejs')
})


app.get("/login", (req, res) => {
  res.render("login");
})


// app.get("/register", (req, res) => {
//   res.render("register");
// })


app.get("/register/bio/:id", (req, res) => {
  const user_id = req.params.id;
  res.render("formBio",{user_id});
})

app.get("/data", (req, res) => {
 
  user_game.findAll(
    {
      include : user_game_biodata
    }
  )
  .then(user => {
    const data = user[0].dataValues;
    res.render("data",{user});
    res.send(user);
    console.log(data);
  })
})


app.post("/register/bio/:id", (req, res) => {
  console.log("masuk", req.body);
  const {firstname, lastname, birthplace } = req.body;
  const user_id = req.params.id;
  user_game_biodata.create({
    firstname,
    lastname,
    birthplace,
    user_id 
  })
  .then(data => {
    res.redirect('/data');
  })
})


app.post("/register", (req, res) => {
  const {username, password } = req.body;
  user_game.create({
    username,password, isSuperAdmin: false
  })
  .then(data => {
    res.redirect(`/register/bio/${data.id}`);
  })
})


app.get("/user/:id/delete", (req, res) =>{
 const id = req.params.id;
  user_game.destroy({
    where : {id}
  })
  .then(data => {
    res.redirect('/data');
  })
})


app.post("/user/:id/edit", (req, res) =>{
 const id = req.params.id;
 const {username, password } = req.body;
  user_game.update({
    username,password,
  },  {where : {id}})
  .then(data => {
    res.redirect('/data');
  })
})


app.get('/user/:id/edit', (req, res) => {
  const id = req.params.id;
  res.render('edit',{id})
})


app.listen(port, () => {
  console.log(`test server bro ${port}`)
})


