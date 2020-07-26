import { Controller, Get, Delete, Post, Header, Body, Param } from '@nestjs/common';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';

@Controller('monitoring-selection')
export class MonitoringSelectionController {
    constructor(private monitoringSelectionService : MonitoringSelectionService) {}

    @Get()
    getAllSelectedServices() {
        return this.monitoringSelectionService.getAllServices();
    }

    @Delete('/:id')
    deleteSelection(@Param('id') id: string) {
        return this.monitoringSelectionService.deleteService(id);
    }

    @Post()
    @Header('Content-type', 'application/json')
    addSelection(@Body() monitoringSelectioDTO : MonitoringSelectionDTO) {
        return this.monitoringSelectionService.addSelectionToDatabase(monitoringSelectioDTO);
    }
}
