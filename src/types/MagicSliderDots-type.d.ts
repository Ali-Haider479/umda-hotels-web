declare module "react-magic-slider-dots" {
  import { ComponentType } from "react";

  interface MagicSliderDotsProps {
    dots?: any;
    numDotsToShow?: number;
    dotWidth?: number;
  }

  const MagicSliderDots: ComponentType<MagicSliderDotsProps>;
  export default MagicSliderDots;
}
