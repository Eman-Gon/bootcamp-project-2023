export default function Resume() {
    return (
      <div>
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
          <img src="mountain.jpg" alt="Not showing" width="400" height="300" />
  
          <section className="section">
            <h2 className="section-title">Education</h2>
            <p>
              Skyline College, San Bruno, CA<br />
              January 2022 - July 2023<br />
              Bachelor of Science in Computer Science (In Progress)<br />
              GPA: 3.74
            </p>
            <p>
              California Polytechnic State University, San Luis Obispo, CA<br />
              September 2023 - 2025<br />
              Bachelor of Science in Computer Science (In Progress)
            </p>
          </section>
  
          <section className="section">
            <h2 className="section-title">Experience</h2>cd
            <p>
              VR Learning Systems Analyst, (MESA) at Skyline College<br />
              June 2023 - September 2023<br />
              Conduct research to identify the most suitable and beneficial Virtual Reality systems for use within educational purposes.
            </p>
            <p>
              Enterprise for youth, Youth council<br />
              November 2019 - July 2020<br />
              Team collaboration
            </p>
            <p>
              Student Government: Associated Students of Skyline College (ASSC)<br />
              November 2022 - Present<br />
              Organized events
            </p>
          </section>
  
          <section className="section">
            <h2 className="section-title">Skills</h2>
            <p>
              Fluent in English and Spanish
            </p>
            <p>
              Proficient in Java, Python, C++
            </p>
            <p>
              Microsoft Word, Excel
            </p>
          </section>
  
          <section className="section">
            <h2 className="section-title">Projects</h2>
            <p>
              Created and managed an inventory using the linked list data structure, adding, removing, and updating items.
            </p>
            <p>
              Implemented, compiled, and executed a simulation program that models a grocery checkout counter using the data structure queues.
            </p>
            <p>
              In the robotics club, working on a solar-powered boat, focusing on programming the ESC.
            </p>
          </section>
        </main>
        <footer className="footer"> © 2023 Emanuel's website | All Rights Reserved</footer>
      </div>
    );
  }