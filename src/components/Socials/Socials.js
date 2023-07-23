import style from "./Socials.module.css";

import Title from "../Title/Title";

function Socials() {
  return (
    <div className={`12`}>
      <Title title='Socials' />
      <div className={`${style.socials__items}`}>
        <div className='socials__item'>
          <a href='#'>
            <img
              src='https://img.icons8.com/ios/50/000000/facebook-new.png'
              alt='facebook'
            />
          </a>
        </div>
        <div className='socials__item'>
          <a href='#'>
            <img
              src='https://img.icons8.com/ios/50/000000/instagram-new.png'
              alt='instagram'
            />
          </a>
        </div>
        <div className='socials__item'>
          <a href='#'>
            <img
              src='https://img.icons8.com/ios/50/000000/twitter.png'
              alt='twitter'
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Socials;
