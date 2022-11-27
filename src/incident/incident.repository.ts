import Datastore from 'nedb'

import type { IGetIncidentReq, IIncident } from './incident.types';

const db = new Datastore();

export default db

export const seedIncidents = () => {
  db.count({}, (err, count) => {
    if (err) console.error(err);
    if (count) return;

    console.log('seeding incidents db...')
    db.insert({ ID: '1', Title: 'URGENT' });
    db.insert({ ID: '2', Title: 'WARNING' });
  })
}

export const findIncidentById = ({ ID }: IGetIncidentReq, cb: (data: IIncident | null) => void) => {
  db.findOne({ ID }, (err, doc) => {
    if (err) {
      console.error(err);
      return;
    }
    cb(doc)
  });
}

export const createOrUpdateIncident = (data: IIncident, cb: (data: IIncident) => void) => {
  // TODO
}
