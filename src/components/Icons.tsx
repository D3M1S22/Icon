import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import React from "react";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useState } from "react";

declare interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  iconType?: string;
  icon?: string;
}

export default function Icons(props: IconProps) {
  const [fetchedIcon, setFetchedIcon] = useState<IconDefinition>();
  const [fetched, setFetched] = useState(false);
  let finalProps = {};
  Object.entries(props).map(([key, val]) => {
    if (key !== "iconType" && key !== "icon") finalProps[key] = val;
  });

  import(
    /* webpackChunkName: "fonts/[request]" */
    `@fortawesome/free-${props.iconType}-svg-icons/${props.icon}.js`
  )
    .then((response) => {
      setFetched(true);
      console.log(response);
      if (response && response.definition) {
        setFetchedIcon(response.definition);
        library.add(response.definition);
      }
    })
    .catch((error: string) => {
      throw new Error(error);
    });

  return (
    <>
      {fetched ? (
        <FontAwesomeIcon icon={fetchedIcon} {...finalProps} />
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}
