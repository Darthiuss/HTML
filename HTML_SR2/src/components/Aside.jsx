import './Aside.css';
import data from './aside.json';

export function Aside() {
  return (
    <aside className="aside flex flex-direction-column">
      <h2>{data.title}</h2>
      {data.blocks.map((block, index) => (
        <div className="aside-block" key={index}>
          <h3>{block.heading}</h3>
          <ul>
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
