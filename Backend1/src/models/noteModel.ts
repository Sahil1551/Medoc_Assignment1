import mongoose, { Schema, Document } from 'mongoose';

interface INote extends Document {
  title: string;
  description: string;
  userId: string;
  status:string;
}

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true,default:"archived" }
});

export default mongoose.model<INote>('Note', noteSchema);
