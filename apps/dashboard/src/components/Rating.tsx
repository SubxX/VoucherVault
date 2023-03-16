import React, { useState } from 'react';
import { Box, Stack, Text, Icon } from '@chakra-ui/react';

const Rating = React.forwardRef(
  (
    {
      size = 18,
      icon,
      scale = 1,
      fillColor,
      strokeColor,
    }: {
      size?: number;
      icon: string;
      scale?: number;
      fillColor: string;
      strokeColor: string;
    },
    ref: any
  ) => {
    const [rating, setRating] = useState(0);
    const buttons = [];

    const onClick = (idx?: any) => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
        }
      }
    };

    const RatingIcon = ({ fill }: { fill: any }) => {
      return (
        <Icon
          name={icon}
          //   size={`sm`}
          color={fillColor}
          stroke={strokeColor}
          onClick={onClick}
          display="block"
          fillOpacity={fill ? '100%' : '0'}
        />
      );
    };

    const RatingButton = ({ idx, fill }: { idx: number; fill: boolean }) => {
      return (
        <Box
          // as="button"
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          //   variant="unstyled"
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack justify="start" isInline>
        {/* <input name="rating" type="hidden" value={rating} ref={ref} /> */}
        {buttons}
        {/* <Box width={`${size * 1.5}px`} textAlign="center">
          <Text fontSize="sm" textTransform="uppercase">
            Rating
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
            {rating}
          </Text>
        </Box> */}
      </Stack>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;
