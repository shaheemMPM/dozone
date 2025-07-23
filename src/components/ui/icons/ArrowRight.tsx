type ArrowRightIconProps = {
  size?: number | string;
  color?: string;
  tooltip?: string;
};

const ArrowRightIcon = ({
  size = 16,
  color = "#000000",
  tooltip = "Arrow Right Icon",
}: ArrowRightIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="arrowRightIconTitle"
    >
      <title id="arrowRightIconTitle">{tooltip}</title>
      <path
        d="M5 12H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
