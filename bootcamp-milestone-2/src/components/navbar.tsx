import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    // replace everything in between the <header> & <header /> tags
    // with your navbar code from your earlier milestones
    // <Link href="/resume"></Link> //goes to localhost:3000/resume
    <header className={style.navbar} >
      <h1> Emanuel's Gonzalez Personal Website </h1>
      <nav>
      <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/resume">Resume</Link></li>
              <li><Link href="/contact">Contact</Link></li>
      </nav>
    </header>
  );
  }
  //24