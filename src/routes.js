import React, { lazy } from 'react'

const Dashboard = React.lazy(() => import('./views/admin/dashboard/Dashboard'))

//Admin views
// Dashboard
const Accueil = React.lazy(() => import('./views/admin/dashboard/Dashboard'))
const MesDonnees = React.lazy(() => import('./views/admin/dashboard/MesDonnees'))
const MyAccount = React.lazy(() => import('./views/admin/dashboard/MonCompte'))
const UpdateAccount = React.lazy(() => import('./views/admin/dashboard/UpdateAccount'))

// Machines
const ListeMachines = React.lazy(() => import('./views/admin/machine/ListeMachines'))
const CreateMachine = React.lazy(() => import('./views/admin/machine/CreateMachine'))
const UpdateMachine = React.lazy(() => import('./views/admin/machine/UpdateMachine'))
const DeleteMachine = React.lazy(() => import('./views/admin/machine/DeleteMachine'))

//Invoice
const CreateInvoice = React.lazy(() => import('./views/admin/invoice/CreateInvoice'))
const ListInvoice = React.lazy(() => import('./views/admin/invoice/ListInvoice'))

// Roles
const CreateRole = React.lazy(() => import('./views/admin/roles/CreateRole'))
const ListeRoles = React.lazy(() => import('./views/admin/roles/ListeRoles'))

// Utilisations
const CreateUse = React.lazy(() => import('./views/admin/use/CreateUse'))
const ListeUse = React.lazy(() => import('./views/admin/use/ListeUse'))
const UpdateUse = React.lazy(() => import('./views/admin/use/UpdateUse'))
const DeleteUse = React.lazy(() => import('./views/admin/use/DeleteUse'))

// Users
const CreateUser = React.lazy(() => import('./views/admin/users/CreateUser'))
const ListeUser = React.lazy(() => import('./views/admin/users/UsersList'))
const UpdateUser = React.lazy(() => import('./views/admin/users/UpdateUser'))
const DeleteUser = React.lazy(() => import('./views/admin/users/DeleteUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/dashboard/moncompte', name: 'MyAccount', component: MyAccount, exact: true },
  { path: '/admin/dashboard/mesdonnees', name: 'MesDonnees', component: MesDonnees },
  { path: '/admin/dashboard/modifierdonnees', name: 'UpdateAccount', component: UpdateAccount },
  { path: '/admin/machine', name: 'ListeMachines', component: ListeMachines, exact: true },
  { path: '/admin/machine/listemachines', name: 'ListeMachines', component: ListeMachines },
  { path: '/admin/machine/creermachine', name: 'CreateMachine', component: CreateMachine },
  { path: '/admin/machine/updatemachine', name: 'UpdateMachine', component: UpdateMachine },
  { path: '/admin/machine/deletemachine', name: 'DeleteMachine', component: DeleteMachine },
  { path: '/admin/use', name: 'ListeUse', component: ListeUse },
  { path: '/admin/use/listeuse', name: 'ListeUse', component: ListeUse },
  { path: '/admin/use/creerutilisation', name: 'CreateUse', component: CreateUse },
  { path: '/admin/invoice/invoicelist', name: 'ListInvoice', component: ListInvoice },
  { path: '/admin/invoice/createinvoice', name: 'CreateInvoice', component: CreateInvoice },
  { path: '/admin/roles', name: 'ListeRoles', component: ListeRoles },
  { path: '/admin/roles/roleslist', name: 'ListeRoles', component: ListeRoles },
  { path: '/admin/roles/createrole', name: 'CreateRole', component: CreateRole },
  { path: '/admin/users/userslist', name: 'ListeUser', component: ListeUser },
  { path: '/admin/users/createuser', name: 'CreateUser', component: CreateUser },
  { path: '/admin/users/updateuser', name: 'UpdateUser', component: UpdateUser, exact: true },
  { path: '/admin/users/deleteuser', name: 'DeleteUser', component: DeleteUser },
]

export default routes
