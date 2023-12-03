var blogs_blog = [
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
    }
];
function link_Blog() {
    var val = document.getElementById("master");
    blogs_blog.forEach(function (_a) {
        var title = _a.title, description = _a.description, date = _a.date, slug = _a.slug;
        var link = document.createElement("a");
        link.href = "blog_sites/".concat(slug, ".html");
        link.innerHTML = "Read More";
        var blogEntry = document.createElement("div");
        blogEntry.classList.add("blog-entry");
        blogEntry.innerHTML =
            "<h2 class=\"entry-title\">".concat(title, "</h2>\n            <h3 class=\"entry-description\">").concat(description, "</h2>\n            <p class=\"entry-date\">").concat(date, "</p>");
        blogEntry.appendChild(link);
        if (val) {
            val.appendChild(blogEntry);
        }
    });
}
link_Blog();
