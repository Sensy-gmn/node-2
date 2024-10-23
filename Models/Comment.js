import { Schema } from "mongoose";

const CommentSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
});

export default mongoose.model("Comment", CommentSchema);
