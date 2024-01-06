import { Search, Add } from "@suid/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@suid/material";
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function NavBar() {
  const [value, setValue] = createSignal(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value()}
        onChange={(oldValue, newValue) => {
          if (oldValue !== newValue) {
            setValue(newValue);
            navigate(newValue);
          }

        }}
      >
        <BottomNavigationAction label="Search" value="" icon={<Search />} />
        <BottomNavigationAction label="Add" value="Append" icon={<Add />} />
      </BottomNavigation>
    </Box>
  );
}
