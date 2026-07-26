import "./HeartRain.css";

function HeartRain() {
  return (
    <div className="heart-rain">
      {Array.from({ length: 20 }, (_, index) => (
        <span
          key={index}
          className="heart"
          style={{
            left: `${(index * 5) % 100}%`,
            animationDelay: `${(index % 5) * 0.4}s`,
            animationDuration: `${3 + (index % 4) * 0.5}s`,
          }}
        >
          💀
        </span>
      ))}
    </div>
  );
}

export default HeartRain;