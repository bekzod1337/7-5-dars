import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAPI } from "../service/api";
import { setUser } from "../slices/authSlice";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("image", image);

      const updatedUser = await updateProfileAPI(data);
      dispatch(setUser(updatedUser));
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      padding={3}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Update Profile
      </Typography>
      <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack spacing={3}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                variant="outlined"
              />
              <Box display="flex" alignItems="center">
                <Avatar
                  src={
                    user?.image
                      ? `https://mustafocoder.pythonanywhere.com/api${user.image}`
                      : "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                  }
                  alt="User Avatar"
                  sx={{
                    width: 80,
                    height: 80,
                    marginRight: 2,
                    border: 2,
                    borderColor: "primary.main",
                  }}
                />
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdateProfile;
