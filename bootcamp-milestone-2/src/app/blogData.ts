export interface Blog{
    title: string;
    description: string;
    date: string;
    slug: string;
}


const blogs_blog: Blog[] = [
    {
        title: "ME",
        description: "ME, Myself, and I",
        date: "10/10/2021",
        slug:"backa;",
    },
    {
        title: "ME",
        description: "ME, myself, and IIIII",
        date: "12/12/2012",
        slug:"blahahah",
    }
];
export default blogs_blog; // This will allow us to access this data anywhere!