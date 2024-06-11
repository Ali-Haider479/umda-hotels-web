import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

const CallUsButton = () => {
  return (
    <div className="navbar-item flex-center">
      <a
        href="tel:+92-310-1560661"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <CallOutlinedIcon className="icon-spacing" fontSize="large" />
        <div>
          <p className="navbar-text-call">+92-310-1560661</p>
          <p className="navbar-text-description">Call us to Book now</p>
        </div>
      </a>
    </div>
  );
};

export default CallUsButton;
