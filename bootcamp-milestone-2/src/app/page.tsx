export default function Home() {
    return (
        <main>
            <nav className="navbar">
                <h1 className="logo">
                    <a href="index.html">Emanuel's website</a>
                </h1>
                <ul className="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="resume.html">Resume</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
            <div style={{ clear: 'both' }}></div>
            <h1 className="page-title">Resume</h1>
            <img src="mountain.jpg" alt="Mountain" width="400" height="300" />

            {/* Repeat sections for Education, Experience, Skills, Projects */}

            <footer className="footer">
                © 2023 Emanuel's website | All Rights Reserved
            </footer>
        </main>
    );
}
