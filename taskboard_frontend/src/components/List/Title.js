import { useState, useRef } from "react";
import { Typography, InputBase, Popper, Paper, ClickAwayListener, MenuList, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { useSelector } from "react-redux";
import Chip from '@mui/material/Chip';

const Title = ({ listTitle, setListTitle, listId, boardLists, setBoardLists, boardId, cardCount }) => {
  const TitleStyle = {
    titleContainer: {
      marginLeft: 8,
      marginRight: 8,
      display: "flex",
      paddingTop: 3.5,
      paddingBottom: 4.5,
      alignItems: 'center'
    },
    title: {
      flexGrow: 1,
      fontWeight: "bold",
      fontSize: '1rem',
      marginBottom: 0.5,
      marginTop: 0.5
    },
    input: {
      paddingLeft: 1,
      paddingRight: 1,
      fontWeight: "bold",
      fontSize: '1rem',
      marginBottom: 0.4,
      marginTop: 0.6
    },
    more: {
      marginTop: 0.5,
      borderRadius: 0.6,
      '&:hover': {
        backgroundColor: "#C7CACB"
      }
    }
  };
  const { user } = useSelector((state) => state.auth);
  
  const [titleOpened, setTitleOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  const handleOnDelete = async (event) => {
    if(listTitle.toLowerCase() === 'done') {
      window.alert("Deleting Done list is impossible");
      return;
    }
    if (window.confirm("Do you want to delete this list")) {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      try {
        console.log('listId', listId);
        await axios.patch(`http://197.153.57.185:3001/list/${listId}`, { active: false });
        await axios.post("http://197.153.57.185:3001/listHistory", {
          user: user._id,
          list: listId,
          board: boardId,
          action: `delete`,
        })
        const newBordLists = boardLists.filter(list => list._id !== listId);
        setBoardLists(newBordLists);
      } catch (err) {
        console.log(err);
      }
    }
  }
  const handleClose = async (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  
  const handleOnBlur = async () => {
    try {
      console.log('listTitle', listTitle);
      const updatedList = await axios.patch(`http://197.153.57.185:3001/list/${listId}`, { name: listTitle });
      await axios.post("http://197.153.57.185:3001/listHistory", {
        user: user._id,
        list: listId,
        board: boardId,
        action: `update`,
      })
      console.log('updatedList', updatedList);
      setTitleOpened(!titleOpened);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      {titleOpened ? (
        <div>
          <InputBase
            fullWidth
            value={listTitle}
            sx={TitleStyle.input}
            onBlur={handleOnBlur}
            onChange={(e) => setListTitle(e.target.value)}
          />
        </div>
      ) : (
        <div style={TitleStyle.titleContainer}>
          {listTitle.toLowerCase() === 'todo' && (
            <img src="/images/icons8-rounded-square-48 (1).png" alt="My Image" style={{ maxWidth: '24px', maxHeight: '24px', marginRight: '8px' }}/>
          )}
          {listTitle.toLowerCase() === 'doing' && (
            <img src="/images/icons8-filled-circle-48 (2).png" alt="My Image" style={{ maxWidth: '24px', maxHeight: '24px', marginRight: '8px' }}/>
          )}
          {listTitle.toLowerCase() === 'done' && (
            <img src="/images/icons8-filled-circle-48 (3).png" alt="My Image" style={{ maxWidth: '24px', maxHeight: '24px', marginRight: '8px' }}/>
          )}
          {listTitle.toLowerCase() !== 'todo' && listTitle.toLowerCase() !== 'done' && listTitle.toLowerCase() !== 'doing' && (
            <img src="/images/icons8-filled-circle-48 (6).png" alt="My Image" style={{ maxWidth: '24px', maxHeight: '24px', marginRight: '8px' }}/>
          )}
          <Typography
            onClick={() => listTitle.toLowerCase() !== 'done' && setTitleOpened(!titleOpened)}
            sx={TitleStyle.title}
          >
            {listTitle}

            {listTitle.toLowerCase() === 'todo' && (
              <Chip label={cardCount} style={{marginLeft: '18px', padding: '0 12px', backgroundColor: '#F3D6A3' }} />)}
            {listTitle.toLowerCase() === 'done' && (
              <Chip label={cardCount} style={{marginLeft: '18px', padding: '0 12px', backgroundColor: '#B1F3CF' }} />)}
            {listTitle.toLowerCase() === 'doing' && (
              <Chip label={cardCount} style={{marginLeft: '18px', padding: '0 12px', backgroundColor: '#F2D7FF' }} />)}
            {listTitle.toLowerCase() !== 'todo' && listTitle.toLowerCase() !== 'done' && listTitle.toLowerCase() !== 'doing' && (
                <Chip label={cardCount} style={{ marginLeft: '18px', padding: '0 12px', backgroundColor: '#FFC7E3' }} />
            )}
          </Typography>
          
          <MoreHorizIcon
            sx={TitleStyle.more}
            onClick={handleToggle}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            disablePortal
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onBlur={() => setOpen(false)}
                >
                  <MenuItem onClick={handleOnDelete}>Delete List</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </div>
      )}
    </div>
  );
};

export default Title;
