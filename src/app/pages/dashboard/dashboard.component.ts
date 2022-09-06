import { Machine } from '@/api/models';
import { Sensor } from '@/api/models/sensor';
import { MachinesService } from '@/api/services';
import { ReadingsService } from '@/api/services/readings.service';
import { io, Socket } from "socket.io-client"
import {Component, OnInit} from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public machines: Machine[];
    public selectedMachineId: string;
    private socket: Socket;
    public selectedMachineSensors: { deviceName: string, sensor: Sensor, currentValue?: number, currentReadTime?: Date }[];
    public charts: { sensorId: string, chart: any }[];
    public lineChartOptions = {
        responsive: false,
    };
    constructor(
        private readonly machinesService: MachinesService,
        private readonly readingsService: ReadingsService,
        private readonly authService: AuthService,
    ) {
        this.selectedMachineSensors = [];
    }

    ngOnInit(): void {
        this.machinesService.machinesControllerGetMachines().subscribe((machines) => {
            this.machines = machines;
            if (this.machines.length > 0) {
                this.selectedMachineId = this.machines[0].id;
                this.loadDashboard();
            }
        })

        this.authService.getAccessTokenSilently().subscribe((access) => {
            this.socket = io(environment.apiRootUrl as string, {
                reconnectionDelayMax: 10000,
                extraHeaders: {
                    Authorization: `Bearer ${access}`
                }
            });
            this.socket.on('value-saved', (data) => {
                try {
                    let chart = this.charts.find(x => x.sensorId == data.sensorId);
                    chart.chart.data.datasets[0] = Object.assign({}, chart.chart.data.datasets[0], {
                        data: [...chart.chart.data.datasets[0].data.slice(1), { x: data.createdAt, y: data.value }]
                    });
                    chart.chart.update('none');
                    let selectedMachineSensor = this.selectedMachineSensors.find(x => x.sensor.id === data.sensorId);
                    selectedMachineSensor.currentValue = data.value;
                    selectedMachineSensor.currentReadTime = data.createdAt;
                } catch (e) {
                    console.log(e);
                }
            });
        })
    }

    loadDashboard(): void {
        this.selectedMachineSensors = [];
        this.charts = [];
        const machine = this.machines.find(x => x.id === this.selectedMachineId);
        for (let device of machine.devices) {
            for (let sensor of device.sensors) {
                this.readingsService.readingsControllerGetChartReadings({ id: sensor.id }).subscribe((readings) => {
                    this.selectedMachineSensors.push({ deviceName:device.name, sensor});
                    setTimeout(() => {
                        let canvas: any = document.getElementById('sensorChart-' + sensor.id);
                        let chart = new Chart(canvas.getContext('2d'), {
                            type: 'line',
                            data: {
                                datasets: [{
                                    data: readings.map((reading) => {
                                        return {
                                            x: reading.createdAt,
                                            y: reading.value,
                                        }
                                    }),
                                    label: sensor.type
                                }]
                            }
                        });
                        this.charts.push({ sensorId: sensor.id, chart })
                    })
                })
            }
        }
    }
}
