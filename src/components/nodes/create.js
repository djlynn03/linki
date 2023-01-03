import { useState } from "react";

import { getColors } from "./color/get_color";
import { push } from "firebase/database";

let colorOptions = getColors(7);

export default function Create({nodes, setNodes, dbRef, elementRef}) {

  const [hovering, setHovering] = useState(false);
  const handleMouseOver = () => {
    setHovering(true);
  };
  const handleMouseOut = () => {
    setHovering(false);
  };
  const handleAddNode = (color) => {
    addNode(color, "");
  };

  const addNode = (color, next) => {
    nodes.push({ color: color, next: next, added: true });
    setNodes(nodes);
    push(dbRef, color);
    colorOptions = getColors(7);
    nodes[nodes.length - 2].next = color;

    elementRef.current.classList.add("grow");
    setTimeout(() => {
      elementRef.current.classList.remove("grow");
    }, 1000);
  };

  return (
    <>
            <div className={`${"node-chain__node"} ${"active_node"} ${"add-node"}`}>
          <div
            className={`${"add_node"} ${hovering ? "active" : ""}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <span className={`${"vert_line"} ${"line"}`}></span>
            <span className={`${"horiz_line"} ${"line"}`}></span>
          </div>
          <div
            className={`${"add_node__expanded"} ${
              hovering ? "active_create" : ""
            }`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {[...Array(7)].map((e, i) => {
              return (
                <div
                  key={i}
                  style={{ backgroundColor: colorOptions[i] }}
                  className={`${"color"} ${"color" + (i + 1)} ${
                    hovering ? "active_color" : ""
                  }`}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={() => {
                    handleAddNode(colorOptions[i]);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        </>
  )
}