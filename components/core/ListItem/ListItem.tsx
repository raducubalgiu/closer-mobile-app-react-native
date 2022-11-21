import { Pressable } from "react-native";
import { Stack } from "../Stack/Stack";

export const ListItem = ({
  between = false,
  around = false,
  center = false,
  mt = 10,
  sx = {},
  onPress,
  children,
}) => {
  let justifyContent;

  if (between) {
    justifyContent = "between";
  } else if (around) {
    justifyContent = "around";
  } else if (center) {
    justifyContent = "center";
  } else {
    justifyContent = "start";
  }

  return (
    <Pressable onPress={onPress} style={{ width: "100%" }}>
      <Stack
        sx={{ marginTop: mt, ...sx }}
        direction="row"
        align="center"
        justify={justifyContent}
      >
        {children}
      </Stack>
    </Pressable>
  );
};