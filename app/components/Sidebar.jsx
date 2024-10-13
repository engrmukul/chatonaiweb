import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';


const Sidebar = () => {

    const router = useRouter();
    const pathname = usePathname();

    const navigateTo = (route) => {
        router.push(route); // Navigate to the specified route
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        router.push('/');
    };

    const menuItems = [
        { text: 'Chats', icon: <HomeIcon />, route: '/app/chats' },
        { text: 'Tasks for AI', icon: <PersonIcon />, route: '/app/task-for-ai' },
        { text: 'History', icon: <SettingsIcon />, route: '/app/history' },
    ];

    return (
        <Box variant="permanent" className="sidebar-nav">
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => navigateTo(item.route)}
                        className={pathname === item.route ? 'active' : ''}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button onClick={logout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
