const form = document.getElementById('my-form');
const priceElement = document.getElementById('price');
const dishElement = document.getElementById('dish');
const tableElement = document.getElementById('table');

const ulTable1 = document.getElementById('table1');
const ulTable2 = document.getElementById('table2');
const ulTable3 = document.getElementById('table3');

const tableDiv = document.getElementById('tableOrder');

form.addEventListener('submit', storeOrder);
tableDiv.addEventListener('click', deleteOrder);

function getDataFromNetwork(){
    window.addEventListener("DOMContentLoaded",() => {
        axios.get("https://crudcrud.com/api/2db19c1936714b8aa64a194be9fd76e5/restaurantApp")
        .then(data => {
            for(let i=0; i<data.data.length; i++){
                showListinTable(data.data[i]);
            }
            console.log(data.data);
        }).catch(err => console.log(err));
    })
}

getDataFromNetwork();

// store the order
function storeOrder(e){
    e.preventDefault();
    console.log('save order');

    const price = priceElement.value;
    const dish = dishElement.value;
    const table = tableElement.value;

    const restObj = {
        price,
        dish,
        table
    }

    axios.post("https://crudcrud.com/api/2db19c1936714b8aa64a194be9fd76e5/restaurantApp",restObj)
    .then(data => {
        showListinTable(data.data);
        console.log(data);
    }).catch(err =>{
        document.body.innerHTML = document.body.innerHTML + "Something Went Wrong!!";
        console.log(err)
    });
    
    priceElement.value = '';
    dishElement.value = 'Pasta';
    tableElement.value = 'table1';

}

function showListinTable(Obj){
    let visibleText = `${Obj.price} - ${Obj.table} - ${Obj.dish}`;

    const orderList = document.createElement('li');
    const delBtn = document.createElement('button');

    delBtn.textContent = 'Delete Order';
    delBtn.style.border = '1px solid';
    delBtn.classList = 'btn';

    orderList.setAttribute('id',Obj._id);

    orderList.appendChild(document.createTextNode(visibleText));
    orderList.appendChild(delBtn);

    if(Obj.table === 'table1'){
        ulTable1.appendChild(orderList);
    } else if(Obj.table === 'table2'){
        ulTable2.appendChild(orderList);
    } else{
        ulTable3.appendChild(orderList);
    }

}

function deleteOrder(e){
    e.preventDefault();

    if(e.target.classList.contains('btn')){
        let listId = e.target.parentNode.id;
        let tableNo = e.target.parentNode.textContent.split('-')[1].trim();
       
        axios.delete(`https://crudcrud.com/api/2db19c1936714b8aa64a194be9fd76e5/restaurantApp/${listId}`)
        .then(mes =>{
            if(tableNo === 'table1'){
                ulTable1.removeChild(e.target.parentNode);
            }else if (tableNo === 'table2'){
                ulTable2.removeChild(e.target.parentNode);
            } else{
                ulTable3.removeChild(e.target.parentNode);
            }

        }).catch(err =>{
            document.body.innerHTML = document.body.innerHTML + "Something went wrong!! While deleting the order";
        })

    }
}