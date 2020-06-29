import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import CalIcon from '@material-ui/icons/DateRange';
import FunnelIcon from '@material-ui/icons/ViewDay';

// Components
import DashboardPage from 'containers/Pages/DashboardPage/Loadable';
import Funnel from 'containers/Funnel/Loadable';
import Ideaonboard from 'containers/ideaonboard/Loadable';
import STGCalendar from 'containers/SgCalendar/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import iconhome from '../../images/icon_home.png';
import backlog from '../../images/icon_backlog.png';
import graveyard from '../../images/icon_graveyard.png';
// Menu tree
const Menu = [
  {
    id: 'dashboard',
    text: 'DashBoard',
    icon: <img style={{height:20}} src={iconhome}/>,
    url: '/',
    component: DashboardPage,
  },
  {
    id: 'funnel ',
    text: 'Ways funnel',
    icon: <img style={{height:20}} src={backlog}/>,
    url: '/Funnel',
    component: Funnel,
  },
  {
    id: 'calendar',
    text: 'SG-Calendar',
    icon: <img style={{height:20}} src={graveyard}/>,
    url: '/Calendar',
    component: STGCalendar,
  },
  {
    id: 'Ideaonboard',
    text: 'IdeaOnboard',
    icon: <img style={{height:20}} src={graveyard}/>,
    url: '/onboarding',
    component: Ideaonboard,
  },
];

// Asign index and parent fields for each item, which is needed for header tabs navigation
let index = 0;

Menu.map((item) => {
  const menuItem = item;
  menuItem.index = index;
  index += 1;
  if (menuItem.children) {
    menuItem.children.map((child) => {
      const childItem = child;

      childItem.index = index;
      childItem.parent = {
        id: childItem.id,
        parentId: menuItem.id,
        parentText: menuItem.text,
      };
      index += 1;

      return child;
    });
  }
  return item;
});

// Routes
const getRoute = (item) => (
  <Route key={item.id} exact path={item.url} component={item.component} />
);

const Routes = (location, dynamicMenu) => {
  const menu = dynamicMenu || Menu;
  return (
    <Switch key={location.key} location={location}>
      {menu.map((item) => (!item.children
        ? getRoute(item)
        : item.children.map((child) => getRoute(child))))}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export { Menu, Routes };
