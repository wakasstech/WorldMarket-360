import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Box,
  Chip,
  CardActions,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import SideBarBlogCard from "./SideBarBlogCard";
import PropTypes from "prop-types";
import axios from "../../../../../../axios/axios";
import { Diversity1, Edit } from "@mui/icons-material";
import { fetchAds } from "globalStore/Slices/adsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EditAdModal from "layouts/Blogs/ManageAds/Ads/new-product/components/EditAdModal";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";

const Sidebar = ({ brand, sidebarSections, relatedBlogs }) => {
  const dispatch = useDispatch();

  const { ads, loading } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  console.log(ads, "addsss");

  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tags = [
    "Boycott",
    "Product Reviews",
    "Consumer Rights",
    "Sustainability",
    "Ethical Shopping",
  ];
  useEffect(() => {
    axios
      .get(`/blog/getblogByBrand?brand=${brand}`)
      .then((response) => {
        setBlogs(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [brand]);

  return (
    <div>
      {/* {ads?.map(ad => (
      <div key={ad.id}>
          
          <Card sx={{ border: '1px solid #cbcbcb', mb: 3, opacity: 0.7 }}>

            
<Tooltip  title="Edit Category" placement="top" >
           <Edit sx={{marginTop: 1, marginLeft: 1, cursor: 'pointer' }} onClick={handleOpen}/>
            
          </Tooltip>
   
    <CardMedia
          component="img"
          height="140"
          image={ad?.image} // Replace with an appropriate image URL
          alt="Boycott Product Ad"
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>Boycott This Product</Typography>
          <Typography variant="body2">{ad?.description}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1, fontWeight: 800, color: 'black' }}>
           {ad?.title}
          </Typography>
        </CardContent>
      </Card>
      <EditAdModal open={open} onClose={handleClose} adData={ad} />

      </div>
    ))} */}

      {Array.isArray(sidebarSections) &&
        sidebarSections.map((sidebarSection, index) => (
          <div key={index}>
            {sidebarSection.type === "ads" ? (
              <div>
                <Card sx={{ border: "1px solid #cbcbcb", mb: 3, opacity: 0.7 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: "95%",
                      transform: "translateX(-100%)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      color: "red",
                      fontSize: 13
                    }}
                  >
                    Ad
                  </Typography>

                  {/* <Tooltip  title="Edit Ad" placement="top" >
           <Edit sx={{marginTop: 1, marginLeft: 1, cursor: 'pointer' }} onClick={handleOpen}/>
            
          </Tooltip> */}

                  {sidebarSection.content.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={sidebarSection.content.image} // Replace with an appropriate image URL
                      alt={sidebarSection.content.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Boycott This Product
                    </Typography>
                    <Typography variant="body2"> {sidebarSection.content.description}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1, fontWeight: 800, color: "black" }}
                    >
                      {sidebarSection.content.title}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div>
                <Card
                  sx={{
                    marginTop: 3,
                    boxShadow: 0,
                    borderRadius: 0,
                    mb: 3,
                    borderLeft: "1px solid #dfdfdf",
                    borderBottom: "1px solid #dfdfdf",

                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >

<Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "100%",
                      transform: "translateX(-100%)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      color: "red",
                      fontSize: 13
                    }}
                  >
                    Blog
                  </Typography>
                  {sidebarSection.content.image && (
                    <CardMedia
                      component="img"
                      height="110"
                      image={sidebarSection.content.image}
                      alt="Boycott Product Ad"
                      sx={{ borderRadius: 0, padding: 0, paddingLeft: 1, margin: 0 }}
                    />
                  )}

                  <Box display="flex" paddingLeft={1} alignItems="center" gap={2} mt={1} mb={0.2}>
                    {/* <Box
      sx={{
      
        display: 'flex',
        paddingLeft: 3,
        paddingTop: 1
      }}
    > */}

                    <Box
                      sx={{
                        bgcolor: "#B73439",
                        color: "#ffff",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      {sidebarSection.content.brand}
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "#B73439",
                        color: "#ffff",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      {sidebarSection.content?.category}
                    </Box>

                    {/* </Box> */}

                    {/* <Box mt={0.5} mr={3}>
       <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: 12 }}>
          <span style={{ fontWeight: 'bold', color: '#B73439' }}>Category:</span> {" "}
          {blog?.category}
        </Typography>
        </Box>  */}
                  </Box>

                  <CardContent sx={{ paddingLeft: 1, marginLeft: 0 }}>
                    <Typography variant="h6" gutterBottom>
                      {" "}
                      {sidebarSection.content.title}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={1} mb={1}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, color: "#b5afaf" }} />
                      <Typography variant="body2" color="text.secondary">
                        {sidebarSection.content.author}
                      </Typography>
                      <EventIcon fontSize="small" sx={{ mx: 1, color: "#b5afaf" }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(sidebarSection.content.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    {/* <Typography variant="body2">
{truncateText(blog.description, 100)}
</Typography> */}
                    <Link to={`/boycott/blog-details/${sidebarSection.content.id}`}>
                      <Box display="flex" justifyContent="flex-start" mt={1}>
                        <Button
                          sx={{
                            borderRadius: 8,
                            paddingLeft: 0,
                            marginLeft: 0,
                            color: "#42afb5",
                            textDecoration: "underline",
                          }}
                          size="small"
                        >
                          Read More
                        </Button>
                      </Box>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ))}

      {/* <Card sx={{ border: '1px solid #cbcbcb', mb: 3, opacity: 0.7 }}>
      <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFXpAHRQS7wr2kjJBRLEYRHpfV_HPxWJkfYQ&s" // Replace with an appropriate image URL
          alt="Boycott Product Ad"
        />
          <CardContent>
          <Typography variant="body2" gutterBottom>Boycott, Divestment and Sanctions is a nonviolent Palestinian-led movement promoting boycotts, divestments, and economic sanctions against Israel.</Typography>
          </CardContent>
         
        <Button size="small" sx={{color:"#42afb5"}}>See</Button>
     
        </Card> */}

      <Divider sx={{ my: 3 }} />
      <Box>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ color: "red", marginBottom: 1 }}
          gutterBottom
        >
          Popular Tags
        </Typography>
        <hr style={{ border: "1px solid red", marginTop: "8px", width: "50%", marginBottom: 22 }} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags && tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h5" fontWeight={800} sx={{color: 'red', marginBottom: 1}} gutterBottom>Similar Blogs</Typography>
        <hr style={{ border: '1px solid red', marginTop: '8px', width: '50%' }} />

        {/* {relatedBlogs.slice(5).map(blog => ( */}
        {relatedBlogs.map(blog => (
           <div key={blog.id}>
              
           <SideBarBlogCard blog={blog} />
          </div>
        ))}
      </Box>
    </div>
  );
};
Sidebar.propTypes = {
  brand: PropTypes.string,
  sidebarSections: PropTypes.array,
  relatedBlogs: PropTypes.array,
};
export default Sidebar;
