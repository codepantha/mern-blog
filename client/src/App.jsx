import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="/" className="logo">
          Codepantha's Blog
        </a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>
      <div className="post">
        <div className="image">
          <img src="https://picsum.photos/400/300" alt="post-img" />
        </div>
        <div className="texts">
          <h2>The Origin of Lorem Ipsum</h2>
          <p className="info">
            <a href="" className="author">
              Codepantha
            </a>{' '}
            <time>2023-01-25 12:25</time>
          </p>
          <p className="excerpt">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </p>
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://picsum.photos/400/300" alt="post-img" />
        </div>
        <div className="texts">
          <h2>The Origin of Lorem Ipsum</h2>
          <p className="info">
            <a href="" className="author">
              Codepantha
            </a>{' '}
            <time>2023-01-25 12:25</time>
          </p>
          <p className="summary">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </p>
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://picsum.photos/400/300" alt="post-img" />
        </div>
        <div className="texts">
          <h2>The Origin of Lorem Ipsum</h2>
          <p className="info">
            <a href="" className="author">
              Codepantha
            </a>{' '}
            <time>2023-01-25 12:25</time>
          </p>
          <p className="excerpt">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </p>
        </div>
      </div>
      
      
    </main>
  );
}

export default App;
