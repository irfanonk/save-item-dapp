import React, { useState, useContext } from "react";
import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { CircularProgress, LinearProgress } from "@mui/material";
import { web3Context } from "../context/web3Context";

const defaultValues = {
  firstName: "JANE",
  lastName: "KENNEDY",
  birthCity: "PENNSYLVANIA",
  birthCountry: "USA",
  birthDate: "1940-01-01",
  deathDate: "2020-01-01",
  notes:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  picture: "",
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddItemForm = ({ onCreateItem, isCreating, upload }) => {
  const { networkId, account, isSupportMetaMask } = useContext(web3Context);

  const [formValues, setFormValues] = useState(defaultValues);

  const [isSumModalOpen, setIsSumModalOpen] = useState(false);

  const handleClose = () => setIsSumModalOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: name !== "notes" ? value.toUpperCase() : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reader = new FileReader();

    reader.readAsDataURL(formValues.picture);
    reader.onload = (loadEvt) => {
      // console.log("onload", loadEvt.target?.result);
      setFormValues({
        ...formValues,
        pictureUrl: loadEvt.target?.result,
      });
      setIsSumModalOpen(true);
    };
  };

  const onCreateClick = () => {
    Object.keys(formValues).forEach(
      (k) =>
        typeof formValues[k] === "string" &&
        (formValues[k] = formValues[k].trim())
    );
    onCreateItem(formValues);
  };

  const onChangeFile = (e) => {
    console.log("e", e.target.files[0]);
    setFormValues({
      ...formValues,
      picture: e.target.files[0],
    });
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isSumModalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", display: "flex" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button autoFocus color="inherit" onClick={onCreateClick}>
              {isCreating ? <CircularProgress color="inherit" /> : "Create"}
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <Typography
            sx={{ p: 2, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Please review your information!
          </Typography>
          <ListItem>
            <ListItemText
              primary={formValues.firstName + " " + formValues.lastName}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={formValues.birthCity + " / " + formValues.birthCountry}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={formValues.birthDate + " " + formValues.deathDate}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={formValues.notes} />
          </ListItem>
          <Divider />
          <ListItem sx={{ justifyContent: "center" }}>
            <Paper style={{ textAlign: "center" }} variant="elevation">
              <img
                style={{ maxWidth: 350, maxHeight: "100%" }}
                src={formValues.pictureUrl}
              />
            </Paper>
          </ListItem>
        </List>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="name-input"
                name="firstName"
                label="First Name"
                type="text"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="lastName-input"
                name="lastName"
                label="Last Name"
                type="text"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="birthCity-input"
                name="birthCity"
                label="City of Birth"
                type="text"
                value={formValues.birthCity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="birthCountry-input"
                name="birthCountry"
                label="Country of Birth"
                type="text"
                value={formValues.birthCountry}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="outlined"
                name="birthDate"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                value={formValues.birthDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="outlined"
                name="deathDate"
                label="Date of Death"
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                value={formValues.deathDate}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                id="notes-input"
                name="notes"
                label="Notes"
                type="text"
                multiline
                minRows={3}
                value={formValues.notes}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField onChange={onChangeFile} type="file"></TextField>
              {/* <DropzoneArea
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                maxFileSize={2097152} //2mb
                filesLimit={1}
                dropzoneText="Please add your loved one's picture"
                showFileNames
                showAlerts
                onChange={(files) =>
                  handleDropChange({
                    target: { name: "picture", value: files[0] },
                  })
                }
              /> */}
            </Grid>

            <Grid
              container
              item
              direction="row"
              justifyContent="center"
              alignItems="center"
              margin={5}
            >
              {!isSupportMetaMask ? (
                <Button
                  disabled={true}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Install Metamask
                </Button>
              ) : !account ? (
                <Button
                  disabled={true}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Connect Metamask
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </>
      </form>
    </>
  );
};
export default AddItemForm;
