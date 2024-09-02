export const RefreshToken=async()=>{

  const baseUrl= import.meta.env.VITE_BASEURL;
  try{
    const response=await fetch(baseUrl+'api/user/refreshauth',{
      method:'POST',
      credentials:'include',
    });
    return response
  }
  catch(err) {
    console.log('error refreshing token',err);
  }
  
}

