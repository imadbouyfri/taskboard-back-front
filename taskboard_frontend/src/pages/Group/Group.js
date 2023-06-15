import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Paper } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import InviteMember from '../../components/Member/InviteMember';
import UserAvatar from "../../components/avatar/UserAvatar";
import './group.css';
import Popup from "../Board/Popup";

const Group = () => {
    const [group, setGroup] = useState([]);
    const [openMemPopup, setOpenMemPopup] = useState(false);
    const [allMembers, setAllMembers] = useState([]);
    const [invitedMembers, setInvitedMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recordUpdate, setRecordUpdate] = useState("");
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    
    // getting group data from DB
    const getSingleGroup = async () => {
        if (!user) return;
        const token = user.token;
        const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }
        try {
        const response = await axios.get(`http://localhost:3001/group/${id}`, config);
        setGroup(response.data);
        console.log(response.data);
        } catch (err) {
        console.log(err);
        }
    };
    
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
          const response2 = await axios.get(`http://localhost:3001/member/group/${id}`);
          console.log(response2);
          const allInvitedMember = response2.data.map((member) => (
            { _id: member.user._id, name: member.user.name, email: member.user.email, role: member.role, color: member.user.color }
          ))
          setInvitedMembers(allInvitedMember);
          console.log(invitedMembers);
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

      useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
          getAllMembers();
          setIsLoading(false);
        }, 300);
      }, [id]);
      
      useEffect(() => {
        getSingleGroup();
        getAllMembers();
        setIsLoading(false);
      }, [openMemPopup]);

      if (isLoading) {
        return <Spinner/>
      }

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


    return (
        <>
            <Paper>
            <div style={BoardStyle.topBar}>
          <div style={BoardStyle.leftSide}>
            <div style={BoardStyle.members}>
              <p style={BoardStyle.separator}>{group.name}</p>
              <div className='membersAvatars' style={BoardStyle.membersAvatars}>
                {invitedMembers.map((member) => (
                  <UserAvatar key={member.name} name={member.name} color={member.color}/>
                ))}
              </div>
              {/*Share*/}
              <Button variant='contained' sx={{ paddingLeft: 1, paddingRight: 1, marginLeft: 1, fontSize: '0.8rem' }}
                      onClick={() => setOpenMemPopup(true)}>
                <PersonAddAltIcon sx={{ fontSize: 18, marginRight: 0.5 }}/> Share
              </Button>
            </div>
          </div>
          </div>

            </Paper>
            <Popup
                openPopup={openMemPopup}
                setOpenPopup={setOpenMemPopup}
                setRecordUpdate={setRecordUpdate}
                recordUpdate={recordUpdate}
                title={"Share board"}
            >
                <InviteMember
                allMembers={allMembers}
                setAllMembers={setAllMembers}
                invitedMembers={invitedMembers}
                setInvitedMembers={setInvitedMembers}
                openPopup={openMemPopup}
                setOpenPopup={setOpenMemPopup}
                recordUpdate={recordUpdate}
                user={user}
                groupId={id}
                />
            </Popup>
        </>
    );
};

export default Group;

