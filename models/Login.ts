import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IHigherEducation {
  course: string;
  institution: string;
  yearOfPassing: number;
}

export interface IHighestDegree {
  specify: string;
  year: number;
}

export interface ILogin extends Document {
  name: string;
  yearOfPassingOut: number;
  course: string;
  department: string;
  address: string;
  email: string;
  contactNo: string;
  occupation?: string;
  placeOfWork?: string;
  designation?: string;
  officialAddress?: string;
  higherEducation?: IHigherEducation;
  highestDegree?: IHighestDegree;
  areaOfExpertise?: string;
  contactsOfBatchmates?: string;
  willingToContact?: boolean;
}

const AlumniSchema: Schema = new Schema({
  name: { type: String, required: true },
  yearOfPassingOut: { type: Number, required: true },
  course: { type: String, required: true },
  department: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  occupation: String,
  placeOfWork: String,
  designation: String,
  officialAddress: String,
  higherEducation: {
    course: String,
    institution: String,
    yearOfPassing: Number
  },
  highestDegree: {
    specify: String,
    year: Number
  },
  areaOfExpertise: String,
  contactsOfBatchmates: String,
  willingToContact: Boolean
});

export default models.Alumni || model<ILogin>('Alumni', AlumniSchema);
