import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Stack,
  IconButton,
  Button,
  Radio,
  Box,
} from "@mui/material";

export default function ShareModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 1,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          pb: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={20} fontWeight={600} color="#4D144A">
          Share
        </Typography>

        <IconButton onClick={onClose}>{/* <CloseRoundedIcon /> */}x</IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography fontSize={14} color="text.secondary" mb={3}>
          Share this information with a colleague
        </Typography>

        <Stack spacing={3}>
          {/* Email */}
          <Box>
            <Typography fontSize={14} mb={1}>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter email address"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d0d0d0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5b004f",
                    borderWidth: "1px",
                  },
                },
              }}
            />
          </Box>

          {/* Comment */}
          <Box>
            <Typography fontSize={14} mb={1}>
              Comment
            </Typography>
            <TextField
              fullWidth
              placeholder="Add a comment..."
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d0d0d0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5b004f",
                    borderWidth: "1px",
                  },
                },
              }}
            />
          </Box>

          {/* Action Item */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Radio size="small" />
            <Typography fontSize={14} color="#4D444E">
              Action Item
            </Typography>
          </Stack>

          {/* Actions */}
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                px: 3,
                textTransform: "none",
                color: "#5B004F",
                borderColor: "#5B004F",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                px: 3,
                textTransform: "none",
                backgroundColor: "#E41E1B",
                "&:hover": {
                  backgroundColor: "#C41714",
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
