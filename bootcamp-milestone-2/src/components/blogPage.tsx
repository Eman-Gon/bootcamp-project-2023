import React from 'react';
import Image from 'next/image';
import BlogModel from '../database/blogschema'; // or ProjectModel from '../database/projectschema';
import connectDB from '../database/db';
import { IComment, IBlog } from '../database/blogschema'; // or IProject from '../database/projectschema';
import style from './page.module.css';
// import Comment from './Comment'; // Import the Comment component
import Comment from './comment';

type IParams = {
  params: {
    slug: string;
  };
};

async function getBlog(slug: string) {
  await connectDB();
  try {
    const blog: IBlog = await BlogModel.findOne({ slug: slug }).orFail(); // or ProjectModel for projects
    return blog;
  } catch (err) {
    return null;
  }
}

export default async function BlogPage({ params: { slug } }: IParams) {
  const blogData: IBlog | null = await getBlog(slug);

  if (!blogData) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <div className={style.blog}>
        <h1 className={style.title}>{blogData.title}</h1>
        <h6 className={style.date}>
          {blogData.date.toISOString().substring(0, 10)}
        </h6>
        <div className={style.img}>
          <Image
            src="/mountain.jpg"
            alt="Mountain"
            width={400}
            height={300}
            layout="responsive"
          ></Image>
        </div>
        <div className={style.content_container}>
          <p
            className={style.content}
            dangerouslySetInnerHTML={{ __html: blogData.content }}
          ></p>
        </div>
      </div>
      <div>
        {blogData.comments.map((comment: IComment, index: number) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </>
  );
}