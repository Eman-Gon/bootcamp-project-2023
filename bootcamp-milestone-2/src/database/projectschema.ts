import mongoose, { Schema } from "mongoose";

export type IComment = {
    user: string;
    comment: string;
    time: Date;
};

export type IProject = {
    title: string;
    slug: string;
    date: Date;
    description: string; // for preview
    comments: IComment[]; // array for comments
};

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    slug: { type: String, required: false },
    date: { type: Date, required: false, default: new Date()},
    description: { type: String, required: true },
    comments: [
        {
            user: { type: String, required: true },
            comment: { type: String, required: true },
            time: { type: Date, required: false, default: new Date() },
        },
    ],
})

const Projects = mongoose.models['projects'] || mongoose.model('projects', projectSchema);

export default Projects