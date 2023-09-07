// //import React from 'react'

// import { Button, Checkbox, FormControl, IconButton, Input, InputLabel, List, ListItem, ListItemText } from '@mui/material'
// import { useEffect, useState } from "react"
// // import { firestoreDB } from '../App'
// import { collection, deleteDoc, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
// import { firestoreDB } from '../config/config'
// import { readTaskAmount } from '../functions'
// import DeleteIcon from '@mui/icons-material/Delete'

// const TaskList = () => {
//   const [todos, setTodos] = useState([''])
//   const [input, setInput] = useState('')
//   const [checked, setChecked] = useState('')


//   useEffect(() => {
//     const q = query(collection(firestoreDB, 'todos'))
//     const unSub = onSnapshot(q, (querySnapshot) => {
//       let todosArr: any = []
//       querySnapshot.forEach((doc) => {
//         todosArr.push({ ...doc.data(), id: doc.id })
//       })
//       setTodos(todosArr)
//     })
//     return () => unSub()
//   }, [])



//   const addTodo = (event: any) => {
//     event.preventDefault()
//     setTodos([...todos, input])


//     let preindex = +readTaskAmount() + 1
//     let index = preindex.toString()
//     sessionStorage.setItem("taskAmount", index)

//     setDoc(doc(firestoreDB, "todos", index), {
//       text: input
//     })
//     setInput('')
//   }

//   const deleteTodo = (event: any) => {
//     event.preventDefault()
//     console.log("deleted")
//     //deleteDoc(doc(firestoreDB, "todos", id))
//   }


//   return (
//     <div className="flex flex-col max-w-[1240px] mx-auto px-8 mt-4">

//       {/* mx:auto text-center justify-center */}
//       <div className='bg-white bg-opacity-60 p-4 mx:auto text-center justify-center'>
//         <div className='text-[#7926ff] font-bold md:text-3xl mb-4'>TASK LIST</div>
//         <form>
//           <FormControl>
//             <InputLabel size='normal'>Write a todo</InputLabel>
//             <Input value={input} onChange={event => setInput(event.target.value)}></Input>
//           </FormControl>
//           <Button variant="contained" type='submit' onClick={addTodo} disabled={!input}>Add todo</Button>
//         </form>



//         <ul className='text-black'>
//           {todos.map(todo => (
//             <List>
//               <ListItem secondaryAction={
//                 <IconButton edge="end" aria-label="delete" disabled={!checked}>
//                   <DeleteIcon onClick={deleteTodo} />
//                 </IconButton>
//               }>
//                 <ListItemText primary={todo.text} secondary="difficulty?" />
//                 <Checkbox onChange={event => setChecked(event.target.value)}></Checkbox>
//               </ListItem>
//             </List>
//           ))}
//         </ul>

//       </div>




//       <div className="h-screen"></div>
//     </div>

//   )
// }

// export default TaskList