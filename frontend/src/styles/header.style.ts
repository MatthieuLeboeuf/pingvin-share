import { createStyles } from "@mantine/emotion";
import { rgba } from "@mantine/core";

export default createStyles((theme, _, u) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: 60,
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
