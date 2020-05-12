const { expect } = require('chai');
const GoRestApi = require('../src/GoRestApi');
const randomString = require('../utility/random-string');

describe ('GoRest tests', () => {
    let goRestApi;


before (async () => {
    goRestApi = new GoRestApi();

});
it('Can create new user', async () => {
    let email = `${randomString()}@example.com`;
    const requestBody = {"first_name":"Brian","last_name":"Ratke","gender":"male","email":email,"status":"active"};
    const createUserResponse = await goRestApi.createNewUser(requestBody);

    console.log(createUserResponse);

    expect (createUserResponse.result).to.have.property(
        'gender',
             requestBody.gender);
        expect(createUserResponse.result).to.have.property(
        'first_name',
             requestBody.first_name);//todo what to check exactly from response
}); 


it ('Can update user',async () =>{
    let email = `${randomString()}@example.com`;
    const expectedObject = {"first_name":"Brian","last_name":"Ratke","email":email, "gender": 'male', "status":"active"};
    const response = await goRestApi.createNewUser(expectedObject);

    //console.log(response);

    //create an updated user information 
    const updatedUser = {"first_name":"Palina","last_name":"Usovich","email":email,"status":"active"};

    const updatedInfo = await goRestApi.updateUser(response.result.id, updatedUser);
    //console.log('Updated user:', updatedInfo);

    expect (updatedInfo._meta).to.have.property(
        'success',
        true);

    expect (updatedInfo.result).to.have.property(
        'first_name',
        updatedUser.first_name);
    expect (updatedInfo.result).to.have.property(
        'last_name',
        updatedUser.last_name);

});


it.only  ('Can delete user',async ()=>{
    let email = `${randomString()}@example.com`;
    const newCreatedUser = {"first_name":"Palina","last_name":"Usovich","email":email,"gender": 'female',"status":"active"};
    const createdUserResponse = await goRestApi.createNewUser(newCreatedUser);
    console.log('Just created user:',createdUserResponse);
    const userToDeleteByID = createdUserResponse.result.id;
    const deletingUserResponse= await goRestApi.deleteUser(userToDeleteByID);
    console.log(deletingUserResponse);
 });

});
