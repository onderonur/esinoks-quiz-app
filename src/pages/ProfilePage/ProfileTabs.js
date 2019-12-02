import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import ProfileQuizList from "./ProfileQuizList";
import SignInMethods from "./SignInManagement";

const TabPanel = ({ children, value, index }) => {
  return (
    <Box p={1} hidden={index !== value}>
      {children}
    </Box>
  );
};

const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Quizler" />
        <Tab label="Profil" />
      </Tabs>
      <div>
        <TabPanel value={value} index={0}>
          <ProfileQuizList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignInMethods />
        </TabPanel>
      </div>
    </div>
  );
};

export default ProfileTabs;
