import { tss } from "tss-react/mui";

export const useLayoutStyles = tss.create({
  root: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // height: "fit-content",
    // alignItems: "flex-start",
    background:
      "linear-gradient(to right top, #001a6e, #002579, #013184, #033c8f, #074799)",
    minHeight: "100vh",
  },
  twoColumnsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    boxSizing: "border-box",
    margin: "auto",
    paddingTop: "4rem",
    // height: "calc(100vh - 64px)",
    gap: "4rem",
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
