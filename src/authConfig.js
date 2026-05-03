// src/authConfig.js
export const msalConfig = {
  auth: {
    clientId: "7a8de100-ee37-4290-8a2d-3b855d266008",         // Replace with your App Registration Client ID
    authority: "https://login.microsoftonline.com/b5af2451-e21b-4aa2-b4b5-dc5907908dd8", // Replace with your Tenant ID
    redirectUri: `${window.location.origin}/auth/callback`,  
    // redirectUri: "http://localhost:3000/auth/callback",  
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};