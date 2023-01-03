import React, { useCallback, useState } from "react";
import { animated, useSpring, useTransition } from "react-spring";

declare interface CardProps {
  titolo: string | Element;
  corpo: string | Element;
  footer: string | Element;
}

export default function Card() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDialogChange = (isOpen: boolean) => setIsOpen(isOpen);

  //   function tryHandle(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  //     setIsOpen(isOpen);
  //   }

  const tryHandle = useCallback((): any => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const transition = useSpring({
    from: {
      scale: 1,
      opacity: 1,
    },
    to: {
      scale: 2,
      opacity: 1,
    },
  });

  return (
    <>
      <animated.div className="Card" onMouseDown={tryHandle}>
        <>
          <animated.div style={transition} className="CardTitle CardContent">
            TITOLO
          </animated.div>

          <animated.div style={transition} className="CardBody CardContent">
            CORPO
          </animated.div>
          <animated.div style={transition} className="CardFooter CardContent">
            FOOTER
          </animated.div>
        </>
      </animated.div>
    </>
  );
}
