import {useState} from "react";

import {
loginUser
}
from "../api/authApi";


import useAuthStore
from "../store/authStore";



function LoginForm(){


const login =
useAuthStore(
state=>state.login
);



const [form,setForm]=useState({

email:"",
password:""

});



const submit=async(e)=>{

e.preventDefault();


try{


const data =
await loginUser(form);



login(data);



alert("Login success");


}

catch(error){

console.log(
error.response?.data
);

}


};



return (

<form onSubmit={submit}>


<input

name="email"

placeholder="Email"

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>



<input

name="password"

type="password"

placeholder="Password"

onChange={
e=>setForm({
...form,
password:e.target.value
})
}

/>



<button>
Login
</button>


</form>


)


}


export default LoginForm;