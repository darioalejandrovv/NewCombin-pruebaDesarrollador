import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { IconButton } from '@mui/material';
import React from "react";


const Logout = (props) => {



  return (
    <>
      <div className="row">
        <div className="col-12 justify-content-around d-flex">
          <IconButton
            className="w-auto"
            color="primary"
            aria-label="Logout"
            component="label"
            onClick={() => {props.logout()}}
          >
            <MeetingRoomIcon/>
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Logout;
