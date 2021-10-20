import React from "react";
import { makeStyles } from "@material-ui/core";
import  AdminNavigation  from "./AdminNavigation";

function Icon (name) {
    return <></>;
}

const	items=[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Management',
                itemId: '/management',
                elemBefore: () => <Icon name="users" />,
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                    // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                    elemBefore: () => <Icon name="cloud-snow" />,
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
                    elemBefore: () => <Icon name="coffee" />,
                  },
                ],
              },
              {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },
            ];
            
const Menu = ({match}) => {


  const useStyle = makeStyles((theme)=>(
  {
  	root:{},
  }));

  const handleCellClick = (params, e) => {
     console.log('params', params);
  };
    

   
   return (<AdminNavigation   activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={items} />);
};

export default Menu;
