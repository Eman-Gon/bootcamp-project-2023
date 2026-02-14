import React from "react";
import styles from "./home.module.css"; // Ensure your CSS module is correctly linked
import Image from "next/image";
import mountainImage from "../../../mountain.jpg"; // Adjust the path to go up three levels and then to the image
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <main>
        <h1 className={styles.logo}>Emanuel's website</h1>

        <div className={styles.clearBoth}></div>
        <div className={styles.about}>
          <div className={styles.aboutImage}>
            <Image
              src={mountainImage} // Adjust the path to go up three levels and then to the image
              width={400}
              height={300}
              alt="Mountain"
              layout="responsive"
            />
          </div>
          <div className={styles.aboutText}>
            <p>
              <em>Hello World!</em> This is my website.
            </p>
            <p>
              <strong>
                Hello, I'm Emanuel Gonzalez, a dedicated first-year transfer
                student majoring in Computer Science. My academic journey began
                at Skyline College, and I have come to CAL POLY SLO to
                specialize in Artificial Intelligence and Machine Learning.
              </strong>
            </p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        © 2023 Emanuel's website | All Rights Reserved
      </footer>
    </div>
  );
}
