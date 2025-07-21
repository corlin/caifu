import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HeaderProps } from '../../types';
import { BREAKPOINTS, SITE_CONFIG } from '../../constants';

// Styled components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${BREAKPOINTS.md}px) {
    padding: 0.75rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 0.5rem;
`;

const SiteName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 1.2rem;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 0.5rem;
`;

const NavLink = styled.a`
  display: block;
  padding: 0.5rem;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #0066cc;
  }
`;

const SubMenu = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 0.5rem 0;
  min-width: 150px;
  list-style: none;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  z-index: 1001;
`;

const SubMenuItem = styled.li`
  margin: 0;
`;

const SubMenuLink = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  font-weight: 400;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
    color: #0066cc;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

const AuthButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0052a3;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HamburgerIcon = styled.span`
  display: block;
  width: 24px;
  height: 2px;
  background-color: #333;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: #333;
    left: 0;
  }
  
  &::before {
    top: -6px;
  }
  
  &::after {
    bottom: -6px;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 2000;
  transform: ${props => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${BREAKPOINTS.md}px) {
    display: block;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0;
`;

const MobileNavItem = styled.li`
  margin: 0;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 1rem;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid #eee;
`;

const MobileSubMenu = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  background-color: #f5f5f5;
`;

const MobileSubMenuItem = styled.li`
  margin: 0;
`;

const MobileSubMenuLink = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  color: #333;
  text-decoration: none;
  font-weight: 400;
  border-bottom: 1px solid #eee;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  float: right;
`;

const SearchContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: ${props => (props.$isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1002;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SearchCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.2rem;
`;

// Main component
const Header: React.FC<HeaderProps> = ({
  logo,
  menuItems,
  userAuthenticated,
  onSearch,
  onLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINTS.md) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle submenu toggle
  const toggleSubMenu = (id: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  // Handle authentication
  const handleAuthAction = () => {
    if (userAuthenticated) {
      onLogout();
    } else {
      onLogin();
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Logo src={logo || SITE_CONFIG.logo} alt={SITE_CONFIG.name} />
          <SiteName>{SITE_CONFIG.name}</SiteName>
        </LogoContainer>

        <NavContainer>
          <NavList>
            {menuItems.map(item => (
              <NavItem key={item.id}>
                {item.subItems && item.subItems.length > 0 ? (
                  <>
                    <NavLink 
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu(item.id);
                      }}
                    >
                      {item.title}
                    </NavLink>
                    <SubMenu $isOpen={!!openSubMenus[item.id]}>
                      {item.subItems.map(subItem => (
                        <SubMenuItem key={subItem.id}>
                          <SubMenuLink href={subItem.url}>{subItem.title}</SubMenuLink>
                        </SubMenuItem>
                      ))}
                    </SubMenu>
                  </>
                ) : (
                  <NavLink href={item.url}>{item.title}</NavLink>
                )}
              </NavItem>
            ))}
          </NavList>
        </NavContainer>

        <ActionsContainer>
          <SearchButton onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </SearchButton>
          <AuthButton onClick={handleAuthAction}>
            {userAuthenticated ? '退出' : '登录'}
          </AuthButton>
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <HamburgerIcon />
          </MobileMenuButton>
        </ActionsContainer>
      </HeaderContent>

      {/* Mobile Menu */}
      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <LogoContainer>
            <Logo src={logo || SITE_CONFIG.logo} alt={SITE_CONFIG.name} />
            <SiteName>{SITE_CONFIG.name}</SiteName>
          </LogoContainer>
          <CloseButton onClick={() => setMobileMenuOpen(false)}>×</CloseButton>
        </MobileMenuHeader>
        <MobileNavList>
          {menuItems.map(item => (
            <MobileNavItem key={item.id}>
              {item.subItems && item.subItems.length > 0 ? (
                <>
                  <MobileNavLink 
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubMenu(item.id);
                    }}
                  >
                    {item.title}
                    <ExpandButton>
                      {openSubMenus[item.id] ? '▲' : '▼'}
                    </ExpandButton>
                  </MobileNavLink>
                  <MobileSubMenu $isOpen={!!openSubMenus[item.id]}>
                    {item.subItems.map(subItem => (
                      <MobileSubMenuItem key={subItem.id}>
                        <MobileSubMenuLink href={subItem.url}>
                          {subItem.title}
                        </MobileSubMenuLink>
                      </MobileSubMenuItem>
                    ))}
                  </MobileSubMenu>
                </>
              ) : (
                <MobileNavLink href={item.url}>{item.title}</MobileNavLink>
              )}
            </MobileNavItem>
          ))}
          <MobileNavItem>
            <MobileNavLink href="#" onClick={handleAuthAction}>
              {userAuthenticated ? '退出' : '登录'}
            </MobileNavLink>
          </MobileNavItem>
        </MobileNavList>
      </MobileMenu>

      {/* Search Overlay */}
      <SearchContainer $isOpen={searchOpen}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
          <SearchInput
            type="text"
            placeholder="搜索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <SearchCloseButton type="button" onClick={() => setSearchOpen(false)}>
            ×
          </SearchCloseButton>
        </form>
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;