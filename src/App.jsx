import Game from "./components/Game/Game";

function App() {
  return (
    <div
      className="app"
      style={{
        backgroundImage: `linear-gradient(rgba(8,8,8,.2), rgba(8,8,8,.2)), url(${import.meta.env.BASE_URL}bg.jpg)`,
      }}
    >
      {<Game />}
    </div>
  );
}

export default App;