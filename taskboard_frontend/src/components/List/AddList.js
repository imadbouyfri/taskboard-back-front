import { InputBase, Paper, Typography, Collapse } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";

const AddCard = ({ toggleNewList, setToggleNewList, boardLists, setBoardLists, boardId }) => {
  const { user } = useSelector((state) => state.auth);
  const addCardStyle = {
    add: {
      borderRadius: 2,
      width: 285,
      padding: 0.2,
      marginTop: 3,
      marginLeft: 1,
      marginRight: 1,
      backgroundColor: "#ececec",
      flexShrink: 0,
    },
  };
  const inputCard = {
    cont: {
      display: "flex",
      flexDirection: "column",
    },
    paper: {
      borderRadius: 2,
      width: 290,
      marginTop: 0,
      marginLeft: 1.5,
      marginRight: 1,
      padding: 1
    },
    addButton: {
      borderRadius: 2,
      margin: 1.5
    },
  };
  
  const [title, setTitle] = useState("");
  const handleOnClick = async () => {
    if (!title) return;
    try {
      const newListItem = {
        name: title,
        cards: [],
        board_id: boardId
      };
      const { data } = await axios.post(`http://localhost:3001/list/${boardId}/create`, newListItem);
      const newList = { _id: data._id, name: data.name, cards: data.cards, board_id: data.board_id }
      setBoardLists([...boardLists, { ...newList }]);
      setTitle("");
      // add list to history
      await axios.post("http://localhost:3001/listHistory", {
        user: user._id,
        list: newList._id,
        board: boardId,
        action: `add`,
      })
      setToggleNewList(!toggleNewList);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <Collapse in={!toggleNewList}>
        <Paper sx={addCardStyle.add}>
          <Button
            children={
              <>
                <AddIcon sx={{ fontSize: "1.4rem", marginRight: '0.8rem', fontWeight: 'bold' }}/>
                <Typography sx={{ fontSize: "1rem", fontWeight: '0.4' }}> Add New List</Typography>
              </>
            }
            color="inherit"
            onClick={() => setToggleNewList(!toggleNewList)}
          />
        </Paper>
      </Collapse>
      
      <Collapse in={toggleNewList}>
        <div>
          <Paper sx={inputCard.paper}>
            <InputBase
              multiline
              fullWidth
              placeholder="Enter List Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Paper>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              sx={inputCard.addButton}
              variant="contained"
              children="ADD List"
              color="success"
              onClick={handleOnClick}
            />
            <img src="/images/icons8-cancel-48.png" alt="My Image" style={{maxWidth: '32px', maxHeight: '32px', cursor: "pointer", marginLeft: "10px"}} onClick={() => setToggleNewList(!toggleNewList)}/>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default AddCard;
