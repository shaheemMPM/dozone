type CheckListIconProps = {
  size?: number | string;
  color?: string;
  tooltip?: string;
};

const CheckListIcon = ({
  size = 16,
  color = "#000000",
  tooltip = "Check List Icon",
}: CheckListIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="checkListIconTitle"
    >
      <title id="checkListIconTitle">{tooltip}</title>
      <path
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="2" cy="6" r="1" fill={color} />
      <circle cx="2" cy="10" r="1" fill={color} />
      <circle cx="2" cy="14" r="1" fill={color} />
      <circle cx="2" cy="18" r="1" fill={color} />
    </svg>
  );
};

export default CheckListIcon;
