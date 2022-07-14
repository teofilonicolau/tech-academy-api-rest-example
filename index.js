import express, { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT =  process.env.PORT || 3000;
let users = [
    { id: 1, name: 'Rafael Ribeiro', age: 31},
    { id: 2, name: 'Gabriel Custódio', age: 27},
   
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando Com Servidor Express.</h1>');
});

app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response) =>{  //obtendo usuario especifico
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
});
// cria e insere um novo usuario e retoma o usuario q foi criado;
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});
 //atualizando  com Put;
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updateUser = request.body;

    users =users.map(user => {
        if (Number(userId) === user.id) {
            return updateUser;
        }
        return user;
    });
    return response.send(updateUser);
});
// usando metodo delete;
app.delete('/users/:userId', (request, response) => {
    const userId =request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});

