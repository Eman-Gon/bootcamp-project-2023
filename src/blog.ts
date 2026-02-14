type blogs = {
  title: string;
  description: string;
  date: string;
  slug: string;
};
const blogs: Blog[] = [
  {
    title: "ME",
    description: "ME, Myself, and I",
    date: "10/10/2021",
    slug: "backa;",
  },
  {
    title: "ME",
    description: "ME, myself, and IIIII",
    date: "12/12/2012",
    slug: "blahahah",
  },
];
function link_Blog() {
  const val = document.getElementById("master");
  blogs.forEach(({ title, description, date, slug }) => {
    const link = document.createElement("a");
    link.href = `blog_sites/${slug}.html`;
    link.innerHTML = "Read More";
    const blogEntry = document.createElement("div");
    blogEntry.classList.add("blog-entry");
    blogEntry.innerHTML = `<h2 class="entry-title">${title}</h2>
            <h3 class="entry-description">${description}</h2>
            <p class="entry-date">${date}</p>`;
    blogEntry.appendChild(link);
    if (val) {
      val.appendChild(blogEntry);
    }
  });
}
link_Blog();
