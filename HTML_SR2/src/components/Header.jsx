import { useEffect, useState } from 'react';
import './Header.css';
import data from './Header.json';

export function Header() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev + 1) % data.slider.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header flex flex-direction-column">
      <section className="header-title flex flex-direction-column">
        {}
        <img className="header-slide" src={data.slider[counter]} key={counter} alt="" />
        <div className="header-text">
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
      </section>

      <nav className="header-menu flex flex-wrap">
        {data.menu.map((item, index) => (
          <a href={item.url} key={index}>
            {item.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
