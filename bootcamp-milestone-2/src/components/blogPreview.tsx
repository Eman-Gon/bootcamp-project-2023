import React from 'react';
import style from './blogPreview.module.css'

export default function BlogPreview() {
  return (
		// replace everything between the <div> & </div> tags
		// with your code from earlier milestones
    <div className={style.div}>
      <h3> Blog Name </h3>
      <div>
        <p>Blog description</p>
				<p>Posted on...</p>
      </div>
	  </div>
  );
}
