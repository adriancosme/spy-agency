import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import { useRouter } from "next/router";
export default function Hit({
  id,
  createdBy,
  target,
  description,
}: {
  id: string;
  createdBy: string;
  target: string;
  description: string;
}) {
  const router = useRouter();
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="failed">
          <CloseRoundedIcon color="error" />
        </IconButton>
      }
    >
      <ListItemButton
        role={undefined}
        onClick={async () => {
          await router.push(`/hits/${id}`);
        }}
      >
        <ListItemAvatar>
          <IconButton>
            <CheckRoundedIcon color="success" />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={`Target: ${target}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Created by {createdBy}
              </Typography>
              {description}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
