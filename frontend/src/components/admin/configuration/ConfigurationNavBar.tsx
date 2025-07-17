import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  ThemeIcon,
  AppShell
} from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import {
  TbAt,
  TbBinaryTree,
  TbBucket,
  TbMail,
  TbScale,
  TbServerBolt,
  TbSettings,
  TbShare,
  TbSocial,
} from "react-icons/tb";
import { FormattedMessage } from "react-intl";

const categories = [
  { name: "General", icon: <TbSettings /> },
  { name: "Email", icon: <TbMail /> },
  { name: "Share", icon: <TbShare /> },
  { name: "SMTP", icon: <TbAt /> },
  { name: "OAuth", icon: <TbSocial /> },
  { name: "LDAP", icon: <TbBinaryTree /> },
  { name: "S3", icon: <TbBucket /> },
  { name: "Legal", icon: <TbScale /> },
  { name: "Cache", icon: <TbServerBolt /> },
];

const useStyles = createStyles((theme, _, u) => ({
  activeLink: {
    [u.dark]: {
      backgroundColor: theme.colors.dark[6],
      color: theme.colors.dark[0],
    },
    [u.light]: {
      backgroundColor: theme.colors.gray[0],
      color: theme.colors.gray[7],
    },

    borderRadius: theme.radius.sm,
    fontWeight: 600,
  },
}));

const ConfigurationNavBar = ({
  categoryId,
  isMobileNavBarOpened,
  setIsMobileNavBarOpened,
}: {
  categoryId: string;
  isMobileNavBarOpened: boolean;
  setIsMobileNavBarOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const { classes } = useStyles();
  return (
    <AppShell
      p="md"
      hidden={!isMobileNavBarOpened}
      w={{ sm: 200, lg: 300 }}
    >
      <AppShell.Navbar>
        <Text size="xs" color="dimmed" mb="sm">
          <FormattedMessage id="admin.config.title" />
        </Text>
        <Stack gap="xs">
          {categories.map((category) => (
            <Box
              p="xs"
              component={Link}
              onClick={() => setIsMobileNavBarOpened(false)}
              className={
                categoryId == category.name.toLowerCase()
                  ? classes.activeLink
                  : undefined
              }
              key={category.name}
              href={`/admin/config/${category.name.toLowerCase()}`}
            >
              <Group>
                <ThemeIcon
                  variant={
                    categoryId == category.name.toLowerCase()
                      ? "filled"
                      : "light"
                  }
                >
                  {category.icon}
                </ThemeIcon>
                <Text size="sm">
                  <FormattedMessage
                    id={`admin.config.category.${category.name.toLowerCase()}`}
                  />
                </Text>
              </Group>
            </Box>
          ))}
        </Stack>
      </AppShell.Navbar>
      <Button mt="xl" variant="light" component={Link} href="/admin">
        <FormattedMessage id="common.button.go-back" />
      </Button>
    </AppShell>
  );
};

export default ConfigurationNavBar;
