import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Paper } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import InviteMember from '../../components/Member/InviteMember';
import './group.css';
import { avatarColors } from '../../data/avatarColors';
import GroupsIcon from '@mui/icons-material/Groups';
import Popup from "../Board/Popup";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UserAvatar from "../../components/avatar/UserAvatar";

const Group = () => {
    const [group, setGroup] = useState([]);
    const [openMemPopup, setOpenMemPopup] = useState(false);
    const [allMembers, setAllMembers] = useState([]);
    const [invitedMembers, setInvitedMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recordUpdate, setRecordUpdate] = useState("");
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();

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
    };
    
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
        // console.log(response.data);
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
            //   console.log(response2);
            const allInvitedMember = response2.data.map((member) => (
                { _id: member.user._id, name: member.user.name, email: member.user.email, role: member.role, color: member.user.color }
            ))
            setInvitedMembers(allInvitedMember);
            //   console.log(invitedMembers);
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
        getSingleGroup();
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

    const createdAt = new Date(group.createdAt); // Replace this with the actual createdAt date

    const month = createdAt.toLocaleString('default', { month: 'long' });
    const day = createdAt.getDate();
    const year = createdAt.getFullYear();

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', gap: '18px', marginTop: '80px', marginLeft: '20px'}}>
                <img src="/images/icons8-users-24.png" alt="My Image" style={{maxWidth: '32px', maxHeight: '32px'}}/>   
                <Typography variant="h5" style={{fontWeight: 'bold', color: '#274c77'}}>
                    Invite Members
                </Typography>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '45px'}}>
                <Card sx={{ maxWidth: 900}}>
                    <CardHeader
                        avatar={
                            <Avatar style={{ backgroundColor: avatarColors[group.color], color: '#FFFFFF', width: '50px', height: '50px'}}>
                                <GroupsIcon />
                            </Avatar>
                        }
                        title={
                            <Typography variant="subtitle2" style={{fontSize: '20px'}}>
                                {group.name}
                            </Typography>
                        }
                        subheader={`Created at: ${month} ${day}, ${year}`}
                    />
                    <CardContent>
                        <Typography variant="body1" style={{textAlign: "center", fontSize: '19px', margin: '15px'}}>
                            Invite members to this group by clicking on the button below, 
                            and you can also change the roles of the invited members
                        </Typography>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img src="/images/icons8-double-down.gif" alt="My Image" style={{maxWidth: '48px', maxHeight: '48px'}}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                            <div className='membersAvatars' style={BoardStyle.membersAvatars}>
                                {invitedMembers.map((member) => (
                                <UserAvatar key={member.name} name={member.name} color={member.color}/>
                                ))}
                            </div>
                            {/*Share*/}
                            <Button variant='contained' sx={{ marginLeft: 1, fontSize: '0.8rem' }} style={{padding: '1rem'}}
                                    onClick={() => setOpenMemPopup(true)}>
                                <PersonAddAltIcon sx={{ fontSize: 28, marginRight: 0.5 }}/> Invite Members
                            </Button>
                        </div>
                        
                    </CardContent>
                </Card>
            </div>
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

