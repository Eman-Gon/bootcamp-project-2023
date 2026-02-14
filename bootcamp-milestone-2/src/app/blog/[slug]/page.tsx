// import React from "react";
// import "@/app/styles/website.css"
// import connectDB from "../../../database/db"; // Ensure this path is correct
// import Blogs from "../../../database/blogschema"; // Ensure this import path is correct


// type Props = {
//     params: { slug: string };
// };

// async function getBlogBySlug(slug: string) {
//     await connectDB();

//     try {
//         // Query for a blog with the specified slug
//         const blog = await Blogs.findOne({ slug }).orFail();
//         return blog;
//     } catch (err) {
//         return null;
//     }
// }

// export default async function Blog({ params }: Props) {
//     const { slug } = params;
//     const blog = await getBlogBySlug(slug);

//     return (
//         <main>
//             {blog ? (
//                 <div>
//                     <Blog {...blog.toObject()}/>
//                 </div>
//             ) : (
//                 <div className="page-title">No Blog Found</div>
//             )}
//         </main>
//     );
// }


import React from "react";
import "@/app/styles/website.css"
import connectDB from "../../../database/db"; 
import Blogs from "../../../database/blogschema"; 


type Props = {
    params: { slug: string };
};

async function getBlogBySlug(slug: string) {
    await connectDB();

    try {
        // Query for a blog with the specified slug
        const blog = await Blogs.findOne({ slug }).orFail();
        return blog;
    } catch (err) {
        return null;
    }
}

export default async function Blog({ params }: Props) {
    const { slug } = params;
    const blog = await getBlogBySlug(slug);

    return (
        <main>
            {blog ? (
                <div>
                    {/* Using BlogPage to render the blog content */}
                    <Blog {...blog.toObject()}/>
                </div>
            ) : (
                <div className="page-title">No Blog Found</div>
            )}
        </main>
    );
}
