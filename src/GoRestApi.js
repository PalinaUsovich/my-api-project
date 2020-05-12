require ('dotenv').config(); //looing for env file 
const request = require ('request-promise');
const { HOST, PATH_PREFIX, BEARER_TOKEN} = process.env; //TOKEN issue


//const HOST = process.env.HOST; same thing without Distract
class GoRestApi { 
  constructor(){
   //const BEARER_TOKEN = 'a6K5_orw37Zx8xOLe1jl20wmYmBti4AIeazR';
   this.host = HOST;
   this.request = request.defaults({
   headers: {
       Accept:'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`, // Authorize with API
   },
   json: true,
  
   followAllRedirects: true, // This will automatically follow redirect, required for working with this API
});
}

 createNewUser(body) {
  const path = `/public-api/users`;

  return this.request.post({
    url: `${this.host}${path}`,
    body: body,
  });
}

updateUser(id,body) {
    const path = `${PATH_PREFIX}/users/${id}` ; 
    
    return this.request.put({
      url: `${this.host}${path}`,
      body:body,


    });
}
deleteUser(id) {
    const path = `${PATH_PREFIX}/users/${id}` ;
    
    return this.request.delete({
      url: `${this.host}${path}`,

    });
}

}


module.exports = GoRestApi;
