import express from 'express';
import { schema } from './schema';
import graphqlHTTP  from 'express-graphql';

const { PORT = '3001' } = process.env;

const app = express();

app.use('/graphql', graphqlHTTP({ schema, pretty: true, graphiql: true }));
app.get('/', function (req, res) {
    res.redirect('/graphql');
});

app.listen(PORT, (err, result) => {
    if (err) {
        throw err;
    }
    console.log(`Listening at localhost:${PORT}`);
});
