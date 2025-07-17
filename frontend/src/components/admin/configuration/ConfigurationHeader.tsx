import {
  Burger,
  Button,
  Group,
  Text,
  AppShell,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FormattedMessage } from "react-intl";
import useConfig from "../../../hooks/config.hook";
import Logo from "../../Logo";

const ConfigurationHeader = ({
  isMobileNavBarOpened,
  setIsMobileNavBarOpened,
}: {
  isMobileNavBarOpened: boolean;
  setIsMobileNavBarOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const config = useConfig();
  const theme = useMantineTheme();
  return (
    <AppShell h={60} p="md">
      <AppShell.Header>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Burger
              opened={isMobileNavBarOpened}
              onClick={() => setIsMobileNavBarOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          <Group justify="apart" w="100%">
            <Link href="/" passHref>
              <Group>
                <Logo height={35} width={35} />
                <Text w={600}>{config.get("general.appName")}</Text>
              </Group>
            </Link>
              <Button variant="light" component={Link} href="/admin">
                <FormattedMessage id="common.button.go-back" />
              </Button>
          </Group>
        </div>
      </AppShell.Header>
    </AppShell>
  );
};

export default ConfigurationHeader;
