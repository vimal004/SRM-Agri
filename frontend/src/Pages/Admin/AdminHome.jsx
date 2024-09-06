import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Admin Home</h1>
      <Link to="/approveresources">
        <Button>Approve Resources</Button>
      </Link>
    </div>
  );
};

export default AdminHome;
