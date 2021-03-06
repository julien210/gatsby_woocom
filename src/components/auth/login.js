import { navigate } from 'gatsby';
import React ,{useEffect, useState} from 'react'
import { useForm } from "react-hook-form";

   
const Login = (props) =>{
const [itoken, setToken] = useState([])    
const [loggedIn , setLoggedIn ] = useState(false)


const Goto_Posts = ()=>{
   navigate('/posts')
}

const onSubmit =  (data) => {
   async  function fetchData  () {
      const  result = await fetch('https://portaildemo69.000webhostapp.com/wp-json/jwt-auth/v1/token', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: data.username, password: data.password})
            })
      .then(res =>  res.json())
      .then( data=>{ setToken(data)})
      return result
   }
   fetchData()
}


const { register, handleSubmit, watch, errors } = useForm();

 
     return (
         <>
            { itoken.token !== undefined  && (
               localStorage.setItem('userToken', itoken.token),
               localStorage.setItem('userEmail', itoken.user_email),
               localStorage.setItem('userNicename', itoken.user_nicename),
               Goto_Posts()
            )
            }
            {console.log(itoken)}
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="username" defaultValue="admin" ref={register} />
            <input name="password" ref={register({ required: true })} />
            {errors.password && <span>This field is required</span>}
            <input type="submit" />
         </form>
        
      </>
      );
 //  }
}

export default Login
