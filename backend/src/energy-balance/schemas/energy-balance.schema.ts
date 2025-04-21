import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EnergyBalance extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  groupId: string;

  @Prop({ type: Object })
  attributes: Record<string, any>;

  @Prop({ type: [{ value: Number, percentage: Number, datetime: Date }] })
  values: { value: number; percentage: number; datetime: Date }[];
}

export const EnergyBalanceSchema = SchemaFactory.createForClass(EnergyBalance);
