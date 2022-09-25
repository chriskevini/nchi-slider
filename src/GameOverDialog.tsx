export function GameOverDialog() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        backgroundColor: "#fff6",
      }}>
      <div
        style={
          {
            // width: "20vw",
            // height: "20vh",
            // backgroundColor: "#faf8ef",
          }
        }>
        You Lost
      </div>
    </div>
  );
}
