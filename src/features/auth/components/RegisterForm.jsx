import {useState} from "react";

import {registerUser}
from "../api/authApi";


function RegisterForm(){


const [form,setForm]=useState({

name:"",
email:"",
password:"",
phonenumber:""

});



const changeHandler=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};




const submit=async(e)=>{

e.preventDefault();


try{


const data =
await registerUser(form);


console.log(data);


alert("Registered");


}

catch(error){

console.log(error.response?.data);

}


};



return (

<form onSubmit={submit}>


<input
name="name"
placeholder="Name"
onChange={changeHandler}
/>


<input
name="email"
placeholder="Email"
onChange={changeHandler}
/>



<input

name="password"

type="password"

placeholder="Password"

onChange={changeHandler}

/>



<input

name="phonenumber"

placeholder="Phone"

onChange={changeHandler}

/>



<button>

Register

</button>


</form>


)


}


export default RegisterForm;