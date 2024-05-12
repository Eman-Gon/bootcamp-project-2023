import React from "react";
import style from "./blogPreview.module.css";
import Image from "next/image";
import { Blog } from "../app/blogData"; // Adjust the path to match your project structure

const BlogPreview: React.FC<Blog> = ({ title, description, date }) => {
  return (
    <div className={style.blogpost}>
      <div>
        <h3 className={style.blogTitle}>{title}</h3>
        <p className={style.blogText}>{description}</p>
        <p className={style.previewDate}>{date}</p>
        {/* Use a standard anchor tag for external navigation */}
        <a
          href="https://en.wikipedia.org/wiki/Elon_Musk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogPreview;
