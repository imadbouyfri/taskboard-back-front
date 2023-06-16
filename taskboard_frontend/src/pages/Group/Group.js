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
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Group = () => {
    const [group, setGroup] = useState([]);
    const [openMemPopup, setOpenMemPopup] = useState(false);
    const [allMembers, setAllMembers] = useState([]);
    const [invitedMembers, setInvitedMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recordUpdate, setRecordUpdate] = useState("");
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

    return (
        <>
            <Paper>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar style={{ backgroundColor: avatarColors[user.color], color: '#FFFFFF' }}>
                            <GroupsIcon />
                        </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={group.name}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                    </Typography>
                </CardContent>
                </Card>
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

