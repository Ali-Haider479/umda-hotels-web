"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OnGoingOffers = () => {
    const isMobScreen = useMediaQuery("(max-width: 950px)");

    const offers = [
        { imgSrc: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', title: 'Offer 1', discount: '20%' },
        { imgSrc: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg", title: 'Offer 2', discount: '50%' },
        { imgSrc: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', title: 'Offer 3', discount: '70%' }
    ];
    
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1.1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            {isMobScreen ? (
                <Box mt={2} mx={2}>
                    <Typography  py={2} pb={2} fontWeight={"bold"}>
                        Ongoing Offers
                    </Typography>
                    <Slider {...settings}>
                        {offers.map((offer, index) => (
                            <Box key={index} p={0} sx={{ padding: '0 8px' }}>
                                <Box
                                    component="img"
                                    src={offer.imgSrc}
                                    alt={offer.title}
                                    sx={{ width: '350px', height:"200px", borderRadius: 2, paddingLeft:"20px"}}
                                />
                                <Typography textAlign="center" mt={1} ml={2} fontWeight="bold">
                                    {offer.title}
                                </Typography>
                                <Typography textAlign="center"  ml={2} color="primary">
                                    {offer.discount} OFF
                                </Typography>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            ) : null}
        </>
    );
}

export default OnGoingOffers;
