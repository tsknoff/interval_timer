import { tss } from "tss-react/mui";

export const useLayoutStyles = tss.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    width: "100%",
    height: "100vh",
    alignItems: "flex-start",
    background:
      "linear-gradient(to right top, #001a6e, #002579, #013184, #033c8f, #074799)",
    overflow: "auto",
  },
  twoColumnsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    flexWrap: "wrap-reverse",
    padding: "4rem",
    gap: "10rem",
  },
  secondColumnWrapper: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4rem",
  },
  circleAndDetailsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10rem",
  },
});
