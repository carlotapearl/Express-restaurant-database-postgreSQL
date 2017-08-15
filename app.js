const express = require('express');
const { Client } = require('pg');

const app = express();

const client = new Client({
  user: 'carlotapearl',
  host: 'localhost',
  database: 'tacos',
  password: '',
  port: 5432
});
client.connect();

app.get('/', function (request, response) {
  response.send('ok');
});

app.get('/api/restaurants', function (request, response){
  client.query('SELECT * FROM franchise', function (error, dbResponse){
    console.log(dbResponse);
    response.json({ restaurants: dbResponse.rows})
  });
});

app.get('/api/restaurants/:franchise_id', function (request, response) {
  client.query('SELECT * FROM franchise WHERE franchise_id = $1',
    [request.params.franchise_id], function(error, dbResponse){
      response.json({ restaurant: dbResponse.rows[0]})//added [0] to get only the first one in array
    });
});

app.get('/api/restaurants/:franchise_id/locations', function (request, response){
  client.query('SELECT * FROM location WHERE franchise_id=$1',
  [request.params.franchise_id], function (error, dbResponse) {
    response.json({ locations: dbResponse.rows  })
  });
});

app.get('/api/restaurants/:franchise_id/menu_item', function (request, response){
  client.query('SELECT * FROM menu WHERE menuItem_id=$1',
  [request.params.menuItem_id], function (error, dbResponse){
    response.json({ menu: dbResponse.rows })
  });
});

app.listen(3000, function() {
  console.log('ok so far')
});