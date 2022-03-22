const express = require("express");
const routerApi = require('./routes')
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['htt://localhost:8080', 'https//myapp.co']
const options = {

  origin: (origin, callback) =>{

    if (whitelist.includes(origin) || !origin ) {
      callback(null, true) //No hay error , accesos permitido
    }else{

      callback (new Error('No permitido'))
    }

  }

}
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello  world");
});
app.get("/nueva-ruta", (req, res) => {
  res.send("Hello  soy la nueva ruta");
});



app.get("/users", (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({ limit, offset });
  } else {
    res.json({
      message: "No hay parametros",
    });
  }
});


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler),
app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening a port", port);
});
