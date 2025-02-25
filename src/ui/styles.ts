import { tss } from "tss-react/mui";

export const useLayoutStyles = tss.create({
  root: {
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
    paddingTop: "2rem",
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5rem",
  },
  activityGridWrapper: {
    border: "1px solid white",
    fontFamily: "sans-serif",
    color: "white",
    maxWidth: "95vw",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderRadius: "10px",
  },
});
