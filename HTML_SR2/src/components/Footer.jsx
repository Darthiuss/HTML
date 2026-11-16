import './Footer.css';
import data from './footer.json';

export function Footer() {
  return (
    <footer id="footer" className="footer flex flex-wrap">
      <div className="footer-info flex flex-direction-column">
        <h3>{data.name}</h3>
        <p>{data.address}</p>
        <p>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
        <p>{data.phone}</p>
      </div>

      {}
      <div className="footer-social flex flex-direction-column">
        <h3>Ми в соціальних мережах</h3>
        <div className="flex flex-wrap social-list">
          {data.social.map((s, index) => (
            <a href={s.url} key={index} target="_blank" rel="noreferrer">
              {s.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
