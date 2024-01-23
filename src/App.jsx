import { useState, useEffect } from 'react';
import './App.css'
import grocerycartimg from "./assets/grocery-cart.png";

function App() {
    const [inputValue,setinputValue] = useState("");
    const [groceryItems,setgroceryItems] = useState([]);
    const [isCompleted,setisCompleted] = useState(false);

    useEffect(()=>{
        determineCompletedStatus()
        },
        [groceryItems]
    );

    const handleChangeInputValue = (e) => {
        //console.log(e.target.value);
        setinputValue(e.target.value);
    }
    /*
    const determineCompletedStatus = ()=>{
        listGroceryItems = [...groceryItems].filter(item => item.completed===false)
        if (listGroceryItems===-1){
            setisCompleted(true)
        }
    }
    */
   const determineCompletedStatus=()=>{
    if(!groceryItems.length){
        return setisCompleted(false)
    }
    let isAllCompleted=true;
    groceryItems.forEach((item)=>{
        if(!item.completed) {
            isAllCompleted=false;
        }
    })
    setisCompleted(isAllCompleted);
   }

    const handleAddGroceryItem = (e)=>{
        //setgroceryItems(groceryItems+inputValue);
        if (e.key==="Enter" && inputValue){
            /*setgroceryItems([...groceryItems,
                {
                    name: inputValue,
                    quantity: 1,
                    completed: false
                }]);*/
            const updatedGroceryList=[...groceryItems];
            const itemIndex = updatedGroceryList.findIndex(item=>item.name===inputValue)
            if (itemIndex===-1){
                updatedGroceryList.push(
                    {
                        name: inputValue,
                        quantity: 1,
                        completed: false
                    }
                );
            }else{
                updatedGroceryList[itemIndex].quantity++;
            }
            setgroceryItems(updatedGroceryList);
            setinputValue("");

        }
   
    }

    const deleteGroceryItem = (name)=>{
        // const deletFromGGroceryList=[...groceryItems].filter(item => item.name !== name)
        // setgroceryItems(deletFromGGroceryList)
        setgroceryItems([...groceryItems].filter(item => item.name !== name))

    }

    const handleUpdateCompleteStatus = (status, index)=>{
        const updatedGroceryList=[...groceryItems];
        updatedGroceryList[index].completed=status;
        setgroceryItems(updatedGroceryList);

    }

    const renderGroceryList = () =>{
        return groceryItems.map((item, index) =>(
            <li key={item.name}>
                <div className='container'>
                    <input 
                        value={item.completed}
                        checked={item.completed}
                        type="checkbox" 
                        onChange={(e)=>{
                                handleUpdateCompleteStatus(e.target.checked,index)
                            }
                        }
                    />
                    <p>
                        {item.name} {" "}
                        {
                        item.quantity > 1 ?
                        <span>
                            x{item.quantity}
                        </span> 
                        : null
                        }
                    </p>
                </div>
                <div>
                    <button onClick={()=>deleteGroceryItem(item.name)} className='remove-button'>
                        X
                    </button>
                </div>
            </li>
        ))
    }

    

    return (
        <main className="App">
            <div>
                <div>
                    {isCompleted && <h4 className='success'>you're donne</h4>}
                    {/* {JSON.stringify(groceryItems)} */}
                    <div className='header'>
                        <h1>Shopping List</h1>
                        <img src={grocerycartimg} alt="grocerycartimg" />
                        <input 
                            type="text" 
                            placeholder='Add an Item' 
                            className='item-input' 
                            onChange={handleChangeInputValue}
                            onKeyDown={handleAddGroceryItem}
                            value={inputValue}
                        />
                    </div>
                </div>
                <ul>
                    {renderGroceryList()}
                </ul>
            </div>
        </main>
    )
}

export default App
