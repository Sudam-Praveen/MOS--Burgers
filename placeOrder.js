









//=============================================================================================================
let time = document.getElementById("current-time");
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000);


let today = new Date();
let current_date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
document.getElementById("current-date").innerHTML = current_date;
// ===========================================================================================================

// <li> <img src="img/Burgers/Classic Burger (Large).webp" style="width:50px;" /><span>Classic
//     Burger</span> <span class="text-danger">Rs.750.00</span></li>
let orderDetailsArray = [];
let orderItemCodeArray = [];

let orderIdArray = [];
let orderItemArray = [];
let orderPriceArray = [];
let orderArray = [];
let orderImgArray = [];
let orderItemQTYArray = [];
let i = 0;


function generateOrderID() {
    let i = orderDetailsArray.length
    const orderId = document.getElementById('orderId');
    let id = `ORD#${(i + 1).toString().padStart(5, '0')}`;
    orderId.innerText = id;
    document.getElementById("customerID").placeholder = id;

}


function orderBasket(itemCode, ItemName, itemPrice, itemImage) {

    //-----checking existing---------
    //console.log( orderItemCodeArray.indexOf(itemCode));


    if (orderItemCodeArray.indexOf(itemCode) > -1) {
        // console.log('yes its exist');
        const indexItemNumber = (orderItemCodeArray.indexOf(itemCode));
        orderItemQTYArray[indexItemNumber] = orderItemQTYArray[indexItemNumber] + 1;

        incrementItem(orderIdArray[indexItemNumber], 1);

    } else {

        // -after checking existing adding to arrays ------
        orderIdArray.push(i);
        orderItemCodeArray.push(itemCode);

        orderItemQTYArray.push(1);

        orderItemArray.push(ItemName);
        orderPriceArray.push(itemPrice);
        orderImgArray.push(itemImage);
        orderArray.push({
            itemCode: itemCode,
            ItemName: ItemName
        });

        const orderList = document.getElementById('orderList');
        //create li tag
        const orderItemParent = document.createElement('li');

        const orderItem = document.createElement('span');
        orderItem.className = 'd-flex justify-content-between align-items-start';



        const orderItemPriceSpan = document.createElement('span');
        orderItemPriceSpan.className = 'text-danger';


        //create a text node with item Name and itemprice
        const orderItemName = document.createTextNode(ItemName);
        const orderItemPrice = document.createTextNode(' Rs.' + itemPrice + '.00');



        //create delete button
        const deleteButton = document.createElement('button');
        const deleteButtontext = document.createTextNode('X');
        deleteButton.className = 'btn btn-danger rounded-pill';
        deleteButton.appendChild(deleteButtontext);
        deleteButton.setAttribute('onclick', 'deleteItem(' + i + ', this )');

        const orderItemLeftSpan = document.createElement('span');
        orderItemLeftSpan.className = 'd-flex justify-content-between align-items-left';





        //add price text node into span
        orderItemPriceSpan.appendChild(orderItemPrice);
        // image section
        const orderItemImgTag = document.createElement('img');
        orderItemImgTag.className = 'w-25 rounded border border-dark  ';
        orderItemImgTag.style.cssText = 'width: 50px; height: 60px;';
        //assign the src itemimage to img
        orderItemImgTag.src = itemImage;

        orderItemLeftSpan.appendChild(orderItemImgTag);
        //orderItemLeftSpan.appendChild(orderItemImgTag);
        orderItemLeftSpan.appendChild(orderItemName);
        orderItemLeftSpan.appendChild(orderItemPriceSpan);


        // //attach to burger text to the li tag
        // orderItem.appendChild(orderItemName);
        //attach the li tag to parent id=orderlist

        orderItem.appendChild(orderItemLeftSpan);


        // attach delete button to span tag
        orderItem.appendChild(deleteButton);
        //new created parent LI >> Span
        orderItemParent.appendChild(orderItem);

        //attach the li tag to child to parent 
        orderList.appendChild(orderItemParent);


        // + - Button Section
        const decrementButton = document.createElement('button');
        const incrementButton = document.createElement('button');
        const decrementButtonText = document.createTextNode('-');
        const incrementButtonText = document.createTextNode('+');
        decrementButton.setAttribute('onclick', 'incrementItem(' + i + ',-1 )');
        incrementButton.setAttribute('onclick', 'incrementItem(' + i + ',1)');

        const amountItemSpan = document.createElement('span');
        amountItemSpan.className = 'px-3 fw-bold item' + i;
        const amountItemText = document.createTextNode('1');

        decrementButton.className = 'btn-sm btn btn-danger rounded-pill px-3  ms-1 fw-bold';
        incrementButton.className = 'btn-sm btn btn-success rounded-pill px-3 fw-bold';

        decrementButton.appendChild(decrementButtonText);
        incrementButton.appendChild(incrementButtonText);
        amountItemSpan.appendChild(amountItemText);


        orderItemParent.appendChild(incrementButton);
        orderItemParent.appendChild(amountItemSpan);

        orderItemParent.appendChild(decrementButton);

        i++;

    }

    totalItems();
    costItems();


    enableCheckOutButton();
}
function orderDetails(orderID, itemCode, ItemName) {
    const amount = document.getElementById('amount').value;
    orderArray.forEach(element => {
        orderDetailsArray.push({
            orderID: orderID,
            itemCode: element.itemCode,
            ItemName: element.ItemName,
            Amount: amount
        });
    });


}

