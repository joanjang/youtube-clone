import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    fileUrl: { type:String, required: true },
    thumbUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true, minLength: 10 },
    createdAt: { type: Date, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
    ]
});

videoSchema.static( 'formatHashtags', function( hashtags ) {
    return hashtags.split( "," ).map( ( word ) => word.startsWith( "#" ) ? word : `#${word}` );
} );

const video = mongoose.model( "video", videoSchema );
export default video;
