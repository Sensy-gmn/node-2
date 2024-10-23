import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

export default mongoose.model("Comment", CommentSchema);
