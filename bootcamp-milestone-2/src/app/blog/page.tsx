import React from "react";
import BlogPreview from "@/components/blogPreview";
import blogs from "../../app/blogData"; 
import styles from "../../components/navbar.module.css";
import Image from "next/image"; 
import mountainImage from "../../../mountain.jpg"; 
import Link from "next/link"; 
import connectDB from "../../database/db"; 
import Blogs from "../../database/blogschema"; 

async function getBlogs(){
    await connectDB(); // function from db.ts before

    try {
        // query for all blogs and sort by date
        const blogs = await Blogs.find().sort({ date: -1 }).orFail();
        // send a response as the blogs as the message
        return blogs;
    } catch (err) {
        return null;
    }
}

export default function Blog() {
  return (
    <main className={styles.main}>
      <div style={{ clear: "both" }}></div>
      <h1 className="page-title">Blogs</h1>
      {/* Using the Image component from next/image for optimized image handling */}
      <Image
        src={mountainImage}
        alt="Mountain"
        width={400}
        height={300}
        layout="responsive"
      />
      

      <section className="blog-previews">
        {blogs.map((blog) => (
          <BlogPreview key={blog.slug} {...blog} />
        ))}
      </section>

      <footer className="footer">
        © 2023 Emanuel's website | All Rights Reserved
      </footer>
    </main>
  );
}
