// // import React from "react";
// // import styles from "./contact.module.css";
// // import Image from "next/image";

// // export default function Contact() {
// //   return (
// //     <main className={styles.main}>

// //       <div className={styles.clear}></div>
// //       <h1 className={styles.pageTitle}>Contact</h1>
// //       <img src="/mountain.jpeg" alt="Not showing" width="400" height="300" />
// //       <form id={styles.contactForm}>
// //         <label htmlFor="name">Name:</label>
// //         <input type="text" id="name" name="name" required />
// //         <br />
// //         <br />

// //         <label htmlFor="email">Email:</label>
// //         <input type="email" id="email" name="email" required />
// //         <br />
// //         <br />

// //         <label htmlFor="message">Message:</label>
// //         <br />
// //         {/* <textarea id="message" name="message" rows="4" cols="50" required></textarea><br /><br /> */}

// //         <input type="submit" value="Submit" />
// //       </form>
// //       <footer>© 2023 Emanuel's website | All Rights Reserved</footer>
// //     </main>
// //   );
// // }
// import React from "react";
// import styles from "./contact.module.css";
// import Image from "next/image";

// export default function Contact() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.clear}></div>
//       <h1 className={styles.pageTitle}>Contact</h1>
//       {/* Use Next.js Image component for optimized image handling */}
//       <Image src="/mountain.jpg" alt="Mountain" width={400} height={300} />
//       <form id={styles.contactForm}>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" name="name" required />
//         <br />
//         <br />

//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" required />
//         <br />
//         <br />

//         <label htmlFor="message">Message:</label>
//         <br />
//         //{/* <textarea id="message" name="message" rows="4" cols="50" required></textarea><br /><br /> */}

//         <input type="submit" value="Submit" />
//       </form>
//       <footer>© 2023 Emanuel's website | All Rights Reserved</footer>
//     </main>
//   );
// }
import React from "react";
import styles from "./contact.module.css";
import Image from "next/image";
import mountainImage from "../../../mountain.jpg"; 

export default function Contact() {
  return (
    <main className={styles.main}>
      <div className={styles.clear}></div>
      <h1 className={styles.pageTitle}>Contact</h1>
      {/* Use Next.js Image component for optimized image handling */}
      <Image
        src={mountainImage}
        alt="Mountain"
        width={400}
        height={300}
        layout="responsive"
      />
      <form id={styles.contactForm}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <br />

        <label htmlFor="message">Message:</label>
        <br />
        {/* Uncomment the following line if you have a textarea for the message */}
        {/* <textarea id="message" name="message" rows="4" cols="50" required></textarea><br /><br /> */}

        <input type="submit" value="Submit" />
      </form>
      <footer>© 2023 Emanuel's website | All Rights Reserved</footer>
    </main>
  );
}
