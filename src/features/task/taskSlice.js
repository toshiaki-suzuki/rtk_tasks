import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/tasks/";
const token = localStorage.localJWT;

export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `JWT ${token}`
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("task/post", async (task) => {
  const res = await axios.post(apiUrl, task, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.data;
});

export const fetchAsyncUpdate = createAsyncThunk("task/put", async (task) => {
  const res = await axios.put(`${apiUrl}${task.id}`, task, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  });
  console.log(0);
  return res.data;
});

export const fetchAsyncDelete = createAsyncThunk("task/delete", async (id) => {
  await axios.delete(`${apiUrl}${id}`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  });
  return id;
});

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    editedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
    selectedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
  },
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload // タスク一覧の配列を取得
      }
    })
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload] // stateのタスク一覧に、作成したタスクを追加した配列を取得
      }
    });  
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      console.log(111);
      return {
        ...state,
        // 更新対象のtaskの場合は取得値（更新後の値）、それ以外は既存の値を表示
        tasks: state.tasks.map((t) => {
          console.log(t.id, action.payload.id);
          if (t.id === action.payload.id) {
            return action.payload;
          } else {
            return t;
          }
        }) 
      }
    });  
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.id === action.payload.id),
        selectedTask: {id:0, title:"", created_at:"", updated_at:""} 
      }
    });  
  }
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state) => state.task.selectedTask;
export const selectEditedTask = (state) => state.task.editedTask;
export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;