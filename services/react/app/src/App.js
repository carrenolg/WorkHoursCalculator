import "./App.css";
import React from "react";
import Navigation from "./Components/Navigation";
import Main from "./Components/Main";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Software creado por{" "}
          <a href="https://github.com/carrenolg/">carrenolg</a>
        </p>
      </header>
      <Navigation />
      <Main />
    </div>
  );
}

/*const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/about'>About</NavLink></li>
      <li><NavLink to='/contact'>Contact</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/contact' component={Contact}></Route>
  </Switch>
);

const Home = () => (
  <div className="home">
    <h1>Welcome to my portfolio website</h1>
    <p> Feel free to browse around and learn more about me.</p>
  </div>
);

const About = () => (
  <div className="about">
    <h1>About Me</h1>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
  </div>
);

const Contact = () => (
  <div className="contact">
    <h1>Contact Me</h1>
    <p>
      You can reach me via email: <strong>hello@example.com</strong>
    </p>
  </div>
);*/

export default App;
