import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, Avatar } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      color="text.primary"
      padding={2}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Profile Page
      </Typography>
      {user ? (
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 3,
            bgcolor: "background.paper",
            padding: 2,
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Hello, {user.username || "User"}!
              </Typography>
              <Button
                component={Link}
                to="/update-profile"
                variant="contained"
                color="primary"
                size="small"
              >
                Update Profile
              </Button>
            </Box>
            <Box mb={2}>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Username:</strong> {user.username}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="body1" mr={2}>
                <strong>Image:</strong>
              </Typography>
              <Avatar
                src={
                  user.image
                    ? `https://mustafocoder.pythonanywhere.com/api${user.image}`
                    : "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                }
                alt="User"
                sx={{ width: 100, height: 100, border: 2, borderColor: "primary.main" }}
              />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Profile;
