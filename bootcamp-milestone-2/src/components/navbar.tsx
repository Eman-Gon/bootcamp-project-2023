import React from "react";
import style from "./navbar.module.css";

export default function Navbar() {
  return (
    // replace everything in between the <header> & <header /> tags
    // with your navbar code from your earlier milestones
    <header className={style.navbar} >
      <h1> Emanuel's Gonzalez Personal Website </h1>
      <nav>
      <li><a href="index.html">Home</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="portfolio.html">Portfolio</a></li>
              <li><a href="resume.html">Resume</a></li>
              <li><a href="contact.html">Contact</a></li>
      </nav>
    </header>
  );
  }
  //24