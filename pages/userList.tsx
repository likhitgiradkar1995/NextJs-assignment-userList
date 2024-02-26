import { Avatar, Card, Button } from "@mantine/core";
import {
  IconPhoneCall,
  IconWorld,
  IconAt,
  IconUserPlus,
  IconTrash,
  IconUserMinus,
  IconStar,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserList = ({ users }: any) => {
  const [usersList, setUsersList] = useState<UserType[]>();
  const [followedUsers, setfollowedUsers] = useState<UserType[]>();

  useEffect(() => {
    if (users?.length > 0) {
      setUsersList([...users]);
    }
  }, [users]);

  const onFollowUnfollowBtnClick = (user: UserType) => {
    setfollowedUsers((prevFollowedUsers: UserType[] | undefined) => {
      const users = prevFollowedUsers || [];
      const isUserFollowed = users.some(
        (userItem: UserType) => userItem.id === user.id
      );
      if (isUserFollowed) {
        return users.filter((userItem: UserType) => userItem.id !== user.id);
      } else {
        return [...users, user];
      }
    });
  };

  const isFollowedUser = (user: UserType) => {
    let followed = followedUsers?.find((userItem) => userItem.id === user.id);
    return followed ? true : false;
  };

  const onDeleteClick = (user: UserType) => {
    if (usersList && usersList?.length > 0) {
      let newUserList = usersList.filter((userItem) => userItem.id !== user.id);
      setUsersList([...newUserList]);
    }
  };

  return (
    <div className="container">
      {usersList && usersList?.length > 0
        ? usersList?.map((user: any) => (
            <Card key={user.id} className="user-card">
              <Avatar
                radius="xl"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt={`Avatar for ${user.name}`}
                className="user-avatar"
              />
              <div className="user-info">
                <h3>
                  {user.name}
                  {"  "}
                  {isFollowedUser(user) ? <IconStar /> : null}
                </h3>

                <div>
                  <p className="user-data">
                    <IconAt />
                    <a href={"mailto:" + user.email}>{user.email}</a>
                  </p>
                  <p className="user-data">
                    <IconPhoneCall />
                    <a href={"tel:" + user.email}>{user.phone}</a>
                  </p>
                  <p className="user-data">
                    <IconWorld />
                    <a href={"//" + user.website} target="_blank">
                      {user.website}
                    </a>
                  </p>
                </div>
                <div className="button-container">
                  <Button
                    size="lg"
                    leftSection={
                      isFollowedUser(user) ? (
                        <IconUserMinus color="black" />
                      ) : (
                        <IconUserPlus size={22} color="white" />
                      )
                    }
                    className={
                      isFollowedUser(user) ? "unfollow-btn" : "follow-btn"
                    }
                    onClick={() => onFollowUnfollowBtnClick(user)}
                  >
                    {"  "}
                    {isFollowedUser(user) ? "UnFollow" : "Follow"}
                  </Button>

                  <Button
                    size="lg"
                    leftSection={<IconTrash size={22} color="#228be6" />}
                    className="delete-btn"
                    onClick={() => onDeleteClick(user)}
                  >
                    {"  "}Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        : null}
    </div>
  );
};

export default UserList;
