const { expect } = require('chai');
const GoRestApi = require('../src/GoRestApi');
const randomString = require('../utility/random-string');

describe ('GoRest tests', () => {
    let goRestApi;


before (async () => {
    goRestApi = new GoRestApi();

});
it.only('Can create new user', async () => {
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


it.skip ('Can update user',async () =>{
    let email = `${randomString()}@example.com`;
    const expectedObject = {"first_name":"Brian","last_name":"Ratke","email":email,"status":"active"};
    const createdUser = await goRestApi.createNewUser(expectedObject);
    console.log('Created user:', createdUser);
    //create an updated user information 
    const updatedUser = {"first_name":"Palina","last_name":"Usovich","email":email,"status":"married"};

    const updatedInfo = await goRestApi.updateUser(createdUser.id, updatedUser);
    console.log('Updated user:', updatedInfo);

    expect (updatedInfo).to.have.property(
        'first_name',
        updatedInfo.first_name);
    expect (updatedInfo).to.have.property(
        'last_name',
        updatedInfo.last_name);
    expect (updatedInfo).to.have.property(
        'status',
        updatedInfo.status);

});


it.skip ('Can delete user',async ()=>{
    const newCreatedUser = {"first_name":"Palina","last_name":"Usovich","email":"lew19@roberts.com","status":"married"};
    const createdUser = await goRestApi.createNewUser(newCreatedUser);
    console.log('Just created user:',createdUser.id);
    const deletingUser = await goRestApi.deleteUser(createdUser.id);
});

});
