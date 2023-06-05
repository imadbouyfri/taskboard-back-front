import AppBar from '@mui/material/AppBar';
import { Box, Button, MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import UserAvatar from "./avatar/UserAvatar";
import { Badge, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notification/${user._id}`);
        console.log(response.data);
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const styles = {
    backgroundColor: '#FFFFFF',
    color: '#4d56bf',
    top: 0,
    position: 'fixed',
    zIndex: 100,
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate('/');
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles}>
        <Toolbar variant='dense'>
          <MenuItem key='Home' style={{ marginLeft: 20 }} onClick={() => navigate("/board")}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 25 }} color="inherit" component="div"
                        children='Taskboard'/>
          </MenuItem>
          {user && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          
          )}
          <Box sx={{ flexGrow: 1 }}/>
          
          {/*Bell and profile icons*/}
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center', justifyContent: 'center'} }}>
            {user ? (
              <>
                <Box sx={{ marginRight: 3 }}>
                  <Tooltip title="Open Notifications">
                      <IconButton
                          id="basic-button"
                          onClick={handleClick}
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                        >
                          <Badge color="error" badgeContent={notifications.length} max={50}>
  <NotificationsIcon />
</Badge>
                      </IconButton>
                  </Tooltip>
                  <Menu
                    id="basic-menu"
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <div className="notification-container" style={{ maxHeight: '400px', overflow: 'auto' }}>
                      {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <MenuItem>
                              <Link to={`/taskboard/${notification.board._id}`} style={{ textDecoration: 'none', color: 'black', transition: 'red 0.3s',}}>
                              <div className="notification-item" style={{ margin: '3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {notification.admin && (
                                <UserAvatar name={notification.admin.name} color={notification.admin.color} />
                              )}
                              <div className="notification-message">
                                {notification.admin? (
                                  `${notification.admin.name} ${notification.action === "add" ? "added you to" : notification.action === "role" ? "added you as an admin" : (notification.action === "update" ? "updated" : "deleted")} the board ${notification.board.name}`
                                ) : (
                                  `${notification.action === "add" ? "added" : (notification.action === "update" ? "updated" : "deleted")} you to the board ${notification.board}`
                                )}
                              </div>
                            </div>              
                            </Link>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem onClick={handleCloseUserMenu}>
                            No notifications found
                          </MenuItem>
                        )}
                        {notifications.length > 0 && (
                          <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '95%'}}>
                          <Button variant="contained" style={{ width: '100%' }}>
                            Mark as read
                          </Button>
                        </div>
                        )}
                    </div>
                  </Menu>
                </Box>
                <Box>
                  <Tooltip title="Open settings">
                    <div style={styles.avatar} onClick={handleOpenUserMenu}>
                      <UserAvatar name={user.name} color={user.color} />
                    </div>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '20px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>Notifications</MenuItem>
                    <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>Profile</MenuItem>
                    <MenuItem key="menus" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Box>
                <Button onClick={() => navigate("/login")}>
                  Login
                </Button>
                
                <Button onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Box>
            )}
          </Box>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header