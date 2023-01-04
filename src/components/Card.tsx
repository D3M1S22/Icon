import React, { useEffect, useState, useRef } from "react";
import {
  animated,
  useSpring,
  useTransition,
  Controller,
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

  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0 },
  }));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDimensions({
        toX:
          window.innerWidth / 2 -
          cardRef?.current?.getBoundingClientRect().width / 2,
        toY:
          window.innerHeight / 2 -
          cardRef?.current?.getBoundingClientRect().height / 2,
      });
      window.addEventListener("resize", handleResize);
      return; // 👈️ return early if initial render
    }
    function handleResize() {
      console.log(
        "width-window => " + window.innerWidth / 2,
        "element-width => " + cardRef?.current?.getBoundingClientRect().width ??
          1 / 2,
        "sottrazione => " +
          (window.innerWidth / 2 -
            cardRef?.current?.getBoundingClientRect().width ?? 1 / 2)
      );
      setDimensions({
        toX:
          window.innerWidth / 2 -
          cardRef?.current?.getBoundingClientRect().width / 2,
        toY:
          window.innerHeight / 2 -
          cardRef?.current?.getBoundingClientRect().height / 2,
      });
      console.log("resizing");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    api.start({
      config: {
        duration: 350,
      },
      from: {
        x: springs.x,
        y: springs.y,
      },
      to: {
        x: isOpen ? dimensions.toX : 0,
        y: isOpen ? dimensions.toY : 0,
      },
    });
  }, [isOpen, isOpen && dimensions]);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <animated.div
        ref={cardRef}
        className="Card"
        onClick={() => {
          handleClick();
        }}
        style={springs}
      >
        <>
          <animated.div className="CardTitle CardContent">TITOLO</animated.div>

          <animated.div className="CardBody CardContent">CORPO</animated.div>
          <animated.div className="CardFooter CardContent">FOOTER</animated.div>
        </>
      </animated.div>
    </>
  );
}
