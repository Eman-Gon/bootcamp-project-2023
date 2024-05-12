// blogData.ts
export interface Blog {
  title: string;
  description: string;
  date: string;
  slug: string;
  // imageLink?: string; // Optional property for image links
}

const blogs: Blog[] = [
  {
    title: "ME",
    description: "ME, Myself, and I",
    date: "10/10/2021",
    slug: "backa;",
    // imageLink: "/path/to/image.jpg", // Optional image link
  },
  {
    title: "ME",
    description: "ME, myself, and IIIII",
    date: "12/12/2012",
    slug: "blahahah",
    //   imageLink: "/path/to/another/image.jpg", // Optional image link
  },
];

export default blogs;
