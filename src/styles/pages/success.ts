import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    lineHeight: 1.4,
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
  },

  a: {
    marginTop: "5rem",
    display: "block",
    fontSize: "$lg",
    fontWeight: "bold",
    color: "$green500",
    textDecoration: "none",

    "&:hover": {
      color: "$green300",
      transition: "color 0.2s",
    },
  },
});

export const ImageList = styled("div", {
  display: "flex",
  justifyContent: "center",
});

export const ImageBox = styled("div", {
  width: "100px",
  overflow: "visible",
});

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%",
  padding: "0.25rem",
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: "-1px 1px 10px #222",

  img: {
    objectFit: "cover",
  },
});
