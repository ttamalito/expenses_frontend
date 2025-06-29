import React from 'react';
import Stack from '@mui/material/Stack';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutline';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import goTo from '../utils/goTo';

export default function HomeSideBar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState('profile');

  interface ItemProps {
    title: string;
    to: string;
    icon: any;
    selected: string;
    setSelected: (selected: string) => void;
  }

  const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
    return (
      <MenuItem
        active={selected === title}
        onClick={() => {
          setSelected(title);
          goTo(to);
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

  return (
    <>
      <Box
        sx={{
          '& .pro-icon-wrapper': {
            backgroundColor: 'transparent !important',
          },
          '& .pro-inner-item': {
            padding: '5px 35px 5px 20px !important',
          },
          '& .pro-inner-item:hover': {
            color: '#868dfb !important',
          },
          '& .pro-menu-item.active': {
            color: '#6870fa !important',
          },
        }}
      >
        <Sidebar
          collapsed={isCollapsed}
          rootStyles={{ height: '100vh', zIndex: 1000 }}
        >
          <Menu>
            {' '}
            {/* iconShape="square" */}
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => {
                return setIsCollapsed(!isCollapsed);
              }}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: '10px 0 20px 0',
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3">Expenses Manager</Typography>
                  <IconButton
                    onClick={() => {
                      return setIsCollapsed(!isCollapsed);
                    }}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {/*<img*/}
                  {/*    alt="profile-user"*/}
                  {/*    width="100px"*/}
                  {/*    height="100px"*/}
                  {/*    src={`../../assets/user.png`}*/}
                  {/*    style={{ cursor: "pointer", borderRadius: "50%" }}*/}
                  {/*/>*/}
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{ m: '10px 0 0 0' }}
                  >
                    Tamalito
                  </Typography>
                  <Typography variant="h5">
                    User
                  </Typography>
                </Box>
              </Box>
            )}
            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Item
                title="Dashboard/Home"
                to="/home"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                // color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px' }}
              >
                Data
              </Typography>
              {/*<Item*/}
              {/*    title="Manage Team"*/}
              {/*    to="/team"*/}
              {/*    icon={<PeopleOutlinedIcon />}*/}
              {/*    selected={selected}*/}
              {/*    setSelected={setSelected}*/}
              {/*/>*/}
              {/*<Item*/}
              {/*    title="Contacts Information"*/}
              {/*    to="/contacts"*/}
              {/*    icon={<ContactsOutlinedIcon />}*/}
              {/*    selected={selected}*/}
              {/*    setSelected={setSelected}*/}
              {/*/>*/}
              <Item
                title="Summaries"
                to="/summaries"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                sx={{ m: '15px 0 5px 20px' }}
              >
                Pages
              </Typography>
              <Item
                title="Profile Page"
                to="/profile"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Budget"
                to="/budget"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                sx={{ m: '15px 0 5px 20px' }}
              >
                Charts
              </Typography>
              <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/*<Item*/}
              {/*    title="Geography Chart"*/}
              {/*    to="/geography"*/}
              {/*    icon={<MapOutlinedIcon />}*/}
              {/*    selected={selected}*/}
              {/*    setSelected={setSelected}*/}
              {/*/>*/}
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
}
