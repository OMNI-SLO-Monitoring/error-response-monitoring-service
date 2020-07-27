import { Controller, Get, Delete, Post, Header, Body, Param } from '@nestjs/common';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';

/**
 * Controller for operations on the database. Available are adding and deleting of selected Services and returning of all
 * services in the database
 */
@Controller('monitoring-selection')
export class MonitoringSelectionController {
    constructor(private monitoringSelectionService : MonitoringSelectionService) {}

    /**
     * Returns all monitored services in the database
     */
    @Get()
    getAllSelectedServices() {
        return this.monitoringSelectionService.getAllServices();
    }

    /**
     * Receives requests to delete monitored services by id
     * 
     * @param id Id of a monitored Service
     */
    @Delete('/:id')
    deleteSelection(@Param('id') id: string) {
        return this.monitoringSelectionService.deleteService(id);
    }
    /**
     * Receives requests to add a service to be monitored to the database
     * 
     * @param monitoringSelectionDTO service to be monitored
     */
    @Post()
    @Header('Content-type', 'application/json')
    addSelection(@Body() monitoringSelectionDTO : MonitoringSelectionDTO) {
        console.log('received')
        return this.monitoringSelectionService.addSelectionToDatabase(monitoringSelectionDTO);
    }
}
