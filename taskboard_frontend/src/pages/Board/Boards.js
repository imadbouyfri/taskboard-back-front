import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import BoardSearch from "../../components/Board/BoardSearch";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import BoardForm from "../../components/Board/BoardForm";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import AssessmentIcon from '@mui/icons-material/Assessment';
import BoardStats from "../../components/Board/BoardStats";
import GroupForm from "../../components/Group/GroupForm";
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InviteMember from '../../components/Member/InviteMember';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Swal from 'sweetalert2';
import UserAvatar from "../../components/avatar/UserAvatar";

const Boards = () => {
  const [recordUpdate, setRecordUpdate] = useState("");
  const [boards, setBoards] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searched, setSearched] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openStatsPopup, setOpenStatsPopup] = useState(false);
  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState({});
  const [allMembers, setAllMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const GetBoards = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    try {
      const response = await axios.get("http://localhost:3001/board/", config);
      const { status, message, data } = response;
      if (status !== 200) {
        alert(message, status);
      } else {
        setBoards(data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const GetGroups = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    try {
      const response = await axios.get("http://localhost:3001/group/", config);
      const { status, message, data } = response;
      if (status !== 200) {
        alert(message, status);
      } else {
        setGroups(data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  
  useEffect(() => {
    GetBoards();
    GetGroups();
    setIsLoading(false);
    console.log('board');
  }, [openPopup]);
  
  //delete Board
  const deleteBoards = async (id) => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`http://localhost:3001/board/${id}`, { active: false }, config);
          if (response.status === 200) {
            Swal.fire(
              'Deleted!',
              'Your group has been deleted.',
              'success'
            );
            console.log("Board deleted successfully");
            GetBoards();
          }
        } catch (err) {
          console.log("error", err);
        }
      }
    });
  };

// delete Group
const deleteGroups = async (id) => {
  if (!user) return;
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/group/${id}`,
          config
        );
        if (response.status === 200) {
          Swal.fire(
            'Deleted!',
            'Your group has been deleted.',
            'success'
          );
          console.log("Group deleted successfully");
          GetGroups();
        }
      } catch (err) {
        console.log("error", err);
      }
    }
  });
};



const BoardStyle = {
  paddingTop: 15,
  backgroundColor: "#FFFFFF",
  minHeight: "86vh",
  display: "flex",
  alignItems: "flex-start",
  topBar: {
    marginRight: '20px',
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 7
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: 7
  },
  title: {
    fontWeight: 'bold',
    fontSize: "1.3rem",
    color: "#495151",
  },
  members: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: 18, borderRight: '1px solid #a6a6a6', marginRight: 7
  },
  membersAvatars: {
    display: 'flex',
    flexDirection: 'row'
  },
  historyButton: {
    transition: 'background-color 100ms',
    color: "#FFF",
    backgroundColor: '#1976D2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      color: "#000"
    }
  },
  rightSide: {
    width: '28%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};
  
  // Styling
  const styles = {
    paperStyle: {
      width: "90%",
      margin: '10px auto',
      marginTop: 15,
      padding: 8,
    },
    tableStyle: {
      minWidth: 600,
      "& thead th": {
        fontWeight: 600,
        backgroundColor: "#e3e3f3",
        color: "#333996",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fafafa",
        cursor: "pointer",
      },
      "& tbody td": {
        fontWeight: 300,
      },
    },
    buttons: {
      addBoard: {
        backgroundColor: "#333996",
        // margin: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
      addGroup: {
        backgroundColor: "#023e8a",
        // margin: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
      edit: {
        color: "#ffffff",
        backgroundColor: "#ED6C02",
        "&:hover": {
          backgroundColor: "#faa864",
        },
      },
      delete: {
        color: "#ffffff",
        backgroundColor: "#D32F2F",
        "&:hover": {
          backgroundColor: "#f75252",
        },
      },
    },
  };
  //----------------------------------------------------------------Styling
  
  const openInPopup = (item) => {
    setRecordUpdate(item);
    setOpenPopup(!openPopup);
  };

  const openEditPopup = (item) => {
    setRecordUpdate(item);
    setOpenGroupForm(!openGroupForm)
  };

  const openGroupPopup = () => {
    setRecordUpdate();
    setOpenGroupForm(!openGroupForm)
  };
  
  const handleOnClickRow = (id) => {
    navigate(`/taskboard/${id}`);
  };
  
  if (isLoading) {
    return <Spinner/>
  }
  
  const onBoardStatsClicked = (boardId) => {
    setSelectedBoard(boards[boardId]);
    setOpenStatsPopup(true);
  }

    // get Members
    const getAllMembers = async () => {
      if (!user) return;
      const token = user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      try {
        // get invited members
        const response2 = await axios.get(`http://localhost:3001/member`);
        const allInvitedMember = response2.data.map((member) => (
          { _id: member.user._id, name: member.user.name, email: member.user.email, role: member.role, color: member.user.color }
        ))
        setInvitedMembers(allInvitedMember);
        // get All members
        const response1 = await axios.get("http://localhost:3001/member", config);
        const Member = response1.data.map((member) => ({ _id: member._id, name: member.name, email: member.email, color: member.color }));
        // checking for duplicated values
        for (let i = 0; i < allInvitedMember.length; i++) {
          const index = Member.findIndex((mem) => {
            return mem._id === allInvitedMember[i]._id;
          })
          Member.splice(index, 1);
        }
        setAllMembers(Member);
      } catch (err) {
        console.log(err)
      }
    }
  
  return (
    <>
      <Paper sx={styles.paperStyle} elevation={2}>
        <div
          style={
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 50
            }
          }
        >
          <BoardSearch searched={searched} setSearched={setSearched}/>
          <div>
            <Button
              style={styles.buttons.addBoard}
              variant="contained"
              children="New Boards"
              onClick={() => setOpenPopup(true)}
              startIcon={<AddIcon />}
            />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: '#274c77'}}>
          <div style={{display: 'flex', gap: '15px', marginBottom: '25px'}}>
            <PeopleAltIcon fontSize="large" />
            <Typography variant="h5" gutterBottom>
              GROUPS
            </Typography>
          </div>
          <div>
            <Button
              style={styles.buttons.addGroup}
              variant="contained"
              children="Add Group"
              onClick={() => openGroupPopup()}
              startIcon={<AddIcon />}
            />
          </div>
        </div>
        <TableContainer component={Paper} style={{marginBottom: '55px'}}>
          <Table sx={styles.tableStyle} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Groups Name</TableCell>
                <TableCell align="center">Groups Description</TableCell>
                <TableCell align="center">Add Members</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.length <= 0 ? (<><TableRow><TableCell>No groups available</TableCell></TableRow></>) : groups
                .filter(
                  (group) =>
                    group.name.toLowerCase().includes(searched.toLowerCase()) ||
                    group.description
                      .toLowerCase()
                      .includes(searched.toLowerCase())
                )
                .map((group, index) => (
                  <TableRow
                    key={group._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {group.name}
                    </TableCell>
                    <TableCell
                      align="center"                      
                    >
                      {group.description}
                    </TableCell>
                    <TableCell
                      align="center"                     
                    >
                      <div style={BoardStyle.members}>
                      <p style={BoardStyle.separator}></p>
                      <div className='membersAvatars' style={BoardStyle.membersAvatars}>
                {invitedMembers.map((member) => (
                  <UserAvatar key={member.name} name={member.name} color={member.color}/>
                ))}
              </div>
              {/*Share*/}
              <Button variant='contained' sx={{ paddingLeft: 1, paddingRight: 1, marginLeft: 1, fontSize: '0.8rem' }}
                      onClick={() => setOpenPopup(true)}>
                <PersonAddAltIcon sx={{ fontSize: 18, marginRight: 0.5 }}/> Share
              </Button>
            </div>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{ marginLeft: 2 }}
                        onClick={() => openEditPopup(group)}
                      >
                        <ModeEditOutlineIcon/>
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteGroups(group._id)}
                        sx={{ marginLeft: 2 }}
                      >
                        <DeleteForeverIcon/>
                      </Button>
                      {user.role.toLowerCase() === 'admin' && (
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={() => onBoardStatsClicked(index)}
                          sx={{ marginLeft: 2 }}
                        >
                          <AssessmentIcon/>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{display: 'flex', gap: '15px', marginBottom: '25px', color: '#274c77'}}>
          <DashboardIcon fontSize="large" />
          <Typography variant="h5" gutterBottom>
            BOARDS
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table sx={styles.tableStyle} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Boards Name</TableCell>
                <TableCell align="center">Boards Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boards.length <= 0 ? (<><TableRow><TableCell>No boards available</TableCell></TableRow></>) : boards
                .filter(
                  (board) =>
                    board.name.toLowerCase().includes(searched.toLowerCase()) ||
                    board.descData
                      .toLowerCase()
                      .includes(searched.toLowerCase())
                )
                .map((board, index) => (
                  <TableRow
                    key={board._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" onClick={() => handleOnClickRow(index)} >
                      {board.name}
                    </TableCell>
                    <TableCell
                      onClick={() => handleOnClickRow(board._id)}
                      align="center"
                      
                    >
                      {board.descData}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleOnClickRow(board._id)}
                      >
                        <MenuIcon/>
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{ marginLeft: 2 }}
                        onClick={() => openInPopup(board)}
                      >
                        <ModeEditOutlineIcon/>
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteBoards(board._id)}
                        sx={{ marginLeft: 2 }}
                      >
                        <DeleteForeverIcon/>
                      </Button>
                      {user.role.toLowerCase() === 'admin' && (
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={() => onBoardStatsClicked(index)}
                          sx={{ marginLeft: 2 }}
                        >
                          <AssessmentIcon/>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setRecordUpdate={setRecordUpdate}
        recordUpdate={recordUpdate}
        title={recordUpdate ? "Update Board" : "New board"}
      >
        <BoardForm
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          recordUpdate={recordUpdate}
        />
      </Popup>
      <Popup
        openPopup={openGroupForm}
        setOpenPopup={setOpenGroupForm}
        setRecordUpdate={setRecordUpdate}
        recordUpdate={recordUpdate}
        title={recordUpdate ? "Update Group" : "New Group"}
      >
        <GroupForm
          openPopup={openGroupForm}
          setOpenPopup={setOpenGroupForm}
          recordUpdate={recordUpdate}
          getGroups={GetGroups} // Pass the GetGroups function as a prop
        />
      </Popup>
      
      {/*charts popup*/}
      <Popup
        openPopup={openStatsPopup}
        setOpenPopup={setOpenStatsPopup}
        title="board statistics"
      >
        <BoardStats
          openPopup={openStatsPopup}
          setOpenPopup={setOpenStatsPopup}
          board={selectedBoard}
          GetGroups= {GetGroups()}
        />
      </Popup>
    </>
  );
};

export default Boards;