// //======Decremnet Items=====
// function decrementItem(){

// }
//======Incremnet Items=====
function incrementItem(orderId, val) {

    //---------increment and decrement action
    const ItemSpan = document.querySelector('.item' + orderId);
    ItemSpan.innerText = parseInt(ItemSpan.innerText) + val;

    const indexNum = orderIdArray.indexOf(orderId);
    orderItemQTYArray[indexNum] = parseInt(ItemSpan.innerText);
    console.log(orderItemQTYArray);
    totalItems();
    costItems();
    //-------------------------------------------

    if (ItemSpan.innerText == 0) {

        console.log(orderId);

        console.log(indexNum);
        //itemID
        orderItemCodeArray.splice(indexNum, 1);
        orderItemQTYArray.splice(indexNum, 1);
        orderIdArray.splice(indexNum, 1);
        orderItemArray.splice(indexNum, 1);
        orderPriceArray.splice(indexNum, 1);
        orderImgArray.splice(indexNum, 1);
        console.log(orderIdArray);
        totalItems();
        costItems();

        orderList.removeChild(ItemSpan.parentElement);


        if (orderPriceArray.length === 0) {
            document.getElementById('amount').value = 0.00;
        }
        enableCheckOutButton();
    }

}

function totalItems() {
    // document.getElementById('totalItems').innerText = orderItemArray.length;
    if (orderItemQTYArray.length) {
        document.getElementById('totalItems').innerText = orderItemQTYArray.reduce((total, num) => {
            return total + num;
        })
    } else {
        document.getElementById('totalItems').innerText = '0';
    }

}
function costItems() {
    if (orderPriceArray == 0) {
        return document.getElementById('totalcost').innerText = '0.00';
    } else {
        const totalTempArray = [];
        //mapping qty amd mulptiplr by amount
        //[2500,3200,4500]
        //[2,3,1] 
        orderItemQTYArray.map((quantity, index) => {
            totalTempArray.push(quantity * orderPriceArray[index])
        })

        document.getElementById('totalcost').innerText = totalTempArray.reduce(sumOfArray).toFixed(2);
        document.getElementById('amount').value = (totalTempArray.reduce(sumOfArray).toFixed(2));

        function sumOfArray(total, num) {
            return total + num;
        }



    }

}
// //=====================================================Click event===========
// // Assuming you have multiple elements with the class 'custom-cards'
// let customCardsElements = document.getElementsByClassName('custom-cards');

