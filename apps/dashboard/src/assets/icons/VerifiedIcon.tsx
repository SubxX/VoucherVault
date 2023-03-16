import { Icon } from '@chakra-ui/icon';
const VerifiedIcon = ({
  color = '#09E439',
  size = '20px',
}: {
  color?: string;
  size?: string;
}) => {
  return (
    <Icon width={size} height={size} viewBox="0 0 20 18" fill="none">
      <path
        d="M19.1667 9L17.1333 6.675L17.4167 3.6L14.4083 2.91667L12.8333 0.25L10 1.46667L7.16668 0.25L5.59168 2.90833L2.58334 3.58333L2.86668 6.66667L0.833344 9L2.86668 11.325L2.58334 14.4083L5.59168 15.0917L7.16668 17.75L10 16.525L12.8333 17.7417L14.4083 15.0833L17.4167 14.4L17.1333 11.325L19.1667 9ZM8.40834 12.9333L5.24168 9.75833L6.47501 8.525L8.40834 10.4667L13.2833 5.575L14.5167 6.80833L8.40834 12.9333Z"
        fill={color}
      />
    </Icon>
  );
};

export default VerifiedIcon;
