import './App.css';
import { Header } from './components/Header.jsx';
import { Content } from './components/Content.jsx';
import { Aside } from './components/Aside.jsx';
import { Footer } from './components/Footer.jsx';

function App() {
  return (
    <div className="page flex flex-direction-column">
      {/* Заголовок + меню */}
      <Header />
      {/* Основний вміст та додаткова секція */}
      <div className="page-body flex">
        <Content />
        <Aside />
      </div>
      {/* Нижній колонтитул */}
      <Footer />
    </div>
  );
}

export default App;
