import { toast } from 'react-toastify';
import { useContext, useState } from 'react'
import axios from 'axios';
import { AdminContext } from '../Context/AdminContext';

const Login = () => {

 const [state, setState] = useState('Admin');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const {setAToken, backendUrl} = useContext(AdminContext);
 
 



 const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        if (state === 'Admin') {
            
           const {data} = await axios.post(`${backendUrl}/api/admin/login`, {email,password});
            if (data.success) {
                localStorage.setItem('aToken', data.token);
                setAToken(data.token);
            }else {
                toast.error(data.message);
            }
            
        }
        
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message);
    }
 }

 

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
        <div className='flex flex-col items-start gap-3 p-8 m-auto border sm:min-w-96 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='m-auto text-2xl font-semibold'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type="email"  required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type="password" required />
            </div>
            <button className='w-full py-2 text-base text-white rounded-md bg-primary '>Login</button>
            {
                state === 'Admin' 
                ? <p>Doctor Login? <span className='underline cursor-pointer text-primary' onClick={()=> setState('Doctor')}>Click Here!</span></p>
                : <p>Admin Login? <span className='underline cursor-pointer text-primary' onClick={()=> setState('Admin')}>Click Here!</span></p>
            }
        </div>
    </form>
  )
}

export default Login