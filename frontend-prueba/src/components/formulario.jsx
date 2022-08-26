import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const Formulario = (props) => {
  //props

  //context
  //props
  //vars and const
  //state
  //useeffect
  //functions

  return (
    <>
      <div className="texts-form col-12 container">
        <TextField
          required
          className="mb-2 w-100"
          id="outlined-required"
          label="First Name"
          onChange={props.handleChange}
          name="firstName"
          value={props.member.firstName}
          variant="outlined"
        />
        <TextField
          required
          className="mb-2 w-100"
          id="outlined-required"
          label="Last Name"
          onChange={props.handleChange}
          name="lastName"
          value={props.member.lastName}
          variant="outlined"
        />
        <TextField
          required
          className="mb-2 w-100"
          id="outlined-required"
          label="Address"
          onChange={props.handleChange}
          name="address"
          value={props.member.address}
          variant="outlined"
        />
        <TextField
          required
          className="mb-2 w-100"
          id="outlined-required"
          label="ssn"
          onChange={props.handleChange}
          name="ssn"
          value={props.member.ssn}
          variant="outlined"
        />
      </div>
      <div className="col-12 justify-content-around d-flex icons-form container">
        <IconButton
          className="w-auto"
          color="primary"
          aria-label="Reset Button"
          component="label"
          onClick={() => props.setDefaultMember()}
        >
          <HighlightOffIcon />
        </IconButton>
        <IconButton
          className="w-auto"
          color="primary"
          aria-label="Save Button"
          component="label"
          disabled={props.disabledSaveButton}
          onClick={() => props.saveMember()}
        >
          <SaveIcon />
        </IconButton>
      </div>
    </>
  );
};

export default Formulario;
