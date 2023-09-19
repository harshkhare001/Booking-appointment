var form = document.getElementById('my-form');

form.addEventListener('submit',getValues);

function getValues(e){
	e.preventDefault();

	var name1 = document.getElementById('name').value;
	var email1 = document.getElementById('email').value;
	var phone  = document.getElementById('phone').value;
	//localStorage.setItem('name',name);
	// localStorage.setItem('email',email);
	var itemList = document.getElementById('list');

	var li = document.createElement('li');
	li.className='item';
	var editButton =  document.createElement('button');
	var delbutton  = document.createElement('button');
	editButton.className='float-right edit mr-3';
	delbutton.className= 'float-right delete';
	delbutton.appendChild(document.createTextNode('delete'));
	editButton.appendChild(document.createTextNode('edit'));
	li.appendChild(document.createTextNode(`${name1}:${email1}:${phone}`));
	//console.log(li.textContent);
	li.appendChild(delbutton);
	li.appendChild(editButton)
	itemList.appendChild(li);
	document.getElementById('name').value='';
	document.getElementById('email').value='';
	document.getElementById('phone').value='';
	let myObj = {
		name1,
		email1,
	    phone
	};
	//console.log(myObj);
	let myObjStringify = JSON.stringify(myObj);

    axios.post("https://crudcrud.com/api/846860f27c384e9ead944223581c6784/appointmentData",myObj)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
	//localStorage.setItem(email1,myObjStringify);

}
var itemList = document.getElementById('list');
itemList.addEventListener('click',ModifyItem1);

function ModifyItem1(e){
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		var li = e.target.parentElement;
		var text = li.innerText;
		console.log(text);
		var individualText = text.split(':');
		var email=individualText[1];
		localStorage.removeItem(email);
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