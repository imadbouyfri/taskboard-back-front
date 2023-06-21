import { Collapse, InputBase, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";

const AddCard = ({ toggleAddCard, setToggleAddCard, list, boardLists, setBoardLists, setList }) => {
  const addCardStyle = {
    add: {
      borderRadius: 2.5,
      padding: 0.5,
      marginTop: 1,
      marginBottom: 1.5,
      marginLeft: 1,
      marginRight: 1,
      /* From https://css.glass */
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
  };
  
  const inputCard = {
    cont: {
      marginLeft: 1,
      marginRight: 1,
      paddingBottom: 4,
      paddingLeft: 1,
    },
    addButton: {
      margin: 1,
    },
  };
  
  const [cardTitle, setCardTitle] = useState("");
  const { user } = useSelector((state) => state.auth);
  
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    if (!cardTitle) return;
    const { data } = await axios.post(
      `http://localhost:3001/card/create`,
      {
        name: cardTitle,
        list_id: list._id
      },
      config
    );
    // creat card permission
    await axios.post('http://localhost:3001/cardPermission', { card: data._id, user: user._id, role: 'admin' });
    const cardResponse = await axios.get(`http://localhost:3001/card/${data._id}`);
    const newCard = {
      _id: cardResponse.data._id,
      name: cardResponse.data.name,
      cardPermissions: [...cardResponse.data.cardPermissions],
      createdAt: cardResponse.data.createdAt
    };
    const newList = { ...list, cards: [...list.cards, newCard] };
    const newBoardLists = boardLists.map((boardList) =>
      boardList._id === list._id ? newList : boardList
    );
    setBoardLists(newBoardLists);
    setList(newList);
    setCardTitle("");
    // add card to history
    await axios.post("http://localhost:3001/cardHistory", {
      user: user._id,
      card: newCard._id,
      board: list.board_id,
      action: `add`,
    })
    setToggleAddCard(!toggleAddCard);
  };
  
  const handleOnClose = () => {
    setToggleAddCard(!toggleAddCard);
    setCardTitle("");
  };
  
  return (
    <>
      <Collapse in={!toggleAddCard}>
        <Paper sx={{ ...addCardStyle.add, display: "flex", justifyContent: "center", alignItems: "center" }} variant={"elevation = 0"}>
          <Button
            children={
              <>
                <AddIcon sx={{ fontSize: "1.6rem" }}/>
              </>
            }
            color="inherit"
            onClick={() => setToggleAddCard(!toggleAddCard)}
          />
        </Paper>
      </Collapse>
      
      <Collapse in={toggleAddCard}>
        <Paper sx={inputCard.cont}>
          <InputBase
            multiline
            fullWidth
            placeholder="Enter Card Title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
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
            type="submit"
            sx={inputCard.addButton}
            variant="contained"
            children="Add card"
            color="success"
            onClick={handleOnClick}
          />
          <CloseIcon
            fontSize="large"
            sx={{
              marginLeft: 2,
              "&:hover": {
                cursor: "pointer",
                color: "#353639",
              },
            }}
            onClick={handleOnClose}
          />
        </div>
      </Collapse>
    </>
  );
};

export default AddCard;
