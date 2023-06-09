import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { UserRole } from "../../interfaces/user.interface";

export default function Navbar() {
  const { asPath } = useRouter();
  const { user, logout } = useContext(AuthContext);
  const isBoss = user?.role === UserRole.BOSS;
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior className="fadeIn">
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Spy |</Typography>
            <Typography sx={{ ml: 0.5 }}>Agency</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <NextLink href="/hits" passHref legacyBehavior>
            <Link>
              <Button color={asPath === "/hits" ? "primary" : "info"} sx={{ '&:hover': {color: 'black'}}}>
                Hits
              </Button>
            </Link>
          </NextLink>
          {isBoss && (
            <NextLink href="/hitmen" passHref legacyBehavior>
              <Link>
                <Button color={asPath === "/hitmen" ? "primary" : "info"} sx={{ '&:hover': {color: 'black'}}}>
                  Hitmen
                </Button>
              </Link>
            </NextLink>
          )}
          <NextLink href="/logout" passHref legacyBehavior>
              <Link>
                <Button onClick={logout} sx={{ '&:hover': {color: 'black'}}}>
                  Logout
                </Button>
              </Link>
            </NextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
