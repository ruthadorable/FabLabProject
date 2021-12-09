import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilControl,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilUserFemale,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Mon Compte',
  },
  {
    component: CNavItem,
    name: 'Mes données',
    to: '/theme/colors',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Modifier mes données',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gérer',
  },
  {
    component: CNavGroup,
    name: 'Machines',
    to: '/base',
    icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des machines',
        to: '/base/listemachines',
      },
      {
        component: CNavItem,
        name: 'Créer une machine',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Modifier une machine',
        to: '/base/updatemachine',
      },
      {
        component: CNavItem,
        name: 'Supprimer une machine',
        to: '/base/deletemachine',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Utilisations',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des utilisations',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Créer une utilisation',
        to: '/buttons/buttons',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Factures',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des factures',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Créer une facture',
        to: '/forms/select',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Roles',
    to: '/charts',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des roles',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'Créer un role',
        to: '/icons/flags',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Utilisateurs',
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des utilisateurs',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'Créer un utilisateur',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
