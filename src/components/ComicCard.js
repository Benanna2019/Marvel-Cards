import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ComicCard({ comic }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isToby, setIsToby] = useState("");
  useEffect(() => {
    const urls = [
      "https://i.kym-cdn.com/entries/icons/facebook/000/005/068/spiderman-3-1540228026.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMBrHHar7vnb6IUHVCtOAHxEq98-anlSm6fA&usqp=CAU",
    ];

    const index = Math.floor(Math.random() * 2);
    const img = urls[index];
    setIsToby(img);
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={isToby} width="75px" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comic.name}
        subheader={comic.modified.slice(0, 10)}
      />
      <CardMedia
        className={classes.media}
        image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        title={comic.name}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            onClick={() => setIsLiked(!isLiked)}
            color={isLiked ? "secondary" : "primary"}
          />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon
            onClick={() =>
              (window.location.href =
                "https://www.youtube.com/watch?v=oHg5SJYRHA0")
            }
          />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{comic.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
