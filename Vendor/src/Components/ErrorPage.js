import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { BADREQUEST, Homepage, LOGINPAGE } from "../config/config";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(220deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function ReLogin() {
  localStorage.removeItem("token");
  window.location.href = LOGINPAGE;
}
export default function ErrorPage(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div style={styles.container}>
      <Card sx={{ maxWidth: 345, backgroundColor: "#e6e8f5" }}>
        <div style={{ padding: "30px 50px" }}>
          <CardMedia
            sx={{
              height: 250,
              width: 250,
              objectFit: "contain",
            }}
            image={BADREQUEST}
            title="green iguana"
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
            <br /> If you think this is a mistake, Kindly contact the Admin
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href="#" onClick={ReLogin}>
            Login
          </Button>
          {props.showHome ? (
            <Button size="small" href={Homepage}>
              Home
            </Button>
          ) : (
            ""
          )}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CallEndOutlinedIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider
              color="black"
              width={"350px"}
              sx={{
                marginLeft: "-20px",
                marginBottom: "20px",
              }}
            />
            <Typography paragraph>Contact:</Typography>
            <Typography paragraph>Mail us on: admin@gmail.com</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

ErrorPage.defaultProps = {
  title: "Error !!",
  desc: "Looks like we ran into an error",
  showHome: true,
};
