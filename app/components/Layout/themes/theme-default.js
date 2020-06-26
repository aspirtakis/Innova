import { createMuiTheme } from '@material-ui/core/styles';

const themeDefault = createMuiTheme({
  palette: {
    primary: {
      500: '#090',
    },
    action: {
      active: '#09c',
    },
    text: {
      primary: '#333',
      secondary: '#666',
      divider: '#ccc',
    },
  },
  typography: {
    useNextVariants: true,
    subtitle1: {
      fontSize: 14,
    },
  },
  listItemText: {
    color: '#090',
  },
  custom: {
    link: {
      color: '#09c',
 
    },
    appBar: {
      backgroundColor: '#fff',
    },
    drawerPaper: {
      backgroundColor: '#fff',
    },
    drawerHeader: {
      backgroundColor: '#fff',
      diplay:'inline-flex',
      color: '#fff',
    },
    drawerMenuList: {
      backgroundColor: 'rgb(0, 153, 0)',
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
