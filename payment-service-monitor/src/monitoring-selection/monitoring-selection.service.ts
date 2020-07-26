import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Selection } from './schema/selection.schema';
import { async } from 'rxjs/internal/scheduler/async';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';

@Injectable()
export class MonitoringSelectionService {

    constructor(@InjectModel('selection') private selectionModel: Model<Selection>) {}

        async addSelectionToDatabase(monitoringSelectionDTO : MonitoringSelectionDTO) :Promise<Selection> {
            const addedSelection = new this.selectionModel(monitoringSelectionDTO);
            return addedSelection.save();
        }
        deleteService(id : string) {
            return this.selectionModel.findByIdAndDelete(id);
        }

        getAllServices() {
            return this.selectionModel.find().exec();
        }

}
