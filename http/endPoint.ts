import { Category } from '@/types/category'

export const API_ENDPOINTS = {
  /* AUTH */
  refresh: '/refresh', // get
  login: '/login', // post
  register: '/registration', // post
  /* TASKS */
  postTask: '/tasks',
  putTask: '/tasks',
  getTask: (id: number) => '/tasks/' + id,
  getFullTask: (id: number) => '/task/' + id,
  getTasks: (category: Category, page: number) => '/tasks?category=' + category + '&page=' + page,
  checkTaskFlag: (id: number) => '/tasks/' + id, // post
  deleteTask: (id: number) => '/tasks/' + id,
  downloadTask: (fileName: string) => '/tasks/' + fileName, // (download file with task)
  getTaskAnswer: (id: number) => '/answer-task?id=' + id,
  /* USERS */
  getFullUser: (id: number) => '/user/' + id,
  getUsers: (page: number) => '/users?page=' + page,
  getNotActivatedUsers: (page: number) => '/not-users?page=' + page,
  getNewUsers: (page: number) => '/new-users?page=' + page,
  getUserScore: '/user-score',
  getScoreboard: (category: Category) => '/scoreboard?category=' + category,
  // downloadStudentCard: (id: number) => '/students/' + id,
  downloadStudentCard: '/students/',
  acceptAddCategoryToUser: (id: number) => '/user/' + id, // put
  rejectAddCategoryToUser_ADM: (id: number, category: string) => '/user/' + id + '?category=' + category, // delete
  rejectAddCategoryToUser_MDR: (id: number) => '/user/' + id, // delete
  putUser: '/user', // path by which the user changes his own data
  deleteUser: (id: number) => '/users/' + id,
  giveRole: '/give-role', // put
  deleteCategory: (id: number, category: Category) => '/user-category?id=' + id + '&category=' + category, // deletee [+ id]
  logout: '/logout', // delete
  activation: '/activation', // put | delete
}
