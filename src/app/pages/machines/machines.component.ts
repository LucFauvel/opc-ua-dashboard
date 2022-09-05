import { CreateMachineDto, Machine } from '@/api/models';
import { MachinesService } from '@/api/services';
import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './machines.component.html',
    styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
    public machines: Machine[]
    public headers: string[]
    public machineForm: FormGroup;
    public sensorTypes = Object.values(SensorType);
    public sensorTypeMapping = SensorTypeToLabelMap;

    constructor(private machinesService: MachinesService, private formBuilder: FormBuilder) {
        this.machineForm = this.formBuilder.group({
            name: '',
            serial: '',
            devices: this.formBuilder.array([])
        });
    }

    ngOnInit(): void {
        this.machinesService.machinesControllerGetMachines().subscribe((machines) => {
            this.machines = machines;
        })
    }

    refreshMachineList() {
        this.machinesService.machinesControllerGetMachines().subscribe((machines) => {
            this.machines = machines;
        })
    } 
    
    devices(): FormArray {
        return this.machineForm.get('devices') as FormArray;
    }

    addDevice() {
        this.devices().push(this.formBuilder.group({
            deviceName: '',
            deviceAddress: '',
            sensors: this.formBuilder.array([])
        }))
    }

    deviceSensors(deviceIndex: number): FormArray {
        return this.devices().at(deviceIndex).get('sensors') as FormArray;
    }

    addDeviceSensor(deviceIndex: number) {
        this.deviceSensors(deviceIndex).push(this.formBuilder.group({
            sensorName: '',
            sensorType: '',
            nodeId: ''
        }))
    }

    removeDevice(i: number) {
        this.devices().removeAt(i);
    }

    removeDeviceSensor(deviceIndex: number, i: number) {
        this.deviceSensors(deviceIndex).removeAt(i);
    }

    createNewMachine() {
        const formObject = this.machineForm.value
        const machineDto: CreateMachineDto = {
            devices: formObject.devices.map((device) => {
                return {
                    name: device.deviceName,
                    address: device.deviceAddress,
                    sensors: device.sensors.map((sensor) => {
                        return {
                            name: sensor.sensorName,
                            type: sensor.sensorType,
                            nodeId: sensor.nodeId
                        }
                    })
                }
            }),
            name: formObject.name,
            serial: formObject.serial
        }

        this.machinesService.machinesControllerCreateMachine({body: machineDto}).subscribe((machine) => {
            this.machineForm.reset();
            this.machines.push(machine);
        });
    }

    deleteMachine(machineId: string) {
        this.machinesService.machinesControllerRemove({ id: machineId }).subscribe(() => {
            this.machines = this.machines.filter(x => x.id != machineId);
        });
    }

    copyApiKey(apikey: string) {
        navigator.clipboard.writeText(apikey)
    }
}

export enum SensorType {
    TEMPERATURE = "TEMPERATURE",
    ANALOG = "ANALOG"
}

export const SensorTypeToLabelMap: Record<SensorType, string> = {
    [SensorType.TEMPERATURE]: "Temperature",
    [SensorType.ANALOG]: "Analog",
};
