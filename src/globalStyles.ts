const containerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%"
};

const container = {
    ...containerFluid,
    "@media (min-width: 576px)": {
        maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
        maxWidth: "720px"
    },
    "@media (min-width: 992px)": {
        maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
        maxWidth: "1140px"
    }
};

const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
};

const primaryBackground = "#584f4f";
const secondaryBackground = "#d9d2e9";
const listBackground = "#eaf7e5";
const buttonBackground = "rgba(255,232,164, .8)";
const footerBackground = "#ffe8a4";
const primaryColor = "#9c27b0";
const dangerColor = "#f44336";
const successColor = "#4caf50";

export {
    containerFluid,
    container,
    defaultFont,
    primaryBackground,
    secondaryBackground,
    listBackground,
    buttonBackground,
    footerBackground,
    primaryColor,
    dangerColor,
    successColor
}