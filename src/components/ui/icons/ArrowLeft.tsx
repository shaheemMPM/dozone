type ArrowLeftIconProps = {
  size?: number | string;
  color?: string;
  tooltip?: string;
};

const ArrowLeftIcon = ({
  size = 16,
  color = "#000000",
  tooltip = "Arrow Left Icon",
}: ArrowLeftIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="arrowLeftIconTitle"
    >
      <title id="arrowLeftIconTitle">{tooltip}</title>
      <path
        d="M19 12H5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19L5 12L12 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
