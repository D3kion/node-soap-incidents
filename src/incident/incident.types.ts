export interface IIncident {
  ID: string | number;
  DATEBEGIN: string;
  REPORTDATE: string;
  TARGETFINISH: string;
  CRITIC_LEVEL: number;
  OBJ_OSN_ID: string;
  ASUSH_ID: string;
  OBJ_KOD: string;
}

export interface IGetIncidentReq {
  ID: string | number;
}
