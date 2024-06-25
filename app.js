// 1? Fetch users data from https://randomuser.me/api/?results=500&seed=foo
 // ! Display female and male users count seperately
// ! Display all the users older than 40
 // ! Display all the users from Germany
 // ! Display the index position of the first user from Germany
 // ! Find the first user whoose age is 28
 // ! Generate a new user list from response:
 // ! Develop a bootstrap card and display first 20 users whose credit is greater than 50
// ! Add 3 buttons to filter users as all, female and male
let userList = [];//we need this array to creat a a new user list from response
let  filteredUserList =[]; //we need that to render the 20 filterd user which 50 
//1- fetch the data 
const fetchData = async ()=>{
    const response =await fetch(` https://randomuser.me/api/?results=500&seed=foo`);
    const data =  await response.json();
    const users = data.results; // in api the users inside the result

     //2- ! Display female and male users count seperately
     const femaleUsers =users.filter(user=> user.gender ==="female").length; //filter,  return array just female and length  return the count of this array
     const maleUsers =users.filter(user=> user.gender ==="male").length; 
     //console.log(femaleUsers);
     // console.log(maleUsers);
        //another way to solve it with reduce
        /* const femaleUsers= users.reduce((acc,user)=>{
            if(user.gender==="female") acc++ ;
            return acc ;
        },0);
        const maleUsers = users.reduce((acc,user)=>{
            if(user.gender==="male") acc++ ;
            return acc ;
        },0) */
            //console.log(femaleUsers);
            // console.log(maleUsers);
     //3- ! Display all the users older than 40
      const usersOlderThan40 = users.filter(user=>user.dob.age > 40);
            //console.log(usersOlderThan40);

     //4- ! Display all the users from Germany
     const germans = users.filter(user=>user.location.country==="Germany");
           // console.log(germans)

     // 5-! Display the index position of the first user from Germany 
     const firtsGermanUserIndex = users.findIndex(user=>user.location.country==="Germany"); //findIndex ,or search return the first index 
           //console.log(firtsGermanUserIndex); //4
    
    // 6-! Find the first user whoose age is 28      
    const firstUserAge28 = users.find(user=>user.dob.age === 28);// find return the first item
           // console.log(firstUserAge28);

     //7- ! Generate a new user list from response:   we change the property for the users but we have the same length 500 users for userlist
    userList =users.map(user=>({
             id: Math.floor(Math.random()*4000 + 1000), // to creat a random id between (1000-5000)
             gender: user.gender,
             fullName: `${user.name.first} ${user.name.last}`,
             city: user.location.city,
             country: user.location.country,
             email: user.email,
             username: user.login.username,
             password: user.login.password,
             age: user.dob.age,
             picture: user.picture.thumbnail,
             credit:( Math.random()*100) + 1 , // generate a random cridite
    }));
            // console.log(userList);
     
     //7- ! Develop a bootstrap card and display first 20 users whose credit is greater than 50
     filteredUserList = userList.filter(user => user.credit > 50).slice(0, 20); // first we have just item>50  in the array than we take just first 20
        //to display  part
        const userCardsContainer =document.getElementById("user-cards");
        userCardsContainer.innerHTML="";
        // each user shoud have some html logic
        filteredUserList.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = `col-md-3 mb-4`;    // bootstrap col-md-3  grid 
            userCard.innerHTML =`
                            <div class ="card">
                            <img src="${user.picture}" class="card-img-top" alt="${user.fullName}">
                            <div class="card-body">
                            <h5 class="card-title">${user.fullName}</h5>
                            <p class="card-text">Age: ${user.age}</p>
                            <p class="card-text">City: ${user.city}, Country: ${user.country}</p>
                            <p class="card-text">Email: ${user.email}</p>
                            <p class="card-text">Username: ${user.username}</p>
                            <p class="card-text">Credit: ${user.credit}</p>
                            </div>
                            </div>
                            `;
                            userCardsContainer.appendChild(userCard);
        });

    }
    fetchData();


   //8- ! Add 3 buttons to filter users as all, female and male 
       // we access the buttoms
       const allBtn = document.getElementById('filter-all');
       const maleBtn = document.getElementById('filter-male');
       const femaleBtn = document.getElementById('filter-female');

       maleBtn.addEventListener('click', () => {
        // we need to render just the male of filteruserlist
        filteredUserList = userList
        .filter(user => user.gender === 'male')
        .filter(user => user.credit > 50)
        .slice(0, 20);
        // render part
        const userCardsContainer = document.getElementById('user-cards');
        userCardsContainer.innerHTML = '';
        filteredUserList.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'col-md-3 mb-4';
          userCard.innerHTML = `
          <div class ="card">
          <img src="${user.picture}" class="card-img-top" alt="${user.fullName}">
          <div class="card-body">
          <h5 class="card-title">${user.fullName}</h5>
          <p class="card-text">Age: ${user.age}</p>
          <p class="card-text">City: ${user.city}, Country: ${user.country}</p>
          <p class="card-text">Email: ${user.email}</p>
          <p class="card-text">Username: ${user.username}</p>
          <p class="card-text">Credit: ${user.credit}</p>
          </div>
          </div>
          `;
          userCardsContainer.appendChild(userCard);
        });
       })

  // female btn
       femaleBtn.addEventListener('click', () => {
        filteredUserList = userList
          .filter(user => user.gender === 'female')
          .filter(user => user.credit > 50)
          .slice(0, 20);
        const userCardsContainer = document.getElementById('user-cards');
        userCardsContainer.innerHTML = '';
        filteredUserList.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'col-md-3 mb-4';
          userCard.innerHTML = `
          <div class ="card">
          <img src="${user.picture}" class="card-img-top" alt="${user.fullName}">
          <div class="card-body">
          <h5 class="card-title">${user.fullName}</h5>
          <p class="card-text">Age: ${user.age}</p>
          <p class="card-text">City: ${user.city}, Country: ${user.country}</p>
          <p class="card-text">Email: ${user.email}</p>
          <p class="card-text">Username: ${user.username}</p>
          <p class="card-text">Credit: ${user.credit}</p>
          </div>
          </div>
          `;
          userCardsContainer.appendChild(userCard);
        });
      });

      //all btn
      allBtn.addEventListener('click', () => {
        filteredUserList = userList.filter(user => user.credit > 50).slice(0, 20);
        const userCardsContainer = document.getElementById('user-cards');
        userCardsContainer.innerHTML = '';
        filteredUserList.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'col-md-3 mb-4';
          userCard.innerHTML = `
          <div class ="card">
          <img src="${user.picture}" class="card-img-top" alt="${user.fullName}">
          <div class="card-body">
          <h5 class="card-title">${user.fullName}</h5>
          <p class="card-text">Age: ${user.age}</p>
          <p class="card-text">City: ${user.city}, Country: ${user.country}</p>
          <p class="card-text">Email: ${user.email}</p>
          <p class="card-text">Username: ${user.username}</p>
          <p class="card-text">Credit: ${user.credit}</p>
          </div>
          </div>
          `;
          userCardsContainer.appendChild(userCard);
        });
      });