import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Selection extends Document {
  @Prop({ type: String, required: true})
  name: string;

  @Prop({ type: String, required: true })
  serviceUrl: string;

}

export const SelectionSchema = SchemaFactory.createForClass(Selection);