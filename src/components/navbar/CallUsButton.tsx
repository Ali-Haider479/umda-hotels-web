import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

const CallUsButton = () => {
  return (
    <div className="navbar-item flex-center">
      <a
        href="tel:+92-331-9145021"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <CallOutlinedIcon className="icon-spacing" fontSize="large" />
        <div>
          <p className="navbar-text-call">+92-331-9145021</p>
          <p
            className="navbar-text-description"
            style={{ borderBottom: "1px solid black" }}
          >
            Call us to Book now
          </p>
        </div>
      </a>
    </div>
  );
};

export default CallUsButton;
