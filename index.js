const express = require(`express`)
const app = express()
const cors = require(`cors`)

app.use(cors())
app.use(express.json())

let notas = [
    {
        "id": 2,
        "content": "Hola mundo lista 1",
        "date": "26-5-2023",
        "impotant": true
    }, {
        "id": 3,
        "content": "Hola mundo lista 2",
        "date": "26-12-2022",
        "impotant": false
    },
    {
        "id": 1,
        "content": "Hola mundo lista 3",
        "date": "26-2-2023",
        "impotant": true
    }
]

// const app = http.createServer((request, response) => {
//     response.statusCode = 200
//     response.setHeader(`Content-Type`, `application/json`)
//     response.end(JSON.stringify(notas))
// })

app.get(`/`, (request, response) => {
    response.send(`<p>Hola Mundo</p>`)
})
app.get(`/api/notas`, (request, response) => {
    response.json(notas)
})
app.get(`/api/notas/:id`, (request, response) => {
    const id = Number(request.params.id)
    const nota = notas.find(nota => nota.id === id)
    if (nota) {
        response.json(nota)
    } else {
        response.status(404).end()
    }
})
app.delete(`/api/notas/:id`, (request, response) => {
    const id = Number(request.params.id)
    notas = notas.filter(notas => notas.id !== id)
    response.status(200).end()
})
app.post(`/api/notas`, (request, response) => {
    const nota = request.body
    if(!nota || !nota.content){
        return response.status(400).json({
            error:`nota.content no encontrado`
        })
    }

    const ids = notas.map(nota => nota.id)
    const maxId = Math.max(...ids)

    const newNota = {
        id: maxId +1,
        content: nota.content,
        impotant: typeof nota.impotant !== `undefined` ? nota.impotant : false,
        date: new Date().toISOString()
    }
    notas = notas.concat(newNota)
    response.json(newNota)
})

app.use((request, response) =>{
    response.status(404).json({
        error:"Not Foun"
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`El server esta en el puerto ${PORT}`)
})
