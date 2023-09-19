var form = document.getElementById('my-form');

form.addEventListener('submit',getValues);

function getValues(e){
	e.preventDefault();
	var name1 = document.getElementById('name').value;
	var email1 = document.getElementById('email').value;
	var phone  = document.getElementById('phone').value;
    let myObj = {
		name: name1,
		email: email1,
	    phone: phone
	};
    showData(myObj);
    axios.post("https://crudcrud.com/api/846860f27c384e9ead944223581c6784/appointmentData",myObj)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
}

function showData(obj){
    var itemList = document.getElementById('list');
    var li = document.createElement('li');
	li.className='item';
	var editButton =  document.createElement('button');
	var delbutton  = document.createElement('button');
	editButton.className='float-right edit mr-3';
	delbutton.className= 'float-right delete';
	delbutton.appendChild(document.createTextNode('delete'));
	editButton.appendChild(document.createTextNode('edit'));
	li.appendChild(document.createTextNode(`${obj.name}:${obj.email}:${obj.phone}`));
    li.appendChild(delbutton);
	li.appendChild(editButton)
	itemList.appendChild(li);
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/846860f27c384e9ead944223581c6784/appointmentData')
    .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showData(response.data[i]);
        }
    })
    .catch((err)=>console.log(err));
})
