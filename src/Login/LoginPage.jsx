import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import {useEffect} from 'react';
import logo from "../assets/logo.png";
// import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { microsoftLogin } from "../redux/features/authSlice";
import { loginRequest } from "../authConfig";
import { CircularProgress } from "@mui/material";

//  import { InteractionStatus } from "@azure/msal-browser";


export default function LoginPage() {


// const { instance, inProgress } = useMsal();
 const navigate = useNavigate();
 
 const dispatch = useDispatch();
const [item,setItem]=useState({email:"",password:""})
const [open, setOpen] = useState(false);
const [isRedirecting, setIsRedirecting] = useState(false);
const { loading, error } = useSelector((state) => state.auth);


const handleChange=(e)=>{
    const { name, value } = e.target;
  setItem((prev)=>({
    ...prev,
    [name]:value
  }))
}



// useEffect(() => {
//   if (inProgress !== InteractionStatus.None) return;

//   instance.handleRedirectPromise()
//     .then(async (result) => {
//       if (!result) return;

//       setIsRedirecting(true); //  show loader

//       const action = await dispatch(microsoftLogin(result.accessToken));

//       if (microsoftLogin.fulfilled.match(action)) {
//         navigate("/home");
//       } else {
//         setIsRedirecting(false); //  hide loader on failure
//       }
//     })
//     .catch((err) => {
//       console.error("Redirect error:", err);
//       setIsRedirecting(false);
//     });

// }, [inProgress]);

// Then your button just triggers the redirect
// const handleLogin = () => {
//   instance.loginRedirect(loginRequest);
// };
  const handleLogin = () => {
    const { email, password } = item;
    // navigate("/home");

    
    if (email === "admin@mail.com" && password === "Code@React123") {
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

 if (isRedirecting || loading) {
   return (
     <Box
       sx={{
         minHeight: "100vh",
         background: "linear-gradient(135deg, #6b0f1a, #8b0000)",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         gap: 2,
       }}
     >
       <CircularProgress size={52} thickness={4} sx={{ color: "#fff" }} />
       <Typography variant="body1" color="#f2f2f2" fontWeight={500}>
         Signing you in, please wait...
       </Typography>
     </Box>
   );
 }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6b0f1a, #8b0000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Login Card */}
      <Card
        sx={{
          width: 430,
          borderRadius: 4,
          boxShadow: 8,
          textAlign: "center",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Logo */}
          <Box mb={3}>
            <img alt="logo" src={logo} height={48} loading="lazy" />
          </Box>

          {/* Welcome */}
          <Typography variant="h5" fontWeight={600} mb={4}>
            Welcome
          </Typography>

          {/* Email Label */}
          <Typography variant="body2" fontWeight={500} textAlign="left" mb={1}>
            Email
          </Typography>

          <TextField
            // disabled
            name="email"
            value={item.email}
            onChange={handleChange}
            fullWidth
            placeholder="your.email@lenovo.com"
            margin="dense"
            slotProps={{
              sx: { height: 52 },
            }}
          />

          {/* Password Label */}
          <Typography
            variant="body2"
            fontWeight={500}
            textAlign="left"
            mt={3}
            mb={1}
          >
            Password
          </Typography>

          <TextField
            // disabled
            name="password"
            value={item.password}
            onChange={handleChange}
            fullWidth
            type="password"
            placeholder="Enter password"
            margin="dense"
            slotProps={{
              sx: { height: 52 },
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            onClick={handleLogin}
            variant="contained"
            sx={{
              mt: 4,
              py: 1.6,
              borderRadius: 3,
              fontWeight: 600,
              backgroundColor: "#8b1d1d",
              "&:hover": {
                backgroundColor: "#6f1414",
              },
            }}
          >
            LOGIN
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={5000}
            message="Success!! Home Page will display in few seconds."
          />

          {/* Card Footer */}
          <Typography variant="body2" color="text.secondary" mt={4}>
            Need access?{" "}
            <Link href="#" underline="hover" color="error">
              Contact IT Support
            </Link>
          </Typography>
        </CardContent>
      </Card>

      {/* Page Footer */}
      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="#f2f2f2">
          Integrated with Dynamics · ECC · SCI · Flash
        </Typography>
        <Typography variant="caption" color="#f2f2f2">
          © 2025 Lenovo. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
