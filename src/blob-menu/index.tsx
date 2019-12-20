import makeGoo from "../metaball/metaball";
import React, { Fragment, useRef, useState, useCallback } from "react";
import { Spring } from "react-spring/renderprops";
import { Point } from "../metaball/types/Point";
import { useSprings } from "react-spring";

const CENTER_POINT: Point = [600, 350];
const OPEN_POINT: Point = [300, 250];
const R1 = 100;
const R2 = 75;

type Props = {
  viewbox: {
    minX: number;
    minY: number;
    width: number;
    height: number;
  };
  center: [number, number];
  balls: [number, number][];
};

const BlobMenu: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const svgEl = useRef<SVGSVGElement>(null);
  const gEl = useRef<SVGGElement>(null);

  const { minX, minY, width, height } = props.viewbox;
  const { center, balls } = props;

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const ENDING_POINTS = balls;
  const STARTING_POINTS = balls.map(() => center);

  const BallAnimations = balls.map((ball, i) => (
    <Spring
      config={{ tension: 300, friction: 50, delay: i * i * 30 }}
      from={{ pos: center, opacity: 0 }}
      to={{ pos: isOpen ? ball : center, opacity: 1 }}
    >
      {animation => (
        <g>
          <circle cx={animation.pos[0]} cy={animation.pos[1]} r={R2} />
          <path d={makeGoo(R1, R2, center, animation.pos)} />
          <text
            x={animation.pos[0] - R2 / 2}
            y={animation.pos[1]}
            fillOpacity={animation.opacity}
            fill="red"
            fontFamily="sans-serif"
            fontSize="20px"
          >
            I love SVG!
          </text>
        </g>
      )}
    </Spring>
  ));

  return (
    <Fragment>
      <svg
        ref={svgEl}
        viewBox={`${minX} ${minY} ${width} ${height}`}
        onClick={handleOnClick}
      >
        <g ref={gEl}>
          <circle cx={center[0]} cy={center[1]} r={R1} />
        </g>

        {BallAnimations}
      </svg>
    </Fragment>
  );
};

export default BlobMenu;
