import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Container, Divider, Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from '../../../../../axios/axios';
import SimilarBlogCards from './SimilarBlogCards'
import Sidebar from './components/Sidebar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import ArgonBox from 'components/ArgonBox';
import { CalendarToday, Person, ShareOutlined } from '@mui/icons-material';
import ArgonTypography from 'components/ArgonTypography';
import { Image } from 'antd';



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";


const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [tags, setTags] = useState([]);
  const [sections, setSections] = useState([]);
  
  const [sidebarSections, setSidebarSections] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  console.log(relatedBlogs, 'relatedblogssssdetaillllllllll')

  const [brand, setBrand] = useState("");

  useEffect(() => {
    axios.get(`/blog/getblog?id=${id}`)

      .then(response => {
        const output = response.data;
        const blogData = response.data.blog;
        setBlog(blogData);
        setBrand(blogData.brand);
  
        try {
          // Log the raw tags string before parsing
          console.log('Raw tags string:', blogData.tags);
  
        
          const parsedSections = blogData.sections ? JSON.parse(blogData.sections) : [];
  
          setTags(blogData.tags);
          setSections(parsedSections);
          const sidebarSections= blogData.sidebarSections ? JSON.parse(blogData.sidebarSections) : [];
          setSidebarSections(sidebarSections);

          const relatedBlogs= output.similarBlogs ? output.similarBlogs : [];
          setRelatedBlogs(relatedBlogs);

          console.log(output.similarBlogs, 'relatedblogssssresPonseeeee')
          console.log('State tags:', parsedTags);
          console.log('tags array length:', parsedTags.length);
          console.log('tags array type:', Array.isArray(parsedTags));
        } catch (error) {
          console.error('Error parsing tags or sections:', error);
        }
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [id]);
  

  // useEffect(() => {
  //   axios.get(`https://boy.ranaafaqali.com/api/blog/getblogByBrand?brand=${brand}`)
  //     .then(response => {
  //       setBlog(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching blog:', error);
  //     });
  // }, [brand]);

  if (!blog) return <p>Loading...</p>;

  console.log('State tags:', tags,);
  console.log('tags array length:', tags.length);
  console.log('tags array type:', Array.isArray(tags));

  return (
    <DashboardLayout    sx={{
      backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
        `${linearGradient(
          rgba(gradients.info.main, 0.6),
          rgba(gradients.info.state, 0.6)
        )}, url(${bgImage})`,
      backgroundPositionY: "50%",
    }}>




<ArgonBox sx={{ backgroundColor: 'white' }}  mt={20}>
        <Container>
        <center><h1 style={{fontWeight: 'bold', color: '#ffff'}}>Blog Detail</h1></center> 
        </Container>
        </ArgonBox>
      <ArgonBox style={{ backgroundColor: '#ffff ' }} py={3} mt={9}>
        {blog ? (
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
                <Box>
                  <img src={blog?.image} alt={blog?.title} style={{ width: '100%', borderRadius: '8px' }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {Array.isArray(tags) && tags.map((tag, index) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: '#d96e72',
                        color: '#ffff',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {tag.toUpperCase()}
                    </Box>
                  ))}
                </Box>

                <Typography variant="h4" sx={{ mt: 2 }}>
                  {blog?.title}
                </Typography>
                <Box display="flex" alignItems="center" mt={1} mb={4}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person fontSize="small" sx={{ mr: 0.5, color: '#9f9797' }} />
                    by {blog?.author}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, color: '#9f9797' }} />
                    {new Date(blog?.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={1} mb={4}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: 15 }}>
                    <span style={{ fontWeight: 'bold', color: '#B73439' }}>Category:</span> {" "}
                    {blog?.category}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{  ml: 2.5,fontStyle: 'italic', fontSize: 15 }}>
                    <span style={{ fontWeight: 'bold', color: '#B73439' }}>Brand:</span> {" "}
                    {blog?.brand}
                  </Typography>

                  

                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2.5, display: 'flex', alignItems: 'center', padding: '2px 6px', backgroundColor: '#344767', borderRadius: 3, border: '1px solid #9f9797', color: '#ffff' }}>
                    <ShareOutlined fontSize="small" sx={{ color: '#ffff' }} /> {" "} Share
                  </Typography>
                </Box>

                

                {/* {Array.isArray(sections) && sections.map((section, index) => (
                  <div key={index}>
                    {section.type === 'text' && (
                      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                  </div>
                ))} */}
                 {Array.isArray(sections) && sections.map((section, index) => (
      <div key={index}>
        {section.type === 'text' && (
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: section.content }} />
        )}
        
         {section.type === 'images' && (
              <Box
              mt={4}
              sx={{
                maxHeight: '500px', // Set a fixed height for the container
                overflowY: 'auto',  // Enable vertical scrolling if needed
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',      // Allows images to wrap to the next line
                  gap: '3px',            // Space between images
                  
                }}
              >
                {section.content.map((url, imgIndex) =>
                  url.endsWith('.mp4') ? null : (
                    <Image
                      key={imgIndex}
                      src={url}
                      alt={`section-image-${imgIndex}`}
                      style={{
                        borderRadius: '8px',
                        width: '80%', // Each image takes 50% of the row's width minus the gap
                        marginBottom: '8px',
                      }}
                      preview={{ mask: "Click to Zoom" }}
                    />
                  )
                )}
              </div>

              {/* Render the video below the images */}
              {section.content.map((url, vidIndex) => (
                url.endsWith('.mp4') && (
                  <Box mt={4} key={vidIndex}>
                    <video
                      controls
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )
              ))}
            </Box>
          )}

{section.type === 'ads' && (
      <Box mt={4} display="flex" justifyContent="center">
        
        

        <Card sx={{ width: '400px', border: '1px solid #cbcbcb', mb: 3, opacity: 0.7, cursor: 'pointer' }}>
        <Typography 
        variant="body2" 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          left: '95%', 
          transform: 'translateX(-100%)', 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: '2px 8px', 
          borderRadius: '4px', 
          fontWeight: 'bold' ,
          color: 'red'
        }}
      >
        Ad
      </Typography>
            
{/* <Tooltip  title="Edit Category" placement="top" >
           <Edit sx={{marginTop: 1, marginLeft: 1, cursor: 'pointer' }} onClick={handleOpen}/>
            
          </Tooltip> */}
         
   {section.content.image && (
    
    <CardMedia
          component="img"
          height="140"
          image={section.content.image} // Replace with an appropriate image URL
          alt={section.content.title}
        />
   )}
        <CardContent>
          <Typography variant="h6" gutterBottom>Boycott This Product</Typography>
          <Typography variant="body2"> {section.content.description}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1, fontWeight: 800, color: 'black' }}>
          {section.content.title}
          </Typography>
        </CardContent>
      </Card>
      </Box>
    )}
      </div>
    ))}
                <Divider sx={{ my: 3 }} />

                <SimilarBlogCards relatedBlogs={relatedBlogs} />
              </Grid>

              <Grid item xs={12} md={3}>
                <Sidebar brand={brand} sidebarSections={sidebarSections} relatedBlogs={relatedBlogs}/>
              </Grid>
            </Grid>
          </Container>
        ) : null}
      </ArgonBox>
    </DashboardLayout>
  );
};

export default BlogDetailPage;
