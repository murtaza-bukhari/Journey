import "./Stars.css";

const stars = [
  { top: "8%", left: "12%", size: "14px", delay: "0s" },
  { top: "18%", left: "82%", size: "18px", delay: "1s" },
  { top: "28%", left: "6%", size: "12px", delay: "2s" },
  { top: "38%", left: "91%", size: "16px", delay: "0.5s" },
  { top: "56%", left: "10%", size: "14px", delay: "1.4s" },
  { top: "70%", left: "88%", size: "20px", delay: "2.2s" },
  { top: "86%", left: "18%", size: "15px", delay: "0.8s" },
  { top: "78%", left: "75%", size: "13px", delay: "1.7s" },
];

function Stars() {
  return (
    <div className="stars">
      {stars.map((star, index) => (
        <span
          key={index}
          className="background-star"
          style={{
            top: star.top,
            left: star.left,
            fontSize: star.size,
            animationDelay: star.delay,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

export default Stars;