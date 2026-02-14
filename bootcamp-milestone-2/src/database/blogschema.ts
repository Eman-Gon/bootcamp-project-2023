import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the IComment type
export type IComment = {
    user: string;
    comment: string;
    time: Date;
};

// Define the IBlog type
export type IBlog = {
    title: string;
    slug: string;
    date: Date;
    description: string; // for preview
    content: string; // for individual blog page
    comments: IComment[]; // array for comments
};

// mongoose schema 
const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, required: false, default: new Date()},
    description: { type: String, required: true },
    content: { type: String, required: true },
    // Define the comments field as an array of objects following the IComment structure
    comments: [{
        user: { type: String, required: true }, // Assuming user is required
        comment: { type: String, required: true }, // Assuming comment is required
        time: { type: Date, required: false, default: new Date() }
    }]
});

// defining the collection and model
const Blogs = mongoose.models['blogs'] || mongoose.model('blogs', blogSchema);

export default Blogs;
