import { Variants } from "framer-motion"

export const show = {
  opacity: 1,
  display: 'block',
}

export const hide = {
  opacity: 0,
  transitionEnd: {
    display: 'none',
  },
}

export const animateVisibility: Variants = {
  initial: hide,
  animate: show,
}