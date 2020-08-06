import React from 'react';

export const UserContext = React.createContext({
    user: {},
    setUser: () => {
        console.log('user change');
    }
});