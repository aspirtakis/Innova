import { createMuiTheme } from '@material-ui/core/styles';

const themeDefault = createMuiTheme({
  palette: {
    primary: {
      500: '#716aca',
    },
    action: {
      active: '#525672',
    },
    text: {
      primary: '#868aa8',
      secondary: '#868aa8',
      divider: '#292b3a',
    },
  },
  typography: {
    useNextVariants: true,
    subtitle1: {
      fontSize: 14,
    },
  },
  listItemText: {
    color: 'green',
  },
  custom: {
    link: {
      color: '#e10050',
    },
    appBar: {
      backgroundColor: '#fff',
    },
    drawerPaper: {
      backgroundColor: '#fff',
    },
    drawerHeader: {
      backgroundColor: '#fff',
      color: '#fff',
    },
    drawerMenuList: {
      backgroundColor: 'rgb(153, 204, 0)',
    },
    selectedItem: {
      backgroundColor: 'transparent',
    },
    selectedItemText: {
      color: '#090',
    },
    text: '#757575',
    title: {
      color: '#d6d7e1',
    },
  },
});

export default themeDefault;
