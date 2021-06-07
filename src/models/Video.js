import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 20 },
    createdAt: { type: Date, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 }
    },
});

const video = mongoose.model( "video", videoSchema );
export default video;
