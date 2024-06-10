import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: Boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  createdBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  updatedBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  deleteBy: User;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
