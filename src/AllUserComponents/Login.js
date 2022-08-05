import { useEffect, useState, useSyncExternalStore } from "react";
import { Navigate } from "react-router-dom";
import axiosConfig from  './axiosConfig';
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errs,setErrs] = useState("");
    const handleLogin=(event)=>{
        event.preventDefault();
        const data={u_email:email,u_pass:password};
        // debugger;
        axiosConfig.post("login",data).
        then((succ)=>{
            var token=succ.data.token;
            localStorage.setItem("_authToken",token);
            // debugger;
            axiosConfig.get(`user/get/${email}`,data)
            .then((rsp)=>{
                //debugger;
                if(rsp.data.u_type==="COURIER"){
                    window.location.href="/courier/home";
                }
                else if (rsp.data.u_type=="CUSTOMER"){
                    window.location.href="/customer/home";
                }
            },(error)=>{
                debugger;
                setErrs(error.response.data);
            }
            )
        },(err)=>{
            console.log("error");
            debugger;
        }
        )
        
    }
    return(
        <div>
        <form onSubmit={handleLogin}>
            Email: <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" value={email}/> <br/><br/>
            <span>{errs.email? errs.email[0]:''}</span>
            Password: <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" value={password}/> <br/><br/>
            <span>{errs? errs.password[0]:''}</span>
            <input type="submit" value="Login"/>
        </form>
        </div>
    )
}

export default Login;