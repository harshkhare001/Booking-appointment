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
    axios.post("https://crudcrud.com/api/0e175eef7e044d61bbd9327343cc0dea/appointmentData",myObj)
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
    axios.get('https://crudcrud.com/api/0e175eef7e044d61bbd9327343cc0dea/appointmentData')
    .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showData(response.data[i]);
        }
    })
    .catch((err)=>console.log(err));
})

var itemList = document.getElementById('list');
itemList.addEventListener('click', ModifyItem1);

function ModifyItem1(e){
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		var li = e.target.parentElement;
		var text = li.innerText;
		console.log(text);
		var individualText = text.split(':');
		var name=individualText[0];
        var id;
		// localStorage.removeItem(email);
        axios.get('https://crudcrud.com/api/0e175eef7e044d61bbd9327343cc0dea/appointmentData')
        .then((response)=>{
            for(var i=0;i<response.data.length;i++){
                if(response.data[i].name === name){
                    id= response.data[i]._id;
                    console.log(id)

                }
                url = 'https://crudcrud.com/api/0e175eef7e044d61bbd9327343cc0dea/appointmentData/'
                const urlMain = url+id;
                console.log(urlMain);
                axios.delete(urlMain).then((res)=>console.log(res))
		    .catch((err)=>console.log(err));
            }
        }).catch((err)=>{
            console.log(err);
        })
       
        itemList.removeChild(li);
	}

	else if(e.target.classList.contains('edit')){
		var li = e.target.parentElement;
		var text = li.innerText;
		var individualText = text.split(":");
		var email = individualText[1];
		console.log(email);
		var myObj1 = localStorage.getItem(email);
		console.log(myObj1);
		localStorage.removeItem(email);
		myObj1DeStringfy = JSON.parse(myObj1);
		console.log(myObj1DeStringfy);
		document.getElementById('name').value=myObj1DeStringfy.name;
		document.getElementById('email').value=myObj1DeStringfy.email;
		document.getElementById('phone').value=myObj1DeStringfy.phone;
		itemList.removeChild(li);
	}
}
