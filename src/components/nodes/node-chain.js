import Node from "./node";

import { useState, useRef, useEffect } from "react";

import "./node.css";
import { getColors, parseColors } from "./color/get_color.js";

import { getDatabase, ref, set, onValue, get, push } from "firebase/database";
// import

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Create from "./create";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

const dbRef = ref(db, "nodes");

export default function NodeChain({ createOpen, setCreateOpen }) {

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        let nodes = Object.values(snapshot.val()).map((element, i) => {
          return {
            color: element,
            next: Object.values(snapshot.val())[i + 1],
            added: false,
          };
        });
        setNodes(nodes);
      }
    });
    return onValue(dbRef, (snapshot) => {
      let nodes = Object.values(snapshot.val()).map((element, i) => {
        return {
          color: element,
          next: Object.values(snapshot.val())[i + 1],
          added: true,
        };
      });
      setNodes(nodes);
    });
  }, []);

  const elementRef = useRef(null);

  return (
    <>
      <div
        initial="static"
        animate="slide"
        className="node_chain"
        ref={elementRef}
      >
        {nodes.map((node, index) => {
          return (
            <div
              key={index}
              className={`${"node_chain__node"} ${"active_node"} ${
                node.added ? "grow" : ""
              }`}
            >
              <Node color={node.color} next={node.next} />
            </div>
          );
        })}
        <Create
          nodes={nodes}
          setNodes={setNodes}
          dbRef={dbRef}
          elementRef={elementRef}
        />
      </div>
    </>
  );
}
