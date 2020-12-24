import { IconButton } from "components/Button";
import { BoardsList } from "components/PrivateContainer/Sidebar/BoardsList";
import { authContext } from "context/auth/auth.context";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { COLORS } from "styles/constants";
import { flexCenterColumn, flexFullCenterRow } from "styles/mixins";

const Container = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "300px" : "100px")};

  background: ${COLORS.brand.primary};
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoButton = styled.button`
  margin-bottom: 30px;
  height: 50px;
  ${flexFullCenterRow};

  img {
    height: 100%;
  }
`;

const BoardListContainer = styled.div`
  flex: 1;
  width: 90%;
  margin-top: 30px;
  margin-bottom: 30px;
  ${flexCenterColumn};
`;

const AuthInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const ProfileImage = styled.img`
  width: 65px;
  height: auto;
  border-radius: 50%;
  border: 2px solid ${COLORS.ui.ui1};
`;

type SidebarProps = {};
const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const { user, signOut, signInWithGoogle } = useContext(authContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(isMouseOver || isSidebarPinned);
  }, [isMouseOver, isSidebarPinned]);

  return (
    <Container
      isOpen={isSidebarOpen || isSidebarPinned}
      // onMouseEnter={() => setIsMouseOver(true)}
      // onMouseLeave={() => setIsMouseOver(false)}
    >
      <LogoButton onClick={() => setIsSidebarPinned((current) => !current)}>
        <img
          src={`/assets/${
            isSidebarOpen ? "logo-light" : "logo-simple-light"
          }.svg`}
          alt=""
        />
      </LogoButton>
      <BoardListContainer>
        {isSidebarOpen && (
          <>
            <BoardsList
              boards={[
                {
                  label: "Some board",
                  id: "pt793fiqewhuclij",
                },
                {
                  label: "Some other board",
                  id: "pt793fiqef2whuclij",
                },
                {
                  label: "A third board",
                  id: "pt793fiqedfwhuclij",
                },
              ]}
            />
          </>
        )}
      </BoardListContainer>
      <AuthInfoContainer>
        <ProfileImage src={user.photoURL} />
        <IconButton
          icon="/assets/settings-light.svg"
          isFullWidth
          localHref="/settings"
        >
          {isSidebarOpen ? "Settings" : null}
        </IconButton>

        <IconButton icon="/assets/logout-light.svg" onClick={signOut} hasBorder>
          {isSidebarOpen ? "Log out" : null}
        </IconButton>
      </AuthInfoContainer>
    </Container>
  );
};

export default Sidebar;
