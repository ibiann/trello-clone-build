import React from "react";
import "./appbar.scss";
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import ReportIcon from '@mui/icons-material/Report';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function AppBar() {
  return (
    <nav className="app-navbar-top">
      <BootstrapContainer className="appbar-container">
        <Row>
          <Col sm={5} xs={12} className='col-no-padding'>
            <div className="action-apps">
              <div className="item all"><MenuIcon/></div>
              <div className="item home"><HomeIcon/></div>
              <div className="item boards"><AssignmentIcon/>&nbsp;&nbsp;<strong>Boards</strong></div>
              <div className="item searching-bar">
                <InputGroup className="group-searching">
                  <FormControl className="input-search" placeholder="Jump to..."/>
                <InputGroup.Text className="input-icon-searching-bar"><SearchIcon/></InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="app-branding text">
              <a href="www.google.com" target="blank">
                <img src="" className="logo-top" alt="merres-logo" />
                <span className="logo-app-name">Merres</span>
              </a>
            </div>
          </Col>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="user-action">
              <div className="item quick"><ReportIcon/></div>
              <div className="item news"><AnnouncementIcon/></div>
              <div className="item notification"><NotificationsActiveIcon/></div>
              <div className="item user-avatar">
                <img src="https://picsum.photos/200/200" alt="avatar-user" title="merres"/>
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}
  
export default AppBar;
