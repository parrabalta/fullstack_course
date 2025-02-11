import express from "express";
import getDiagnoses from '../services/diagnoses'
import { getPatients, getNonSensitivePatients } from "../services/patients";

const appRouter = express.Router()

appRouter.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
  });

appRouter.get('/diagnoses', (_req, res) => {
    console.log('someone requested diagnoses');
    res.json(getDiagnoses());
  });

appRouter.get('/patients', (_req, res) => {
    console.log('someone requested patients');
    res.json(getPatients());
  });

appRouter.get('/nonSensitivePatients', (_req, res) => {
    const data = getNonSensitivePatients()
    console.log("data ", data);
    res.json(data);
  });



  


export default appRouter