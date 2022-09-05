/* tslint:disable */
/* eslint-disable */
import { CreateDeviceDto } from './create-device-dto';
export interface CreateMachineDto {
  devices: Array<CreateDeviceDto>;
  name: string;
  serial: string;
}
