export default function({ position } : { position : string }){
  // Determine SVG path and transform based on position
  let path, transform, circleX, circleY;

  switch (position) {
    case "top-left":
      path = "M0 0 L15 0 Q20 0 20 5 L20 15 Q20 20 15 20 L0 20 Z";
      transform = "translate(-5px, -5px)";
      circleX = 10;
      circleY = 10;
      break;
    case "top-right":
      path = "M40 0 L25 0 Q20 0 20 5 L20 15 Q20 20 25 20 L40 20 Z";
      transform = "translate(5px, -5px)";
      circleX = 30;
      circleY = 10;
      break;
    case "bottom-left":
      path = "M0 40 L15 40 Q20 40 20 35 L20 25 Q20 20 15 20 L0 20 Z";
      transform = "translate(-5px, 5px)";
      circleX = 10;
      circleY = 30;
      break;
    case "bottom-right":
      path = "M40 40 L25 40 Q20 40 20 35 L20 25 Q20 20 25 20 L40 20 Z";
      transform = "translate(5px, 5px)";
      circleX = 30;
      circleY = 30;
      break;
    default:
      path = "M0 0 L15 0 Q20 0 20 5 L20 15 Q20 20 15 20 L0 20 Z";
      transform = "translate(-5px, -5px)";
      circleX = 10;
      circleY = 10;
  }

  // Build the SVG URL
  const svgUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='${path}' fill='none' stroke='%23FFD700' stroke-width='3'/%3E%3Ccircle cx='${circleX}' cy='${circleY}' r='3' fill='%23FFD700'/%3E%3C/svg%3E")`;

  // Apply position classes based on the corner position
  let positionClasses = "absolute w-10 h-10";
  if (position.includes("top")) positionClasses += " top-0";
  if (position.includes("bottom")) positionClasses += " bottom-0";
  if (position.includes("left")) positionClasses += " left-0";
  if (position.includes("right")) positionClasses += " right-0";

  return (
    <div
      className={positionClasses}
      style={{
        background: svgUrl,
        backgroundSize: "contain",
        transform: transform,
      }}
    ></div>
  );
};
