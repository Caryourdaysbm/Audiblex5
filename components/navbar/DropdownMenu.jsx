import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Images from "../../assets/images/image";
import { getCookie } from "../../assets/js/help_func";

const DropdownMenu = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [cookieUsername, setCookieUsername] = useState("");
  const [thumbnail] = useState(
    getCookie("thumbnail") || Images.default_thumbnail
  );

  useEffect(() => {
    setCookieUsername(getCookie("username"));
  }, []);

  console.log(cookieUsername);

  const dropdownItems = [
    {
      title: "Catalogue",
      uri: `/${cookieUsername}/catalogue`,
      type: "DUAL",
    },
    {
      title: "Create Job",
      uri: "/jobs/create-job",
      type: "CUSTOMER",
    },
    {
      title: "Pricing",
      uri: "/pricing/",
      type: "DUAL",
    },
    {
      title: "Manage Request",
      uri: "/jobs/requests",
      type: "CUSTOMER",
    },
    {
      title: "Subscription",
      uri: "/accounts/subscription/",
      type: "CUSTOMER",
    },
    {
      title: "Profile",
      uri: `/${cookieUsername}`,
      type: "DUAL",
    },
    {
      title: "Settings",
      uri: "/accounts/settings",
      type: "DUAL",
    },
    {
      title: "Logout",
      uri: "/accounts/logout",
      type: "DUAL",
    },
    {
      title: "Saved Jobs",
      uri: "/jobs/saved",
      type: "FREELANCER",
    },
  ];

  if (props.userID) {
    return (
      <div className="the_profile_pic">
        <Image
          src={thumbnail}
          alt="profile_p"
          height={48}
          width={48}
          onClick={() => {
            dropdown ? setDropdown(false) : setDropdown(true);
          }}
        />

        {dropdown && (
          <ul className="add_on_list" id="ForViewPort">
            {dropdownItems.map((option, index) => {
              if (option.type === props.userType || option.type === "DUAL") {
                return (
                  <Link href={option.uri} key={index}>
                    <li>{option.title}</li>
                  </Link>
                );
              }
            })}
          </ul>
        )}
      </div>
    );
  }
};

export default DropdownMenu;