// // Loop through the collection and add the event listener to each element
// for (var i = 0; i < customCardsElements.length; i++) {
//     console.log(customCardsElements.length);
//     customCardsElements[i].addEventListener("click", function () {

//     });
// }
//==================Order Bascket Clear===========
function orderBasketClear() {
    let orderList = document.getElementById('orderList');
    document.getElementById('amount').value = 0.00;
    orderList.innerHTML = '';
    orderItemArray = [];
    orderPriceArray = [];
    orderArray = [];
    orderIdArray = [];
    orderImgArray = [];
    orderItemQTYArray = [];
    orderItemCodeArray = [];
    i = 0;
    totalItems();
    costItems();
    enableCheckOutButton();
}
//==================Delete item from Bascket ===========
function deleteItem(orderId, button) {
    console.log(orderId);
    const indexNum = orderIdArray.indexOf(orderId);
    console.log(indexNum);
    //itemID
    orderItemCodeArray.splice(indexNum, 1);
    orderItemQTYArray.splice(indexNum, 1);
    orderIdArray.splice(indexNum, 1);
    orderItemArray.splice(indexNum, 1);
    orderPriceArray.splice(indexNum, 1);
    orderImgArray.splice(indexNum, 1);
    console.log(orderIdArray);
    totalItems();
    costItems();

    orderList.removeChild(button.parentElement.parentElement);


    if (orderPriceArray.length === 0) {
        document.getElementById('amount').value = 0.00;
    }
    enableCheckOutButton();

}



//======================== Start calculator function=========

let calculatorScreenAmount = document.getElementById("calculatorScreenAmount");

function calculatorInsert(num) {

    if (calculatorScreenAmount.value == '' && num == '00') {
        calculatorScreenAmount.value = '';
    } else if (calculatorScreenAmount.value == 0 && num == '0') {
        calculatorScreenAmount.value = '';
    } else if (calculatorScreenAmount.value == '' && num == '.') {
        calculatorScreenAmount.value = '';
    } else if (calculatorScreenAmount.value.includes('.') === true && num == '.') {
        calculatorScreenAmount.value = calculatorScreenAmount.value;
    } else if (calculatorScreenAmount.value == '0') {
        calculatorScreenAmount.value = num;
    } else {
        (calculatorScreenAmount.value) += (num);

    }

    enableConfirmButton();

}
//reset button
function calculatorReset() {
    calculatorScreenAmount.value = '0';
    enableConfirmButton();
}
//extract butoon
function exactAmountButton() {

    calculatorScreenAmount.value = document.getElementById('amount').value;
    enableConfirmButton();
}
// doing enable confirmation button 
function enableConfirmButton() {

    let screenValue = parseFloat(calculatorScreenAmount.value);
    let amountValue = parseFloat(document.getElementById('amount').value);

    if (screenValue >= amountValue) {

        document.getElementById("confirmPaid").disabled = false;
    } else {
        document.getElementById("confirmPaid").disabled = true;
    }
}
// confirmation button
function confirmPaidButton() {

    const customerPaidAmount = document.getElementById("customer_paid_amount");
    const changeAmount = document.getElementById('change_amount');
    const amount = document.getElementById('amount').value;

    customerPaidAmount.value = parseFloat(calculatorScreenAmount.value).toFixed(2);
    changeAmount.value = parseFloat(customerPaidAmount.value - amount).toFixed(2);



    orderArray.forEach(element => {
        
        const orderIDElement = document.getElementById('orderId');
        const orderID = orderIDElement.innerText;
        
        
        
        // Find the existing order with the same orderID
        const existingOrder = orderDetailsArray.find(order => order.orderID === orderID);
        
        // If the order exists, add the item details to its items array
        if (existingOrder) {
            orderArray.forEach(element => {
                const itemCode = element.itemCode;
                const itemName = element.ItemName;
                existingOrder.items.push({ itemCode, itemName });
            });
            existingOrder.amount = amount; // Set the common amount for the order
        } else {
            // If the order doesn't exist, create a new order with the item details
            const newOrder = {
                orderID: orderID,
                items: orderArray.map(element => ({ itemCode: element.itemCode, itemName: element.ItemName })),
                amount: amount
            };
            orderDetailsArray.push(newOrder);
        }
        
       





    });

    console.log(orderDetailsArray);
    enableNextCustomerAndPrintButton();
    disableAllButtonAfterConfirm();
    showSuccessMsg();

}




