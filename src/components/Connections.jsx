import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
    const connections = useSelector((store)=>store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async ()=>{
        try{
        const res = await axios.get(BASE_URL + "/user/connections",{withCredentials:true});
        dispatch(addConnections(res?.data?.data));
    }
   catch(err){
    console.error(err);
   }
}
   useEffect(()=>{
    fetchConnections();
    },[]);

    if(!connections)return;

    if(connections.length === 0 ) return <div>No Connection Found</div>
  return (
    <div className='text-center my-5'>
      <h1 className='text-3xl text-bold'>Connections</h1>
          {
            connections.map((con)=>{
                  const {_id,firstName,lastName,photoUrl,age,gender,about} = con;
                
                return (
                    <div key={_id} className="m-10 p-10 rounded-lg bg-base-300 flex w-1/2 mx-auto">
                <div><img className="w-20 h-20 rounded-full" alt = "photo" src={photoUrl}/></div>
                <div className='mx-4 text-left'>
                <h2 className='font-bold text-xl'>{firstName + " "+lastName}</h2>
                {age && <p>{age+","+gender}</p>}
                <p>{about}</p>
                </div>
                </div>
                );
                }
                )
          }
    </div>
  );
};

export default Connections;
