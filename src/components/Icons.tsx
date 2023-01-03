import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { useState } from "react";

declare interface IconProps {
  iconType?: string;
  icon?: string;
}

export default function Icons(
  props: IconProps & Omit<FontAwesomeIconProps, "icon">
) {
  const [fetchedIcon, setFetchedIcon] = useState<IconDefinition>();
  const [fetched, setFetched] = useState(false);
  // let a = {}
  let finalProps = { ...props };
  delete finalProps.iconType;
  delete finalProps.icon;

  import(
    /* webpackChunkName: "fonts/[request]" */
    `@fortawesome/free-${props.iconType}-svg-icons/${props.icon}.js`
  )
    .then((response) => {
      setFetched(true);

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
