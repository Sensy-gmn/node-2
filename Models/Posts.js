import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Post", PostSchema);
