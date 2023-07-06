const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors());
const pgp = require('pg-promise')(/* options */)
//const db = pgp('postgres://macg:SIxnhEU7ZEdm9q17AdhZvKQIoUPIWqrF@dpg-chh6bpl269vdvsr9ocpg-a/databasecv')
const db = pgp('postgres://macg:SIxnhEU7ZEdm9q17AdhZvKQIoUPIWqrF@dpg-chh6bpl269vdvsr9ocpg-a/databasecv')


app.get("/", (req, res) => res.type('html').send(html));

app.get('/users/:id', async (req, res) => {
  var userID = parseInt(req.params.id);
  db.one('select * from users where id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.put('/users/aboutme/:id', async (req, res) => {
  var userID = parseInt(req.params.id);
  var aboutMe = req.body.aboutMe;

  db.none('UPDATE users SET about_me = $1 WHERE id = $2', [aboutMe, userID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'updated ONE'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.put('/users/aboutmetitle/:id', async (req, res) => {
  var userID = parseInt(req.params.id);
  var aboutMeTitle = req.body.aboutMeTitle;

  db.none('UPDATE users SET about_me_title = $1 WHERE id = $2', [aboutMeTitle, userID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'updated ONE'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.put('/users/description/:id', async (req, res) => {
  var userID = parseInt(req.params.id);
  var description = req.body.description;

  db.one('UPDATE users SET description = $1 WHERE id = $2', [description, userID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'updated ONE'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});



app.get('/users/', async (req, res) => {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.post('/users', async (req, res) => {
  let user = {
    id: req.id,
    name: req.name,
    pass: req.pass,
    first_name: req.first_name,
    last_name: req.last_name,
    birthday: req.birthday,
    about_me: req.about_me,
    description: req.description,
    hobbies: req.hobbies,
    created_at: req.created_at,
  }
  await db.none('INSERT INTO users(id, user) VALUES(${id}, ${this})', user)
  //return res.send('GET HTTP method on user resource');
  res.send(user);


  req.body.age = parseInt(req.body.age);
  db.none('insert into users(name, breed, age, sex)' +
    'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.put('/users/:userId', (req, res) => {

  db.none('update users set name=$1, pass=$2, first_name=$3, last_name=$4, birthday=$5, about_me=$6, description=$7, hobbies=$8, created_at=$9  where id=$10',
    [req.body.name, req.body.pass, req.body.first_name, req.body.last_name, req.body.birthday, req.body.about_me, req.body.description, req.body.hobbies, req.body.created_at, req.params.userId])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
  );
});

app.get('/experiencias', async (req, res) => {
  db.any('select * from experiencia')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});

app.post('/experiencias', async (req, res) => {
  var exp = req.body.experiencias;

  let experiencia = {
    id: exp.id,
    fecha: exp.fecha,
    titulo: exp.titulo,
    img: exp.img,
  }

  await db.none('INSERT INTO experiencia(id, experiencia) VALUES(${id}, ${this})', experiencia)

  res.status(200)
    .json({
      status: 'success',
      message: 'Save NEw exp'
    });
});

app.put('/experiencias/:id', async (req, res) => {
  var expID = parseInt(req.params.id);
  var body = req.body.experiencia;

  db.none('UPDATE experiencia SET fecha = $1,  titulo = $2,  img = $3  WHERE id = $4', [body.fecha, body.titulo, body.img, expID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'updated ONE'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err
        });
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
