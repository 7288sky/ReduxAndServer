import RegisterUser from "./components/register"


import { useDispatch, useSelector } from "react-redux";

function App() {


const data=useSelector(state=>state.register);



const handleClick=async function(){
  
  const res = await fetch("http://localhost:8000/api/v1/users/register", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)// Data upper state bana rakhi hai waha se aa raha and same data server to post request se send kiya jaa raha hai
})  

console.log(await res.json());
console.log(data)

}


  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <RegisterUser/>
    <button onClick={handleClick}>Submit</button>
    </>
  )
}



export default App
