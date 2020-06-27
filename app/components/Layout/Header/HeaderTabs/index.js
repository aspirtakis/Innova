import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';

import layoutStyles from 'containers/Layout/styles';
import Profile from 'containers/Layout/Profile';
import Search from 'components/Layout/Header/Search';
import SettingsButton from 'containers/Layout/Settings/settingsButton';
import Tabs from './Tabs';

import {
  AppBody,
  AppLayout,
  Collapse,
  Footer,
  FooterBody,
  FooterInlineList,
  FooterLink,
  FooterLogo,
  Main,
  SideBar,
  SideBarActionMenu,
  SideBarClose,
  SideBarLink,
  SideBarMenu,
  SideBarSubMenu,
  TitleBar,
  TitleBarTitle,
  TopBar,
  TopBarActionMenu,
  TopBarItem,
  TopBarLink,
  TopBarLogo,
  TopBarMenu,
  TopBarTitle
} from "@kpn-style/react";

class HeaderTabs extends React.Component {
  handleOnClickAway = () => {
    const { showSearch, onShowSearch } = this.props;

    setTimeout(() => {
      if (showSearch) {
        onShowSearch(false);
      }
    }, 0);
  };

  handleHideSearch = value => {
    this.props.onShowSearch(value);
  };

  render() {
    const {
      classes,
      drawerIsOpen,
      selectedMenuItemHasChildren,
      openViews,
      selectedMenuItem,
      showSearch,
      handleDrawerToggle,
      handleCloseView,
      handleTabChange,
    } = this.props;

    return (

      

      <AppBar
        elevation={0}
        position="fixed"
        color="default"
        className={classNames(
          'primary-appbar',
          `${selectedMenuItemHasChildren && 'no-box-shadow'}`,
          classes.appBar,
          drawerIsOpen && classes.appBarShift,
        )}
      >
        <Toolbar style={{maxHeight:1}} disableGutters={!drawerIsOpen}>
          <IconButton aria-label="open drawer" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          {openViews && (
            <Tabs
              openViews={openViews}
              selectedMenuItem={selectedMenuItem}
              handleCloseView={handleCloseView}
              handleTabChange={handleTabChange}
            />
          )}
      
   
          <Profile user={this.props.user} drawerIsOpen={drawerIsOpen} />

        </Toolbar>
        <div style={{
          marginTop:1,
          minHeight:48, 
          backgroundColor:'#009900',
        }}> <div  style={{ color: '#FFFFFF',fontFamily: "KPN Metric",
        fontSize: 24,
        fontWeight: 'bold',
        marginTop:8,
        marginLeft:17,
    
      }} >Ways funnel</div></div>

      </AppBar>


    );
  }
}


// {showSearch && (
//   <ClickAwayListener onClickAway={this.handleOnClickAway}>
//     <Search />
//   </ClickAwayListener>
// )}
// <IconButton
//   aria-label="search"
//   onClick={() => this.handleHideSearch(!showSearch)}
// >
//   <SearchIcon />
// </IconButton>

HeaderTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerIsOpen: PropTypes.bool.isRequired,
  showSearch: PropTypes.bool.isRequired,
  selectedMenuItemHasChildren: PropTypes.bool.isRequired,
  onShowSearch: PropTypes.func.isRequired,
  openViews: PropTypes.array.isRequired,
  selectedMenuItem: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  handleCloseView: PropTypes.func.isRequired,
};

export default withStyles(theme => layoutStyles(theme), {
  withTheme: true,
})(HeaderTabs);
