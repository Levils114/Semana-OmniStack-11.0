const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionController');

const routes = express.Router();

routes.post("/sessions", SessionsController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.delete('/ongs/:id', async (request, response) => {
	const {id} = request.params;

	const casoIndex = await connection('ongs').where('id', id).select('ongs.id').first();

	if (casoIndex < 0){
		response.status(400).json({error: "mermão, tem esse id aqui não"})
	}

	await connection('ongs').where('id',id).delete();
	return response.status(200).send();
});


routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);





module.exports = routes;