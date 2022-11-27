import fs from 'fs'
import type { Express } from 'express';
import { soap } from 'express-soap';

import type { IGetIncidentReq, IIncident } from './incident.types';
import { createOrUpdateIncident, findIncidentById, seedIncidents } from './incident.repository';

export const initIncidentService = (app: Express) => {
  seedIncidents();

  const wsdl = fs.readFileSync(__dirname + '/../../wsdl/IncidentService.wsdl', 'utf8');
  app.use('/IncidentService', soap({
    wsdl,
    services: {
      IncidentService: {
        IncidentServiceSOAP: {
          GetIncident(req: IGetIncidentReq, res: any) {
            findIncidentById(req, res)
          },
          CreateOrUpdateIncident(req: IIncident, res: any) {
            createOrUpdateIncident(req, res)
          }
        }
      }
    },
  }));
}
