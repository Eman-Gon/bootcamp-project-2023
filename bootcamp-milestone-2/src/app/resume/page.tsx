import React from "react";
import styles from "./resume.module.css"; // Importing the CSS module
import Image from "next/image"; // Importing the Image component from next/image for optimized images
import mountainImage from "../../../mountain.jpg"; // Adjust the path to go up three levels and then to the image

export default function Resume() {
  return (
    <div className={styles.resumeContainer}>
      <main>
        <div className={styles.clearFloats}></div>
        <h1 className={styles.pageTitle}>Resume</h1>

        {/* Using the Image component from next/image for optimized image handling */}
        <div className={styles.resumeImage}>
          <Image
            src={mountainImage} // Adjust the path to go up three levels and then to the image
            alt="Mountain"
            width={400} // specify the width
            height={300} // specify the height
            layout="responsive"
          />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <p className={styles.text}>
            Skyline College, San Bruno, CA
            <br />
            January 2022 - July 2023
            <br />
            Bachelor of Science in Computer Science (In Progress)
            <br />
            GPA: 3.74
          </p>
          <p className={styles.text}>
            California Polytechnic State University, San Luis Obispo, CA
            <br />
            September 2023 - 2025
            <br />
            Bachelor of Science in Computer Science (In Progress)
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <p className={styles.text}>
            VR Learning Systems Analyst, (MESA) at Skyline College
            <br />
            June 2023 - September 2023
            <br />
            Conduct research to identify the most suitable and beneficial
            Virtual Reality systems for use within educational purposes.
          </p>
          <p className={styles.text}>
            Enterprise for Youth, Youth Council
            <br />
            November 2019 - July 2020
            <br />
            Team collaboration.
          </p>
          <p className={styles.text}>
            Student Government: Associated Students of Skyline College (ASSC)
            <br />
            November 2022 - Present
            <br />
            Organized events.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className={styles.text}>Fluent in English and Spanish</p>
          <p className={styles.text}>Proficient in Java, Python, C++</p>
          <p className={styles.text}>Microsoft Word, Excel</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <p className={styles.text}>
            Created and managed an inventory using the linked list data
            structure, adding, removing, and updating items.
          </p>
          <p className={styles.text}>
            Implemented, compiled, and executed a simulation program that models
            a grocery checkout counter using the data structure queues.
          </p>
          <p className={styles.text}>
            In the robotics club, working on a solar-powered boat, focusing on
            programming the ESC.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        © 2023 Emanuel's website | All Rights Reserved
      </footer>
    </div>
  );
}
