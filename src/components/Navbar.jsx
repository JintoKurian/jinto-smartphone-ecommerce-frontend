import React from 'react'
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle
} from "flowbite-react";

import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';


// Ensure Font Awesome is loaded (via index.html or npm)

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }

  return (
    <Navbar
      fluid
      className="dark:bg-transparent backdrop-blur-lg shadow-none  top-0 left-0 w-full z-50"
    >
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="https://png.pngtree.com/png-vector/20220207/ourmid/pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Mobe shops
        </span>
      </NavbarBrand>

      {/* Right side: Avatar + Cart Icon */}
      <div className="flex items-center gap-4 md:order-2">
        {/* Cart Icon */}
        <button className="cursor-pointer text-gray-700 dark:text-white hover:text-green-600">
          <i className="fa-solid fa-cart-shopping fa-xl"></i>
        </button>

        {/* Avatar dropdown */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout} >Sign out</DropdownItem>
          <DropdownItem><DarkThemeToggle /></DropdownItem>
        </Dropdown>

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink href="#" active>Home</NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header
