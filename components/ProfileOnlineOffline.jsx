import {React} from "react";

const ProfileOnlineOffline = (props) => {
    if (props.online) {
        return (
            <>
                <span className="am_online">Online</span>
            </>
          );
    }
    else{
        return (
            <>
                <span className="am_offline">Away</span>
            </>
          );
    }
  
};
export default ProfileOnlineOffline;
