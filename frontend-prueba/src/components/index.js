import "./../App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Formulario from "./formulario";
import Listado from "./Listado";
import axios from "axios";
import Login from "./Login";
import Logout from "./Logout";

const Index = () => {
  //vars
  const url = process.env.REACT_APP_BACKEND_API_URL;
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
  };
  const defaultMember = {
    firstName: "",
    lastName: "",
    address: "",
    ssn: "",
  };

  //usestate
  const [members, setMembers] = React.useState([]);
  const [member, setMember] = React.useState(defaultMember);
  const [login, setLogin] = React.useState(false);
  const [disabledSaveButton, setDisabledSaveButton] = React.useState(true)

  //useeffect
  React.useEffect(() => {
    getMembers();
    isLogged();

    return () => {
      setMembers([]);
    };
  }, []);

  React.useEffect(() => {
    activeSaveButton()  
    return () => {
    }
  }, [member])
  

  //functions

  const logout = () => {
    setLogged(false);
    localStorage.removeItem("JWT");
  };

  const isLogged = () => {
    if (localStorage.getItem("JWT")) {
      setLogged(true);
    }
  };
  const setLogged = (bool) => {
    setLogin(bool);
  };

  const setDefaultMember = () => {
    setMember(defaultMember);
  };



  function validString(item) {
    return typeof item === "string" && item.trim().length > 0;
  } 

  const saveMember = async () => {
    try {

      if (
        !validString(member.firstName) ||
        !validString(member.lastName) ||
        !validString(member.address)
      ) {
        throw new Error("Invalid first name, last name or address");
      }
      if(validSSN(member.ssn)==false){
        throw new Error("Invalid ssn");
      }
      const memberString = member

      memberString.firstName.trim()
      memberString.lastName.trim()
      memberString.address.trim()

      await axios.post(`${url}/api/members`, memberString, config);
      member.id = member.ssn;
      const newMembers = members.concat(memberString);
      setMembers(newMembers);
      setMember(defaultMember);
      alert("Member register made sucessfull");
    } catch (e) {
      alert(`Problems to save member register. ${e.message}.`);
    }
  };

  const getMembers = async () => {
    const responseMembers = await axios.get(`${url}/api/members`);
    const responseMembersArray = responseMembers.data;
    const newResponseMemberArray = [];
    if (responseMembersArray.length > 0) {
      responseMembersArray.map((member, id) => {
        member.id = id;
        newResponseMemberArray.push(member);
      });
    }
    setMembers(responseMembersArray);
  };

  const handleChange = (e) => {
    e.persist();
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const validSSN =(ssn)=>{
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    if (regex.test(ssn) === false) {
      return false
    }
    else {
      return true
    }
  }

  const activeSaveButton = ()=> {
    if(member.firstName.length>0 && member.lastName.length>0 && member.address.length>0 && validSSN(member.ssn))
    {
      setDisabledSaveButton(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          // minHeight: 900,
          // minWidth:1200
        },
      }}
    >
      <Paper elevation={3}>
        <div className="row">
          <div className="col-12 headerMembers">
            <div
              style={{
                backgroundImage: "url('./img/terminator.png')",
                minHeight: '170px',
                backgroundSize: 'contain'
              }}
            />
          </div>
          <div className="col-sm-12 col-md-6  d-flex justify-content-between mt-2 flex-column">
            {!login ? (
              <Login setLogged={setLogged} />
            ) : (
              <Formulario
                saveMember={saveMember}
                handleChange={handleChange}
                setDefaultMember={setDefaultMember}
                member={member}
                disabledSaveButton={disabledSaveButton}
              />
            )}
          </div>
          <div className="col-sm-12 col-md-6 d-flex justify-content-between mt-2 flex-column">
            <Listado members={members} />
            {login ? <Logout logout={logout} /> : ""}
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default Index;
