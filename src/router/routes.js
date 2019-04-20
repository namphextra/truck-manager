export default [
  {
    path: '/',
    redirect: {
      name: 'truckList'
    }
  },
  {
    path: '/truck',
    name: 'truckManager',
    component: () => import('@/views/truck/Index'),
    redirect: {
      name: 'truckList'
    },
    children: [
      {
        path: 'list',
        name: 'truckList',
        component: () => import('@/views/truck/TruckList')
      },
      {
        path: ':plate',
        name: 'truck',
        component: () => import('@/views/truck/Truck')
      }
    ]
  },
  {
    path: '/another',
    name: 'another',
    component: () => import('@/views/truck/TruckList')
  }
]
