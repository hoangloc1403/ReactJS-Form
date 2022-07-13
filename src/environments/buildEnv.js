export default function ({ NODE_ENV = 'development' } = {}) {
  return {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    api: {
      login: 'user/login',
      blogList: 'blogs',
      createPost: 'posts',
      updatePost: 'posts',
      getPost: 'posts',
      getCategory: 'categories',
      getBlogDetail: 'blogs',
      getUserList: 'user/admin',
      getRoleList: 'roles',
    },
    isDevelopment: NODE_ENV === 'development',
  };
}
