import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res)=> res.send({title:"GET all susbscriptions"}));

subscriptionRouter.get('/upcoming-renewals', (req, res)=> res.send({title:"GET upcoming renewals"}));

subscriptionRouter.get('/:id', (req, res)=> res.send({title:"GET susbscription details by ID"}));

subscriptionRouter.post('/', (req, res)=> res.send({title:"CREATE a new susbscription"}));

subscriptionRouter.put('/:id', (req, res)=> res.send({title:"UPDATE susbscription details by ID"}));

subscriptionRouter.delete('/:id', (req, res)=> res.send({title:"DELETE susbscription by ID"}));

subscriptionRouter.put('/:id/cancel', (req, res)=> res.send({title:"GET all user susbscriptions"}));


export default subscriptionRouter;