import './Disciplines.css';
import disciplines from './disciplines.json';

const typeNames = {
  required: "Обов'язкова",
  elective: 'Вибіркова',
  practice: 'Практика',
};

export function Disciplines() {
  return (
    <section id="disciplines" className="disciplines flex flex-direction-column">
      <h2>Навчальні дисципліни</h2>
      <div className="cards flex flex-wrap">
        {}
        {disciplines.map((item) => (
          <div key={item.id} className={`card card-${item.type} flex flex-direction-column`}>
            <h3 className="card-title">{item.name}</h3>
            <span className="card-type">{typeNames[item.type]}</span>
            <span className="card-info">
              {item.credits} кредитів · {item.semester} семестр
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
