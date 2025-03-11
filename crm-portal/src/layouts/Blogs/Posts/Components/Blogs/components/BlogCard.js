import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Icon } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { Edit, FlagCircleSharp } from '@mui/icons-material';

const BlogCard = ({ blog, similar }) => {
const navigate = useNavigate();
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  
  const handleEditClick = (event) => {
    event.preventDefault();
    const blogId = blog?.id;
    navigate('/boycott/edit-blog-detail', { state: { blogId } });
  };
  
  return (

    
    <Card   sx={{
      display: 'flex',
      boxShadow: 2,
      mb: 2,
      // border: '1px solid #dfdfdf',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.03)',
        // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
    }}>
     
     
 
    

      <CardMedia
        component="img"
        height="140"
        image={blog.image}
        alt={blog.title}
      />
      


<Box display="flex"  alignItems="center" gap={1} mt={1} mb={0.5}>
              <Box
                sx={{
                
                  display: 'flex',
                  paddingLeft: 3,
                  paddingTop: 1
                }}
              >

               <Box
                   
                   sx={{
                     bgcolor: '#B73439',
                     color: '#ffff',
                     px: 1,
                     py: 0.5,
                     borderRadius: 1,
                     fontSize: '0.75rem',
                     fontWeight: 'bold',
                   }}
                 >
                   {blog?.brand}
                 </Box>



              </Box>
              <Box
                sx={{
                
                  display: 'flex',
                  // paddingLeft: 3,
                  paddingTop: 1
                }}
              >

               <Box
                   
                   sx={{
                     bgcolor: '#B73439',
                     color: '#ffff',
                     px: 1,
                     py: 0.5,
                     borderRadius: 1,
                     fontSize: '0.75rem',
                     fontWeight: 'bold',
                   }}
                 >
                  {blog?.category}
                 </Box>



              </Box>
                 

              
                
              
                

                  
                </Box>


        <CardContent>
            <Box display="flex" alignItems="center" mt={1} mb={1}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: '#b5afaf' }} />
          <Typography variant="body2" color="text.secondary">
            {blog.author}
          </Typography>
          <EventIcon fontSize="small" sx={{ mx: 1, color: '#b5afaf' }} />
          <Typography variant="body2" color="text.secondary">
            {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
          <Typography variant="h6" gutterBottom>      {blog.title}</Typography>
          <Typography variant="body2">
          {truncateText(blog.description, 100)}
          </Typography>

<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Link to={`/boycott/blog-details/${blog.id}`}>
    <Box display="flex" justifyContent="flex-end" mt={1}>
    <Button sx={{borderRadius: 8, border: "1px solid #acacb7", color:"#42afb5"}} size="small" >Read More</Button>
    </Box>
  </Link>

  <Box >
     <Edit sx={{ cursor: 'pointer' , color: '#B73439'}} onClick={handleEditClick} />
     </Box> 
     </Box>   
        </CardContent>
    </Card>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  similar: PropTypes.bool
};

export default BlogCard;
