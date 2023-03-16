import { Link, Navigate, Outlet } from 'react-router-dom';
import { Box, VStack, IconButton, Tooltip } from '@chakra-ui/react';
import { LinkProps, NavLink } from 'react-router-dom';
import AppLogo from '@dashboard/components/AppLogo';
import DarkModeToggler from '@dashboard/components/DarkModeToggler';
import { BiLogOutCircle } from 'react-icons/bi';
import { RiCoupon5Line, RiHistoryLine, RiSettings2Line } from 'react-icons/ri';
import { useAppSelector } from '@dashboard/store/store';
import { supabase } from '@dashboard/utils/supabase.utils';

// Custon Link Component
type CustomLinkProps = LinkProps & { label: string };
const CustomLink = ({ children, label, ...rest }: CustomLinkProps) => (
  <NavLink {...rest}>
    {({ isActive }) => (
      <Tooltip label={label} hasArrow placement="right">
        <IconButton
          as="div"
          aria-label={label}
          variant={isActive ? 'primary' : 'solid'}
        >
          {children}
        </IconButton>
      </Tooltip>
    )}
  </NavLink>
);

// Custom Sidebar
const Sidebar = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  const routes = [
    {
      label: 'My Coupons',
      icon: <RiCoupon5Line />,
      to: '/dashboard/my-coupons',
    },
    {
      label: 'My Orders',
      icon: <RiHistoryLine />,
      to: '/dashboard/my-orders',
    },
    {
      label: 'Settings',
      icon: <RiSettings2Line />,
      to: '/dashboard/profile',
    },
  ];

  return (
    <VStack
      as="nav"
      gap={4}
      justifyContent="space-between"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '60px',
        background: 'customBg',
        padding: '10px',
        zIndex: 1,
        borderRightWidth: '1px',
        borderColor: 'customBorder',
      }}
    >
      <Link to="/dashboard">
        <AppLogo isSmall />
      </Link>

      <VStack>
        {routes.map(({ icon, to, label }) => (
          <CustomLink key={to} to={to} label={label}>
            {icon}
          </CustomLink>
        ))}
      </VStack>

      <VStack>
        <DarkModeToggler />
        <Tooltip label="Logout" hasArrow placement="right">
          <IconButton aria-label="Logout" onClick={logout}>
            <BiLogOutCircle />
          </IconButton>
        </Tooltip>
      </VStack>
    </VStack>
  );
};

// Layout
const DashboardLayout = () => {
  const { loading, user, error } = useAppSelector((state) => state.auth);

  if (error) return <p>Something went wrong</p>;
  if (loading || !user) return <p>Loading</p>;
  if (!user) return <Navigate to="/" />;

  return (
    <>
      <Sidebar />
      <Box flex={1} paddingLeft="60px">
        <Outlet />
      </Box>
    </>
  );
};

export default DashboardLayout;
