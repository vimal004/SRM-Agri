import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RequestHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Request Home</h1>
      <Link to="/requestresources">
        <Button>Request Resources</Button>
      </Link>
    </div>
  );
};

export default RequestHome;
