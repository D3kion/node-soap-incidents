import Datastore from 'nedb'

import type { IGetIncidentReq, IIncident } from './incident.types';

const db = new Datastore();

export default db

export const seedIncidents = () => {
  db.count({}, (err, count) => {
    if (err) console.error(err);
    if (count) return;

    const seed: IIncident[] = [
      { ID: 1, DATEBEGIN: '2022-11-27T17:34:07.243Z', REPORTDATE: '2022-11-29T17:34:07.243Z', TARGETFINISH: '2022-12-02T17:34:07.243Z', CRITIC_LEVEL: 1, OBJ_OSN_ID: 'QWERTYX', ASUSH_ID: 'QWERTYX', OBJ_KOD: 'QWERTYX' },
      { ID: 2, DATEBEGIN: '2022-11-24T17:34:07.243Z', REPORTDATE: '2022-11-28T17:34:07.243Z', TARGETFINISH: '2022-12-03T17:34:07.243Z', CRITIC_LEVEL: 3, OBJ_OSN_ID: 'QWERTYY', ASUSH_ID: 'QWERTYY', OBJ_KOD: 'QWERTYY' },
    ]

    console.log('seeding incidents db...');
    seed.map(x => db.insert(x));
  })
}

export const findIncidentById = ({ ID }: IGetIncidentReq, cb: (data: IIncident | null) => void) => {
  db.findOne({ ID: +ID }, (err, doc) => {
    if (err) { console.error(err); return }
    cb(doc);
  });
}

export const createOrUpdateIncident = ({ ID, ...data }: IIncident, cb: (data: IIncident) => void) => {
  db.update({ ID: +ID }, { ID: +ID, ...data }, { upsert: true }, err => {
    if (err) { console.error(err); return }
    findIncidentById({ ID }, data => cb(data!))
  })
}
