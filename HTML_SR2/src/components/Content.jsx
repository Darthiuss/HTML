import './Content.css';
import sections from './content.json';
import { Disciplines } from './Disciplines.jsx';

export function Content() {
  const about = sections.find((s) => s.id === 'about');
  const career = sections.find((s) => s.id === 'career');

  const renderSection = (s) => (
    <section id={s.id} className="content-section" key={s.id}>
      <h2>{s.title}</h2>
      {s.text.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );

  return (
    <main className="content flex flex-direction-column">
      {renderSection(about)}
      <Disciplines />
      {renderSection(career)}
    </main>
  );
}
