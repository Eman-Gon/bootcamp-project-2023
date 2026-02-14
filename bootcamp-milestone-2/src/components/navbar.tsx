import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    // replace everything in between the <header> & <header /> tags
    // with your navbar code from your earlier milestones
    // <Link href="/resume"></Link> //goes to localhost:3000/resume
    <header className={style.navbar}>
      <h1> Emanuel's Gonzalez Personal Website </h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
//24
