import React from 'react'
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Icon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { Edit } from '@mui/icons-material';


const SideBarBlogCard = ({ blog }) => {
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


 


        <Card sx={{ marginTop: 3,  boxShadow: 0,borderRadius: 0, mb: 3, borderLeft: '1px solid #dfdfdf', borderBottom: '1px solid #dfdfdf' ,

          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
          }
        }}>
        <CardMedia
          component="img"
          height="110"
          image={blog.image}
          alt="Boycott Product Ad"
          sx={{borderRadius: 0, padding: 0, paddingLeft: 1, margin: 0,}}    
              />


              
              <Box display="flex" paddingLeft={1}  alignItems="center" gap={2} mt={1} mb={0.2}>
              {/* <Box
                sx={{
                
                  display: 'flex',
                  paddingLeft: 3,
                  paddingTop: 1
                }}
              > */}

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



              {/* </Box> */}
                 
                 {/* <Box mt={0.5} mr={3}>
                 <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: 12 }}>
                    <span style={{ fontWeight: 'bold', color: '#B73439' }}>Category:</span> {" "}
                    {blog?.category}
                  </Typography>
                  </Box>  */}

                  
                </Box> 





        <CardContent sx= {{paddingLeft: 1, marginLeft: 0}}>
          <Typography variant="h6" gutterBottom>      {blog.title}</Typography>

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

        
          <Typography variant="body2">
          {truncateText(blog.description, 100)}
          </Typography>

          <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>

          <Link to={`/boycott/blog-details/${blog.id}`}>
    <Box display="flex" justifyContent="flex-start" mt={1}>
    <Button sx={{borderRadius: 8, paddingLeft: 0, marginLeft: 0, color:"#42afb5", textDecoration: 'underline'}} size="small" >Read More</Button>
    </Box>
    </Link>
    <Box >
     <Edit sx={{ cursor: 'pointer' , color: '#B73439'}} onClick={handleEditClick} />
     </Box> 
     </Box>
 
          
        </CardContent>
       
      </Card>
  )
}
SideBarBlogCard.propTypes = {
    blog: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
    similar: PropTypes.bool
  };
export default SideBarBlogCard
