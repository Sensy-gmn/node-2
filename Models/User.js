import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
