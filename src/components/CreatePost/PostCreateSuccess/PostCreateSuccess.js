
import React from 'react';

export const PostCreateSuccess = (formikProps) => {
    const { title, image } = formikProps.values;
    return (
        <>
            <div>
                {title}
                <img src={image} />
                {console.log(image)}
                {/* <List>
          <ListItem>
            <ListItemText
              primary='First Name'
              secondary={firstName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Middle Name'
              secondary={middleName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Last Name'
              secondary={lastName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Email'
              secondary={email}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='City'
              secondary={city}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='State'
              secondary={state}
            />
          </ListItem>
        </List> */}
            </div>
        </>
    );
};

