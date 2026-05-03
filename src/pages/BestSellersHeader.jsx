import React from 'react';
import { 
  Box, Typography, Grid, Card, CardMedia, CardContent, 
  IconButton, Container, Stack 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import black_suit from "../assets/black_suit.png"
 import red_suit from "../assets/red_suit.png"
import blue_suit from "../assets/blue_suit.png"
// import yellow_suit from "../assets/yellow_suit.png"

// --- STYLED COMPONENTS ---

const BestSellersHeader = styled(Box)({
  backgroundColor: '#522020', // Maroon background from image
  backgroundImage: `url('path/to/mandala_pattern.png')`, // Subtle pattern overlay
  backgroundSize: 'contain',
  color: '#fff',
  textAlign: 'center',
  padding: '40px 20px',
  position: 'relative',
  // Decorative border/divider if needed
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)',
  }
});

const ProductCard = styled(Card)({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  '&:hover .MuiCardMedia-root': {
    transform: 'scale(1.02)',
  }
});

const ImageWrapper = styled(Box)({
  position: 'relative',
  borderRadius: '16px', // Rounded corners like the screenshot
  overflow: 'hidden',
});

const WishlistButton = styled(IconButton)({
  position: 'absolute',
  top: '12px',
  right: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': { backgroundColor: '#fff' },
  width: '32px',
  height: '32px',
});

// --- COMPONENT ---

const BestSellers = () => {
const products = [
    // { id: 1, title: 'Premium Black Hand Block Print Cotton Suit', img: black_suit },
     { id: 2, title: 'Hand Block Elegant Gold Print Cotton Suit', img: red_suit },
    { id: 3, title: 'Exclusive Hand Block Printed Cotton Suit', img: blue_suit },
    // { id: 4, title: 'Premium Bagru Print Maheshwari Silk Suit', img: yellow_suit },
];

  return (
    <Box sx={{ bgcolor: '#fdfbf8', pb: 8 }}>
      {/* 1. Header Section */}
      <BestSellersHeader>
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: '"Playfair Display", serif', 
            fontWeight: 700,
            color: '#f3b461', // Gold color for "Best Sellers"
            mb: 1 
          }}
        >
          Best Sellers
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ fontStyle: 'italic', opacity: 0.9, letterSpacing: 0.5 }}
        >
          Our most-loved pieces, crafted with care and cherished by many
        </Typography>
      </BestSellersHeader>

      {/* 2. Product Grid Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard>
                <ImageWrapper>
                  <CardMedia
                    component="img"
                    height="380"
                    image={product.img} // Replace with actual image paths
                    alt={product.title}
                    sx={{ transition: 'transform 0.3s ease-in-out' }}
                  />
                  <WishlistButton size="small">
                    <FavoriteBorderIcon fontSize="small" sx={{ color: '#522020' }} />
                  </WishlistButton>
                </ImageWrapper>
                
                <CardContent sx={{ px: 1, pt: 2, textAlign: 'center' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500, 
                      color: '#333',
                      lineHeight: 1.4,
                      fontSize: '0.95rem' 
                    }}
                  >
                    {product.title}
                  </Typography>
                </CardContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BestSellers;