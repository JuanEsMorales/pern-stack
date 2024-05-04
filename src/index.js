const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const taskRoutes = require('./routes/tasks.routes.js')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(taskRoutes)

app.use((err, req, res, next) => {
  return res.json({
    message: err.message
  })
})




app.listen(3000, () => {
  console.log("Server listening on port http://localhost:3000");
})