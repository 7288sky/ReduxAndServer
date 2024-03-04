import React, { useEffect, useState } from 'react'

import { updateRegisterData } from '../Redux/Register/registerSlice'

import { useDispatch, useSelector } from "react-redux";



function RegisterUser() {
    const dispatch = useDispatch();
    const data=useSelector((state)=>state.register)
    function handleInputChange(event) {
        const { name, value } = event.target;
        //[name]: value this is noticable------>>>>>
        dispatch(updateRegisterData({ [name]: value }));
    }

    return (
        <div>
            <input type="text" name="fullName" onChange={handleInputChange} placeholder='Enter your full name' />
            <input type="text" name="email" onChange={handleInputChange} placeholder='Enter your email' />
            <input type="password" name="password" onChange={handleInputChange} placeholder='Enter your password' />
            <input type="text" name="userName" onChange={handleInputChange} placeholder='Enter your userName' />
            <h1>{data.fullName} {data.email} {data.password} </h1>
        </div>
    );
}




// function RegisterUser() {
//     const dispatch = useDispatch();
// const [fullName,setfullName]=useState({fullName:''})
// const data=useSelector(state=>state.register)

//     return (
//         <div>
//         <input placeholder='Enter Your name' value={fullName.fullName}  ></input>
//             <button onClick={() => {
//                 dispatch(updateRegisterData({
//                     fullName: 'John Doe',
//                     email: 'john@example.com',
//                     password: 'password123'
//                 }));
               
//             }}>Submit</button>

//            <h1>{data.fullName}</h1>
//         </div>
//     )
// }

// function RegisterUser() {

//     const dispatch = useDispatch();

//    const[data,setData]=useState({})
//     // useEffect(() => {
//     //     const formData = useSelector((state) => state.register.fullName);
//     //     console.log(formData);
//     // }, [dispatch]);

// const update=function(data){
//     dispatch(updateRegisterData(data))
//     setData(useSelector(state=>state.register))
// }

//         const formData = useSelector((state) => state.register.fullName)
//     return (
//         <div>
//             <button onClick={()=>{
//                 update(      {
//             fullName: 'John Doe',
//             email: 'john@example.com',
//             password: 'password123'
//                 }
// )
//             }}>Submit</button>

//             <h1>{data.fullName}</h1>
//         </div>
//     )
// }

export default RegisterUser