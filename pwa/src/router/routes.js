const routes = [
  {
    path: '/',
    component: () => import('../layouts/mainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Index.vue') },
      { path: '/pessoas', component: () => import('../components/units/Unit001.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