// enable next customer and print button
function enableNextCustomerAndPrintButton() {
    document.getElementById("printReceiptButton").disabled = false;
    document.getElementById("customernextButton").disabled = false;

}
//disableAllButtonAfterConfirm----
function disableAllButtonAfterConfirm() {
    document.getElementById("pills-burgers-tab").disabled = true;
    document.getElementById("pills-submarines-tab").disabled = true;
    document.getElementById("pills-fries-tab").disabled = true;
    document.getElementById("pills-pasta-tab").disabled = true;
    document.getElementById("pills-chicken-tab").disabled = true;
    document.getElementById("pills-beverages-tab").disabled = true;
    document.getElementById("orderBasket-clear-button").disabled = true;
    document.getElementById("checkOutButton").disabled = true;
    document.getElementById("calculatorModal").disabled = true;
    document.getElementById("customer_paid_amount").disabled = true;


    const allButtons = document.getElementById("orderList").querySelectorAll('button');

    for (let i = 0; i < allButtons.length; i++) {

        allButtons[i].disabled = true;

    }


}


// yellow buttons action 
function denominationButton(bill) {
    let screenValue = parseFloat(calculatorScreenAmount.value);
    calculatorScreenAmount.value = screenValue + bill;
    enableConfirmButton();
}
// insert paid amount button 
function amountCal() {
    document.getElementById("exactAmountSpan").innerText = document.getElementById('amount').value;
    enableConfirmButton();
}
//======================== End calculator function=========





//============== enable checkout button==========
function enableCheckOutButton() {
    const checkOutButton = document.getElementById('checkOutButton');
    checkOutButton.disabled = true;

    if (orderIdArray.length > 0) {
        checkOutButton.disabled = false;
    }
    if (orderIdArray.length == 0) {
        //========returning from checkout to food tab=============
        const backToFoodTab = document.getElementById("pills-burgers-tab");
        const foodTab = new bootstrap.Tab(backToFoodTab);
        foodTab.show();
    }
}
// when click the checkout button connect with the checkout
function goToCheckoutTab() {
    const firstTabEl = document.getElementById("pills-checkout-tab");
    const firstTab = new bootstrap.Tab(firstTabEl);
    firstTab.show();
}
function goToNewCustomer() {
    const firstTabEl = document.getElementById("pills-burgers-tab");
    const firstTab = new bootstrap.Tab(firstTabEl);
    firstTab.show();
    orderBasketClear();
    generateOrderID();
    document.getElementById("calculatorModal").disabled = false;
    document.getElementById("pills-submarines-tab").disabled = false;
    document.getElementById("pills-fries-tab").disabled = false;
    document.getElementById("pills-pasta-tab").disabled = false;
    document.getElementById("pills-chicken-tab").disabled = false;
    document.getElementById("pills-beverages-tab").disabled = false;
    document.getElementById("orderBasket-clear-button").disabled = false;

    let customerPaidAmount = 'customer_paid_amount';
    let changeAmount = 'change';
    document.getElementById("customer_paid_amount").value = customerPaidAmount;
    document.getElementById("change_amount").value = changeAmount;

    calculatorScreenAmount.value = '0';
    enableConfirmButton();
} 

const toastLiveExample = document.getElementById('liveToast')
function showSuccessMsg() {
    const id = document.getElementById("orderId").innerText;
    
    const boldId = "<strong>" + id + "</strong>";
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    document.getElementById("toastmsg").innerHTML = "Order Number " + boldId + " placed successfully!";
    toastBootstrap.show();
  }
