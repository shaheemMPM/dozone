type CloseIconProps = {
  size?: number | string;
  color?: string;
  tooltip?: string;
};

const CloseIcon = ({
  size = 16,
  color = "#000000",
  tooltip = "Close Icon",
}: CloseIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="closeIconTitle"
    >
      <title id="closeIconTitle">{tooltip}</title>
      <g id="Menu / Close_LG">
        <path
          id="Vector"
          d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;
