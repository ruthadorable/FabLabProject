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
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Mon Compte',
    to: '/admin/dashboard/moncompte',
  },
  {
    component: CNavItem,
    name: 'Mes données',
    to: '/admin/dashboard/mesdonnees',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Modifier mes données',
    to: '/admin/dashboard/modifierdonnees',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gérer',
  },
  {
    component: CNavGroup,
    name: 'Machines',
    to: '/admin/machine',
    icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des machines',
        to: '/admin/machine/listemachines',
      },
      {
        component: CNavItem,
        name: 'Créer une machine',
        to: '/admin/machine/creermachine',
      },
      {
        component: CNavItem,
        name: 'Modifier une machine',
        to: '/admin/machine/updatemachine',
      },
      {
        component: CNavItem,
        name: 'Supprimer une machine',
        to: '/admin/machine/deletemachine',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Utilisations',
    to: '/admin/use',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des utilisations',
        to: '/admin/use/listeuse',
      },
      {
        component: CNavItem,
        name: 'Créer une utilisation',
        to: '/admin/use/creerutilisation',
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
        to: '/admin/invoice/invoicelist',
      },
      {
        component: CNavItem,
        name: 'Créer une facture',
        to: '/admin/invoice/createinvoice',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Roles',
    to: '/admin/roles',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des roles',
        to: '/admin/roles/roleslist',
      },
      {
        component: CNavItem,
        name: 'Créer un role',
        to: '/admin/roles/createrole',
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
        to: '/admin/users/userslist',
      },
      {
        component: CNavItem,
        name: 'Créer un utilisateur',
        to: '/admin/users/createuser',
      },
      {
        component: CNavItem,
        name: 'Modifier un utilisateur',
        to: '/admin/users/updateuser',
      },
      {
        component: CNavItem,
        name: 'Supprimer un utilisateur',
        to: '/admin/users/deleteuser',
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
        to: '/admin/register',
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
