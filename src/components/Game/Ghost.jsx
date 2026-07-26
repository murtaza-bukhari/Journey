function Ghost() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        userSelect: "none",
        zIndex: 2,
      }}
    >
      👻
    </div>
  );
}

export default Ghost;