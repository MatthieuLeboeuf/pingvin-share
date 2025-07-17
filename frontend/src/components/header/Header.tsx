import {
  Box,
  Burger,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  AppShell,
  Transition,
  rgba
} from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import useConfig from "../../hooks/config.hook";
import useUser from "../../hooks/user.hook";
import useTranslate from "../../hooks/useTranslate.hook";
import Logo from "../Logo";
import ActionAvatar from "./ActionAvatar";
import NavbarShareMenu from "./NavbarShareMenu";

const HEADER_HEIGHT = 60;

type NavLink = {
  link?: string;
  label?: string;
  component?: ReactNode;
  action?: () => Promise<void>;
};

const useStyles = createStyles((theme, _, u) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [`@media (min-width: 48em)`]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [`@media (max-width: 48em)`]: {
      display: "none",
    },
  },

  burger: {
    [`@media (min-width: 48em)`]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    [u.dark]: {
      color: theme.colors.dark[0],
    },
    [u.light]: {
      color: theme.colors.gray[7],
    },
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      [u.dark]: {
        backgroundColor: theme.colors.dark[6],
      },
      [u.light]: {
        backgroundColor: theme.colors.gray[0],
      },
    },

    [`@media (max-width: 48em)`]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      [u.dark]: {
        backgroundColor: rgba(theme.colors[theme.primaryColor][9], 0.25),
        color: theme.colors[theme.primaryColor][3],
      },
      [u.light]: {
        backgroundColor: theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][7],
      },
    },
  },
}));

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const config = useConfig();
  const t = useTranslate();

  const [opened, toggleOpened] = useDisclosure(false);

  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  const authenticatedLinks: NavLink[] = [
    {
      link: "/upload",
      label: t("navbar.upload"),
    },
    {
      component: <NavbarShareMenu />,
    },
    {
      component: <ActionAvatar />,
    },
  ];

  let unauthenticatedLinks: NavLink[] = [
    {
      link: "/auth/signIn",
      label: t("navbar.signin"),
    },
  ];

  if (config.get("share.allowUnauthenticatedShares")) {
    unauthenticatedLinks.unshift({
      link: "/upload",
      label: t("navbar.upload"),
    });
  }

  if (config.get("general.showHomePage"))
    unauthenticatedLinks.unshift({
      link: "/",
      label: t("navbar.home"),
    });

  if (config.get("share.allowRegistration"))
    unauthenticatedLinks.push({
      link: "/auth/signUp",
      label: t("navbar.signup"),
    });

  const { classes, cx } = useStyles();
  const items = (
    <>
      {(user ? authenticatedLinks : unauthenticatedLinks).map((link, i) => {
        if (link.component) {
          return (
            <Box pl={5} py={15} key={i}>
              {link.component}
            </Box>
          );
        }
        return (
          <Link
            key={link.label}
            href={link.link ?? ""}
            onClick={() => toggleOpened.toggle()}
            className={cx(classes.link, {
              [classes.linkActive]: currentRoute == link.link,
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
  return (
    <AppShell header={{ height: HEADER_HEIGHT }} mb={40} className={classes.root}>
      <AppShell.Header>
        <Container className={classes.header}>
          <Link href="/" passHref>
            <Group>
              <Logo height={35} width={35} />
              <Text fw={600}>{config.get("general.appName")}</Text>
            </Group>
          </Link>
          <Group gap={5} className={classes.links}>
            <Group>{items} </Group>
          </Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened.toggle()}
            className={classes.burger}
            size="sm"
          />
          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                <Stack gap={0}> {items}</Stack>
              </Paper>
            )}
          </Transition>
        </Container>
      </AppShell.Header>
    </AppShell>
  );
};

export default Header;
