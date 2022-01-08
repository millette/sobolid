// npm
import type { JSX } from "solid-js/jsx-runtime"

// self
import AvatarItemV3 from "./avatar-item-v3"

export default function Body(props: {
  layers
  partsFileName: string
}): JSX.Element {
  return (
    <AvatarItemV3
      layers={props.layers}
      partsFileName="/sprites/whole-body.svg"
    />
  )
}
