import { Box } from "@ui";

export default function Footer() {
  return (
    <footer>
      <Box textAlign="center">
        <p>&copy; {new Date().getFullYear()} Userlook. All rights reserved.</p>
      </Box>
    </footer>
  );
}
