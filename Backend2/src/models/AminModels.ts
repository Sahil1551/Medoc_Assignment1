import mongoose ,{Schema,Document} from "mongoose";
interface AdminUser extends Document {
    name: string;
    email: string;
    password: string;
  }
const AdminSchema=new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})  
export default mongoose.model<AdminUser>('Admin',AdminSchema)