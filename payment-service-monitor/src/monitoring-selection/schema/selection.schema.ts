import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Selection extends Document {
  @Prop()
  name: string;

  @Prop()
  serviceUrl: string;

}

export const SelectionSchema = SchemaFactory.createForClass(Selection);