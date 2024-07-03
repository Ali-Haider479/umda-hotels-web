"use client";
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OnGoingOffers = () => {
    const isMobScreen = useMediaQuery("(max-width: 950px)");

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    const offers = [
        { imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-IL-nu_C-GTzdrfpgcJugfjwhY45zI9YcQ&s', title: 'Offer 1', discount: '20%' },
        { imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0nECPdhHsFDAKNfdhuyxYH3mj5u-K9jZOA&s', title: 'Offer 2', discount: '50%' },
        { imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUWnT9s3Zcs5tHKECB1HHHAcTNmRfwvb2nrFPquWAc1btloasCtJvQMTXWa2y5cGJ5aAo&usqp=CAU', title: 'Offer 3', discount: '70%' }
    ];

    return (
        <>
        {isMobScreen ?  <Box mt={2} mx={2}>
        <Typography textAlign={"center"} py={2} variant="h5" fontWeight={"bold"}>
        Ongoing Offers</Typography>
        <Slider {...settings}>
            {offers.map((offer, index) => (
                <Box key={index} p={0}>
                    <Box
                        component="img"
                        src={offer.imgSrc}
                        alt={offer.title}
                        sx={{ width: '100%', borderRadius: 2 }}
                    />
                    <Typography variant="h6" align="center">
                        {offer.title}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {offer.discount} off
                    </Typography>
                </Box>
            ))}
        </Slider>
    </Box> : null }
       </>
    );
}

export default OnGoingOffers;
