import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Selection } from './schema/selection.schema';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';

@Injectable()
export class MonitoringSelectionService {

    constructor(@InjectModel('selection') private selectionModel: Model<Selection>) {}

        /**
         * Adds a service to be monitored to the database
         * 
         * @param monitoringSelectionDTO Service to be monitored
         */
        async addSelectionToDatabase(monitoringSelectionDTO : MonitoringSelectionDTO) :Promise<Selection> {
            const addedSelection = new this.selectionModel(monitoringSelectionDTO);
            return addedSelection.save();
        }

        /**
         * Deletes a monitored service by id in the database
         * 
         * @param id Id of monitored service
         */
        deleteService(id : string) {
            return this.selectionModel.findByIdAndDelete(id);
        }
        /**
         * Returns all monitored services in the database
         */
        getAllServices() {
            return this.selectionModel.find().exec();
        }

        /**
         * Checks if a service with a given url is in the database
         * Returns an array with the result of the database query
         * 
         * @param requestUrl Url of the service in question
         */
        checkIfServiceIsSelected(requestUrl){
            return this.selectionModel.find({'serviceUrl' : requestUrl});
        }

}
