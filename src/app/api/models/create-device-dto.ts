/* tslint:disable */
/* eslint-disable */
import { CreateSensorDto } from './create-sensor-dto';
export interface CreateDeviceDto {
  address: string;
  name: string;
  sensors: Array<CreateSensorDto>;
}
