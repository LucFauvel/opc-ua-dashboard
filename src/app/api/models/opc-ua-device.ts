/* tslint:disable */
/* eslint-disable */
import { Sensor } from './sensor';
export interface OpcUaDevice {
  address: string;
  id: string;
  name: string;
  sensors: Array<Sensor>;
}
