import { Machine } from '@/api/models';
import { MachinesService } from '@/api/services';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './machines.component.html',
    styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
    public machines: Machine[]
    public headers: string[]

    constructor(private machinesService: MachinesService) {}

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
}
