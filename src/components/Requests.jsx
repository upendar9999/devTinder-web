import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';

const Requests = () => {
      const requests = useSelector((store)=>store.requests);
      const dispatch = useDispatch();
      const reviewRequest = async (status,id)=>{
        try{
                const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + id,{},{
                    withCredentials:true
                });
                dispatch(removeRequest(_id));

        }catch(err){

        }
      }
    const fetchRequests = async ()=>{
        try{
             const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials:true});
             dispatch(addRequests(res?.data?.data));
        }catch(err){

        }
        
    }
    useEffect(()=>{
        fetchRequests();
    },[])
    if(!requests)return;

    if(requests.length === 0 ) return <div className='flex justify-center my-10'>No Requests Found</div>
  return (
    <div className='text-center my-5'>
      <h1 className='text-3xl text-bold'>Requests</h1>
          {
            requests.map((con)=>{
                  const {_id,firstName,lastName,photoUrl,age,gender,about} = con.fromUserId;
                
                return (
                    <div key={_id}
                    className="flex justify-between items-center m-10 p-10 rounded-lg bg-base-300 w-2/3 mx-auto">
                <div><img className="w-20 h-20 rounded-full" alt = "photo" src={photoUrl}/></div>
                <div className='mx-4 text-left'>
                <h2 className='font-bold text-xl'>{firstName + " "+lastName}</h2>
                {age && <p>{age+","+gender}</p>}
                <p>{about}</p>
                </div>
                <div>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",con._id)}>Reject</button>
                 <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",con._id)}>Accept</button>
                 </div>
                </div>
                );
                }
                )
          }
    </div>
  );
};

export default Requests;
