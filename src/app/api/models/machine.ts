/* tslint:disable */
/* eslint-disable */
import { OpcUaDevice } from './opc-ua-device';
export interface Machine {
  apiKey: string;
  devices: Array<OpcUaDevice>;
  id: string;
  name: string;
  serial: string;
  status: string;
}
