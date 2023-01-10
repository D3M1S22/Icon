import React, { useEffect, useState, useRef } from "react";
import {
  animated,
  useSpring,
  useTransition,
  useIsomorphicLayoutEffect,
  to,
} from "@react-spring/web";

declare interface CardProps {
  titolo: string | Element;
  corpo: string | Element;
  footer: string | Element;
}

export default function Card() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    toX:
      window.innerWidth / 2 -
      cardRef?.current?.getBoundingClientRect()?.width / 2,
    toY:
      window.innerHeight / 2 -
      cardRef?.current?.getBoundingClientRect()?.height / 2,
  });
  const [show, showApi] = useSpring(() => ({
    from: { opacity: 0 },
    config: {
      duration: 400,
    },
  }));

  useIsomorphicLayoutEffect(() => {
    showApi.start({
      from: { opacity: show.opacity },
      to: { opacity: isOpen ? 1 : 0 },
    });
  }, [isOpen]);
  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0, width: "75px", height: "75px" },
  }));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDimensions({
        toX: window.innerWidth / 2 - 75 / 2,
        toY: window.innerHeight / 2 - 75 / 2,
      });
      window.addEventListener("resize", handleResize);
      return; // 👈️ return early if initial render
    }
    function handleResize() {
      setDimensions({
        toX: window.innerWidth / 2 - 150 / 2,
        toY: window.innerHeight / 2 - 150 / 2,
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    // console.log(api.current);
    isOpen
      ? setDimensions({
          toX: window.innerWidth / 2 - 150 / 2,
          toY: window.innerHeight / 2 - 150 / 2,
        })
      : null;
    api.start({
      config: {
        duration: 350,
      },
      from: {
        x: springs.x,
        y: springs.y,
        width: springs.width,
        height: springs.height,
      },
      to: {
        x: isOpen ? dimensions.toX : 0,
        y: isOpen ? dimensions.toY : 0,
        width: isOpen ? "150px" : "75px",
        height: isOpen ? "150px" : "75px",
      },
    });
  }, [isOpen, isOpen && dimensions]);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div
      style={
        isOpen
          ? {
              position: "absolute",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255,255,255,0.2)",
            }
          : null
      }
    >
      <animated.div
        ref={cardRef}
        className="Card"
        onClick={() => {
          handleClick();
        }}
        style={{ ...springs }}
      >
        <>
          <animated.div
            className={"CardContent" + isOpen ? "CardTitle" : "CardLabel"}
          >
            {isOpen ? "TITOLO" : "LABEL"}
          </animated.div>
          {/* {isOpen && ( */}
          <>
            <animated.div className="CardBody CardContent" style={show}>
              CORPO
            </animated.div>
            <animated.div className="CardFooter CardContent" style={show}>
              FOOTER
            </animated.div>
          </>
          {/* )} */}
        </>
      </animated.div>
    </div>
  );
}
