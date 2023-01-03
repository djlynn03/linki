import './node.css';import { useRef } from "react";

export default function Node(data) {
  const elementRef = useRef(null);

  return (
    <>
      <div
        ref={elementRef}
        className='node'
        style={{
          background: data.color,
          boxShadow: `0 0 15px 0 ${data.color}`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${data.color}, 50%, ${
              data.next ? data.next : "white"
            })`,
            boxShadow: `-20px 0 15px 0px  ${data.color}
            , 20px 0 15px 0 ${data.next ? data.next : "white"}`,
          }}
          className='link'
        ></div>
      </div>
    </>
  );
}
