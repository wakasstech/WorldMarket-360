// import React, { useEffect, useState } from 'react';
// import { Grid, Typography } from '@mui/material';
// import BlogCard from './components/BlogCard ';
// import PropTypes from 'prop-types';

// import axios from 'axios';
// import BrandCell from 'layouts/Categories/new-product/category-list/components/BrandCell';
// import { Link } from 'react-router-dom';




//     const SimilarBlogCards = ({relatedBlogs}) => {

// //   const [blogs, setBlogs] = useState([]);
// // const [blogs, setBlogs] = useState([]);


//   // useEffect(() => {
//   //   axios.get(`https://boy.ranaafaqali.com/api/blog/getblogByBrand?brand=${brand}`)
//   //     .then(response => {
//   //       setBlogs(response.data.result);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching blog:', error);
//   //     });
//   // }, [brand]);

//   return (
//     <div style={{ marginTop: 60 }}>
// <Typography variant="h5" fontWeight={800} sx={{ color: 'red'}}>
//   Related Blogs
// </Typography>
// <hr style={{ border: '1px solid red', marginTop: '8px', width: '50%' }} />
  // <Grid container spacing={3} mt={1}>
  //   {relatedBlogs?.slice(0, 6).map(blog => (
  //     <Grid item xs={12} sm={6} key={blog.id}>
          
  //       <BlogCard blog={blog} similar={true} />
      
  //     </Grid>
  //   ))}
  // </Grid>
// </div>
//   );
// };

// SimilarBlogCards.propTypes = {
//   relatedBlogs: PropTypes.array

// };
// export default SimilarBlogCards;

import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types"; // Import PropTypes

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos, Edit } from "@mui/icons-material";
import "./components/sliderStyles.css";
import { Box, Typography, Card, CardMedia, CardContent, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BlogCardd from './components/BlogCard';



const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <ArrowForwardIos style={{ color: "white", fontSize: "24px" }} />
    </div>
  );
};

NextArrow.propTypes = {
  onClick: PropTypes.func, // Validate onClick as a function
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <ArrowBackIos style={{ color: "white", fontSize: "24px" }} />
    </div>
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func, // Validate onClick as a function
};

// BlogCard Component
// BlogCard Component
const BlogCard = ({ id, title, image, brand }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleEditClick = (event) => {
    event.preventDefault();
    const blogId = id;
    navigate('/boycott/edit-blog-detail', { state: { blogId } });
  };
  return (
    <Card sx={{
      maxWidth: 345,
    
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.03)',
      },
    }}>
      <CardMedia component="img" height="140" sx={{ borderRadius: 0, paddingLeft: 0, marginLeft: 0 }} image={image} alt={title} />
    
    
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>

      <Box sx={{ display: 'flex', paddingTop: 1 }}>
        <Box sx={{
          bgcolor: '#B73439',
          color: '#ffff',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }}>
          {brand}
        </Box>


      </Box>

      <Box >
            <Edit sx={{ cursor: 'pointer', color: '#B73439',  marginTop: 2 }} onClick={handleEditClick} />
          </Box>
          </Box>
      <CardContent sx={{ paddingLeft: 0 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
          <Link to={`/boycott/blog-details/${id}`}>
            <Box display="flex" justifyContent="flex-start" mt={1}>
              <Button sx={{ paddingLeft: 0, color: "#42afb5", textDecoration: 'underline' }} size="small">Read More</Button>
            </Box>
          </Link>
         
      </CardContent>
    </Card>
  );
};

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
};



const SimilarBlogCards = ({ relatedBlogs }) => {



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Showing 3 cards
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1, // Adjusted initialSlide
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: 60 }}>
      <Typography variant="h5" fontWeight={800} sx={{ color: 'red' }}>
        Related Blogs
      </Typography>
      <hr style={{ border: '1px solid red', marginTop: '8px', width: '50%' }} />

     
      
  {relatedBlogs.slice(0, 6).length > 2  ? (
   <div className="slider-container">
   <Slider {...settings}>
     {relatedBlogs.map((blog, index) => (
       <Box key={index} className="carousel-item">
         <BlogCard
         id={blog.id}
           title={blog.title}
           image={blog.image}
           brand={blog.brand}
         />
       </Box>
     ))}
   </Slider>
 </div>

 ) : 
 (
  <Grid container spacing={3} mt={1}>
    {relatedBlogs?.slice(0, 6).map(blog => (
      <Grid item xs={12} sm={6} key={blog.id}>
          
        <BlogCardd blog={blog} similar={true} />
      
      </Grid>
    ))}
  </Grid>
 )
 } 


   
      
    </div>
  );
};

SimilarBlogCards.propTypes = {
  relatedBlogs: PropTypes.array

};

export default SimilarBlogCards;
