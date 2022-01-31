import React from "react";
import { ListItem, IconButton, ListItemText, Box, Typography, List } from "@mui/material";
import { format } from "date-fns";
import { ISearchHistory } from "./useSearchHistory";
import DeleteIcon from "@mui/icons-material/Delete";

interface HistoryItemProps {
  data: ISearchHistory;
  onDelete?: (id: ISearchHistory["id"]) => void;
}

const HistoryItem = React.memo(function HistoryItem({ data, onDelete }: HistoryItemProps) {
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => onDelete?.(data.id)} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText>
        {data.city}, {data.country}
      </ListItemText>
      <Box sx={{ ml: "auto" }}>{format(new Date(data.time), "yyyy-MM-dd hh:mm:ss aa")}</Box>
    </ListItem>
  );
});

export interface SearchHistoryProps {
  data: ISearchHistory[];
  onDelete?: (id: ISearchHistory["id"]) => void;
}

const SearchHistory = ({ data, onDelete }: SearchHistoryProps) => {
  return (
    <section>
      <Typography variant="h6" component="h2">
        Search History
      </Typography>
      <List disablePadding>
        {data.map((h) => (
          <HistoryItem key={h.id} data={h} onDelete={onDelete} />
        ))}
      </List>
    </section>
  );
};

export default SearchHistory;
