import { configureStore } from '@reduxjs/toolkit'
import toDoList from '../reducers/toDoList'

export const store = configureStore({
  reducer: {
    dataJobs: toDoList,
  },
})