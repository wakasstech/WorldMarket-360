import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Card,
  CardContent,
  Box,
  CircularProgress,
  CardMedia,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import FormField from "layouts/Categories/new-product/components/FormField";
import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import BlogMedia from "./Media/BlogMedia";
import { Close } from "@mui/icons-material";
import BlogMediaMultiple from "./Media/BlogMediaMultiple";
import axios from "../../../../../axios/axios";
import { useSelector } from "react-redux";
import ArgonSelect from "components/ArgonSelect";
import { fetchBrands } from "globalStore/Slices/categoriesSlice";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchAds } from "globalStore/Slices/adsSlice";

const BlogEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.categories);
  const { ads } = useSelector((state) => state.ads);

  const [loading, setLoading] = useState(false); // Loading state

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [sections, setSections] = useState([]);

  //Sidebar content blogs

  const [blogs, setBlogs] = useState([]);


  // Sidebar content
  const [sidebarSections, setSidebarSections] = useState([]);

  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedAds, setSelectedAds] = useState({}); // State to track selected ads by section index

  // Sidebar content
  const [selectedAdsSidebar, setSelectedAdsSidebar] = useState({}); // State to track selected ads by section index
  const [selectedBlogsSidebar, setSelectedBlogsSidebar] = useState({}); // State to track selected ads by section index

  const [array, setArray] = useState([]);
  console.log(categories, "categoryyy");
  const [anchorEl, setAnchorEl] = useState(null);

  // Sidebar content
  const [anchorElSidebar, setAnchorElSidebar] = useState(null);

  const categoryOptions =
    categories.length > 0
      ? categories.map((category) => ({
          value: category.name,
          label: category.name,
        }))
      : [];

  const brandOptions =
    brands.length > 0
      ? brands.map((brand) => ({
          value: brand.name,
          label: brand.name,
        }))
      : [];

  const handleChangeCategory = (selected) => {
    setCategory(selected.label); // Set the selected category name
  };
  const handleChangeBrand = (selected) => {
    setBrand(selected.label); // Set the selected category name
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //Sidebar content
  const handleMenuClickSidebar = (event) => {
    setAnchorElSidebar(event.currentTarget);
  };
  const handleMenuCloseSidebar = () => {
    setAnchorElSidebar(null);
  };
  /////////////////////

  // const handleAddSection = (type) => {
  //   setSections([
  //     ...sections,
  //     { type, content: type === "text" || type === "quote" || type === "ads" ? "" : [] },
  //   ]);
  //   setAnchorEl(null);
  // };
  const handleAddSection = (type) => {
    setSections([
      ...sections,
      { type, content: type === "text" || type === "quote" || type === "ads" ? "" : [] },
    ]);
    setAnchorEl(null);
  
    // Reset any previously selected ads if necessary
    setSelectedAds((prevSelectedAds) => {
      const updatedSelectedAds = { ...prevSelectedAds };
      const newIndex = sections.length; // New section index
      delete updatedSelectedAds[newIndex]; // Clear selection for the new index if any
      return updatedSelectedAds;
    });
  };
  

  //Sidebar content
  const handleAddSectionSidebar = (type) => {
    setSidebarSections([
      ...sidebarSections,
      { type, content: type === "ads" || type === "similarBlog" ? "" : [] },
    ]);
    setAnchorElSidebar(null);

// Reset any previously selected ads if necessary
setSelectedAdsSidebar((prevSelectedAds) => {
  const updatedSelectedAdsSidebar = { ...prevSelectedAds };
  const newIndex = sidebarSections.length; // New section index
  delete updatedSelectedAdsSidebar[newIndex]; // Clear selection for the new index if any
  return updatedSelectedAdsSidebar;
});

// Reset any previously selected ads if necessary
setSelectedBlogsSidebar((prevSelectedAds) => {
  const updatedSelectedBlogSidebar = { ...prevSelectedAds };
  const newIndex = sidebarSections.length; // New section index
  delete updatedSelectedBlogSidebar[newIndex]; // Clear selection for the new index if any
  return updatedSelectedBlogSidebar;
});
    
  };
  ///////////////

  const handleSectionContentChange = (content, index) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, content } : section
    );
    setSections(updatedSections);
  };

  //Sidebar content
  const handleSectionContentChangeSidebar = (content, index) => {
    const updatedSections = sidebarSections.map((section, i) =>
      i === index ? { ...section, content } : section
    );
    setSidebarSections(updatedSections);
  };
  ////////////////

  // const handleDeleteSection = (index) => {
  //   setSections(sections.filter((_, i) => i !== index));
  // };
  const handleDeleteSection = (index) => {
    // Remove the section from the sections array
    setSections(sections.filter((_, i) => i !== index));
  
    // Remove the selected ad for the deleted section
    setSelectedAds((prevSelectedAds) => {
      const updatedSelectedAds = { ...prevSelectedAds };
      delete updatedSelectedAds[index]; // Remove the specific index
      return updatedSelectedAds;
    });
    
  };
  

  //Sidebar content
  const handleDeleteSectionSidebar = (index) => {

    setSidebarSections(sidebarSections.filter((_, i) => i !== index));
  
    // Remove the selected ad for the deleted section
    setSelectedAdsSidebar((prevSelectedAds) => {
      const updatedSelectedAdsSidebar = { ...prevSelectedAds };
      delete updatedSelectedAdsSidebar[index]; // Remove the specific index
      return updatedSelectedAdsSidebar;
    });

    setSelectedBlogsSidebar((prevSelectedAds) => {
      const updatedSelectedBlogsSidebar = { ...prevSelectedAds };
      delete updatedSelectedBlogsSidebar[index]; // Remove the specific index
      return updatedSelectedBlogsSidebar;
    });
  };
  ///////////////////

  const handleImageChange = (fileList) => {
    setImage(fileList.length > 0 ? fileList[0]?.originFileObj : null);
  };

  const handleSectionImageChange = (fileList, index) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, content: fileList.map((file) => file.originFileObj) } : section
    );
    setSections(updatedSections);
    // Update the allImages state with the new images
    const updatedImages = fileList.map((file) => file);
    setArray((prevImages) => [...prevImages, ...updatedImages]);
  };

  const handleSelectAd = (ad, index) => {
    setSelectedAds((prevSelectedAds) => ({
      ...prevSelectedAds,
      [index]: ad.id, // Set the selected ad's ID for the specific section index
    }));

    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, content: ad } : section
    );
    setSections(updatedSections);
  };

  //Sidebar content
  const handleSelectAdSidebar = (ad, index) => {
    setSelectedAdsSidebar((prevSelectedAds) => ({
      ...prevSelectedAds,
      [index]: ad.id, // Set the selected ad's ID for the specific section index
    }));

    const updatedSections = sidebarSections.map((section, i) =>
      i === index ? { ...section, content: ad } : section
    );
    setSidebarSections(updatedSections);
  };

  const handleSelectBlogsSidebar = (blog, index) => {
    setSelectedBlogsSidebar((prevSelectedBlogs) => ({
      ...prevSelectedBlogs,
      [index]: blog.id, // Set the selected ad's ID for the specific section index
    }));

    const updatedSections = sidebarSections.map((section, i) =>
      i === index ? { ...section, content: blog } : section
    );
    setSidebarSections(updatedSections);
  };
 

  /////////////////////////

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchAds());
  }, [dispatch]);

  // useEffect(() => {
  //   axios.get(`https://boy.ranaafaqali.com/api/blog/getAllBlog`)
  //     .then(response => {
  //       setBlogs(response.data.result);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching blogs:', error);
  //     });
  // }, [brand]);
  useEffect(() => {
    axios.get(`/blog/getblogByBrand?brand=${brand}`)
      .then(response => {
        setBlogs(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [brand]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedSections = Array.from(sidebarSections);
    const [removed] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, removed);

    setSidebarSections(reorderedSections);
  };

  const handleSubmit = async () => {


console.log(sidebarSections)

    setLoading(true); // Set loading state to true when starting the request

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("tags", JSON.stringify(tags));
    formData.append("author", author);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("sections", JSON.stringify(sections));
    formData.append("sidebarSections", JSON.stringify(sidebarSections));

    sections.forEach((section, index) => {
      if (section.type === "images") {
        section.content.forEach((file, fileIndex) => {
          formData.append(`sections[${index}].content[${fileIndex}]`, file);
        });
      } else {
        formData.append(`sections[${index}].content`, section.content);
      }
      formData.append(`sections[${index}].type`, section.type);
    });


   
    try {
      const response = await axios.post("/blog/createNewBlog", formData, {

        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper content type
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Blog posted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/boycott/blogs-list"); // Navigate to the blog list page
          }
        });
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem creating the blog post.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <Container sx={{ paddingBottom: 4 }} maxWidth="md" className="blog-editor-container">
      <Typography variant="h4" gutterBottom>
        Create New Blog Post
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <BlogMedia handleImageChange={handleImageChange} />

          <FormField
            type="text"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            multiline
            rows={1}
            style={{ width: "100%", marginTop: "8px" }}
          />

          <FormField
            type="text"
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            style={{ width: "100%", marginTop: "8px" }}
          />

          <FormField
            type="text"
            label="Author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: "100%", marginTop: "8px" }}
          />

          <ArgonBox mb={3}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Category
              </ArgonTypography>
            </ArgonBox>
            <ArgonSelect
              name="category"
              value={categoryOptions.find((option) => option.label === category)}
              onChange={handleChangeCategory}
              options={categoryOptions}

              // isSearchable ={false} // Prevent users from typing their own values
            />
          </ArgonBox>

          <ArgonBox mb={3}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Brand
              </ArgonTypography>
            </ArgonBox>
            <ArgonSelect
              name="brand"
              // value={brandOptions.find(option => option.label === brand)}
              // onChange={(selected) => handleChangeBrand({ target: { name: "brand", value: selected.value } })}

              value={brandOptions.find((option) => option.label === brand)}
              onChange={handleChangeBrand}
              options={brandOptions}

              // isSearchable ={false} // Prevent users from typing their own values
            />
          </ArgonBox>

          <ArgonBox>
            <ArgonTypography component="label" variant="caption" fontWeight="bold">
              Tags
            </ArgonTypography>
            <ArgonBox display="flex" alignItems="center" mb={2} gap={2}>
              <ArgonInput
                placeholder="Add a new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag();
                  }
                }}
              />
              <ArgonButton
                              variant="contained"
                              color="info" onClick={handleAddTag} ml={2}>
                Add
              </ArgonButton>
            </ArgonBox>
            <ArgonBox display="flex" flexWrap="wrap" gap={1.5}>
              {tags.map((tag, index) => (
                <ArgonBox
                  key={index}
                  borderRadius="lg"
                  px={1.5}
                  py={0.8}
                  display="flex"
                  alignItems="center"
                  sx={{ border: "1px solid #c1bcbc", background: "black" }}
                >
                  <ArgonTypography variant="caption" fontWeight="medium">
                    <span style={{ color: "white" }}>{tag}</span>
                  </ArgonTypography>
                  <Close
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => handleRemoveTag(tag)}
                  />
                </ArgonBox>
              ))}
            </ArgonBox>
          </ArgonBox>

          {sections.map((section, index) => (
            <Card
              sx={{
                backgroundColor: "white",
                my: 1,

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                boxShadow: "none",
              }}
              key={index}
            >
              <CardContent sx={{ flexGrow: 1, boxShadow: "none" }}>
                {section.type === "text" || section.type === "quote" ? (
                  <ReactQuill
                    theme="snow"
                    value={section.content}
                    onChange={(content) => handleSectionContentChange(content, index)}
                  />
                ) : section.type === "images" ? (
                  <BlogMediaMultiple
                    handleImageChange={(fileList) => handleSectionImageChange(fileList, index)}
                    initialImage={section.content.length > 0 ? section.content[0]?.url : null}
                  />
                ) : (
                  <Grid container spacing={1.5}>
                    {ads.map((ad) => (
                      <Grid item xs={12} md={6} key={ad.id}>
                        <Card onClick={() => handleSelectAd(ad, index)}
                          sx={{
                            display: "flex",
                            boxShadow: 4,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            // padding: 1,
                            border: selectedAds[index] === ad.id ? "3px solid #11CDEF" : "none",
                            cursor: "pointer",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                              transform: "scale(1.03)",
                              border: '3px solid #11CDEF'
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              marginTop: 0,
                              paddingTop: 0,
                              height: 50,
                              marginRight: 0,
                              borderRadius: 0,
                            }}
                            image={ad?.image} // Ensure the correct path for the ad image
                            alt="Ad image"
                          />
                          <CardContent>
                            <Typography fontSize={12} fontWeight="bold">
                              {ad?.title}
                            </Typography>
                            {/* <Typography variant="body2">{ad?.description}</Typography> */}
                            <Button
                              sx={{ paddingLeft: 0, marginLeft: 0 }}
                              
                            >
                              Select Ad
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
              <IconButton
                onClick={() => handleDeleteSection(index)}
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Card>
          ))}

          <Box sx={{ my: 2 }}>
            
            <Box display="flex" justifyContent="center" flexDirection="row" alignItems="center" gap={1}>
             <IconButton sx={{border: '1px solid #344767'}} onClick={handleMenuClick}>
              <AddIcon color="#344767"/> 
            </IconButton>
            Add More Content
             </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleAddSection("text")}>Text</MenuItem>
              <MenuItem onClick={() => handleAddSection("images")}>Media</MenuItem>
              <MenuItem onClick={() => handleAddSection("ads")}>Ads</MenuItem>
              <MenuItem onClick={() => handleAddSection("quote")}>Quote</MenuItem>
            </Menu>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} sx={{ overflow: 'auto' }}>

        <center>
                            <p style={{fontSize: 18, color: 'grey'}}>Sidebar Content</p>
                          </center>
                          <center>
                            <p style={{fontSize: 12, color: 'orangered', fontStyle: 'italic'}}>Drag and drop functionality for the sidebar content is available.</p>
                          </center>
                          <DragDropContext onDragEnd={onDragEnd}>     
                          <Droppable droppableId="sidebarSections">
                          {(provided) => (
            <Box
              container
              justifyContent="center"
              {...provided.droppableProps}
              ref={provided.innerRef}

            >
              <Box  >
          {sidebarSections.map((section, index) => (
            <Draggable
            key={index}
            draggableId={`section-${index}`}
            index={index}
          >
            {(provided, snapshot) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                sx={{
                  my: 2,
                
                  border: snapshot.isDragging ? "4px dashed #dcdcdc" : "2px dashed #dcdcdc",
                  boxShadow: snapshot.isDragging ? "0px 4px 12px rgba(0, 0, 0, 0.2)" : "none",
                  // transition: "border 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    borderWidth:  "4px",
                  },
                }}
              >
              <CardContent>
                {section.type === "ads" && (
                  <Grid container spacing={1}>
                    {ads.map((ad) => (
                      <Grid item xs={12} key={ad.id}>
                        <Card
                          sx={{
                            display: "flex",
                            boxShadow: 4,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            // padding: 1,
                            border:
                              selectedAdsSidebar[index] === ad.id ? "3px solid #11CDEF" : "none",
                            cursor: "pointer",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                              transform: "scale(1.03)",
                              border: '3px solid #11CDEF'
                            },
                          }}
                          onClick={() => handleSelectAdSidebar(ad, index)}
                        >
                          <CardMedia
                            component="img"
                            sx={{ height: 40, borderRadius: 0 }}
                            image={ad.image}
                            alt={ad.title}
                          />
                          <CardContent sx={{marginLeft: 0, paddingLeft: 0}}>
                            <Typography fontSize={12}>{ad.title}</Typography>
                            {/* <Typography variant="body2">{ad.description}</Typography> */}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}


           {section.type === "similarBlog" && (
            <>
                 
                 {blogs.length > 0 ? (
                     <Grid container spacing={1.5} >
                    
                    

                     {blogs.map((blog) => (
                       <Grid item xs={12} sm={6} md={4} key={blog.id}>
                           
                         <Card
                           sx={{
                             display: "flex",
                             boxShadow: 4,
                             flexDirection: "column",
                             borderRadius:2,
                             border: '1px solid grey',
                             paddingBottom: 0,
                             // alignItems: "center",
                             // justifyContent: "flex-start",
                             // padding: 1,
                             border:
                               selectedBlogsSidebar[index] === blog.id ? "3px solid #11CDEF" : "none",
                             cursor: "pointer",
                             transition: "transform 0.3s, box-shadow 0.3s",
                             "&:hover": {
                               transform: "scale(1.03)",
                               border: '3px solid #11CDEF'
                             },
                           }}
                           onClick={() => handleSelectBlogsSidebar(blog, index)}
                         >
                           <CardMedia
                             component="img"
                             sx={{ height: 40, borderRadius: 0, padding: 0, margin: 0 }}
                             image={blog.image}
                             alt={blog.title}
                           />
                           <CardContent sx={{margin: 0, padding: 0,paddingLeft: 0.5, paddingTop: 0.5}}>
                             <Typography sx={{
                               fontWeight: 600,
                               color: '#a11d17',
                               fontSize:10
                             }} fontSize={12}>{blog.title}</Typography>
 
 <Typography  color="text.secondary" sx={{ fontStyle: 'italic', fontSize: 9 }}>
                     <span style={{ fontWeight: 'bold', color: '#B73439' }}>Brand:</span> {" "}
                     {blog?.brand}
                   </Typography>
                           </CardContent>
                         </Card>
                       </Grid>
                      
                     ))}
                   </Grid>
                  ) : 
                  (
                    <Typography fontSize={12}> 
                  There was no blog found. Enter your brand first to select or add related blogs.
                    </Typography>
                  )}
                     
                 
                  </>
                )}
                {/* Add similar UI for "similarBlog" */}
              </CardContent>
              
             
              <IconButton
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <DeleteIcon fontSize="small" onClick={() => handleDeleteSectionSidebar(index)}/>
              </IconButton>
              <hr style={{ border: '1px solid #dbdbdb', marginTop: '8px', width: '100%' }} />

              </Card>
                      
                    )}

                    
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            </Box>
          )}
        </Droppable>
      </DragDropContext>

          <Box sx={{ my: 2 }}>
         
          {sidebarSections.length > 0 && ( 
            <center><p style={{fontSize: 12}}>Add Sidebar Content</p></center>

          )}

             <Box display="flex" justifyContent="center">
             <IconButton sx={{border: '1px solid #344767'}} onClick={handleMenuClickSidebar}>
             <AddIcon color="#344767"/> 
            </IconButton>
             </Box>
           

            <Menu
              anchorEl={anchorElSidebar}
              open={Boolean(anchorElSidebar)}
              onClose={handleMenuCloseSidebar}
            >
              <MenuItem onClick={() => handleAddSectionSidebar("ads")}>Ads</MenuItem>
              <MenuItem onClick={() => handleAddSectionSidebar("similarBlog")}>
                Add Similar Blog
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>
      <hr
                          style={{
                            border: "1px solid #dcdcdc",
                            marginTop: "25px",
                            width: "100%",
                          }}
                        />
     <Box display="flex" justifyContent="center">
     {/* <ArgonButton  variant="contained"  color="info"  onClick={handleSubmit}  sx={{
                          mt: 2,
                          px: 7, // Increase horizontal padding
                          py: 1, // Increase vertical padding
                          fontSize: "16px", // Increase font size
                        }} className="submit-button">
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
      </ArgonButton> */}
     </Box>
      


    </Container>
  );
};

export default BlogEditor;
