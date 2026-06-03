import { useState,useRef } from 'react'
import './AutoComplete.css'
import useOnMouseOutClick from './hooks/useOnMouseOutClick.tsx';
interface AutoCompleteProps<T>{
    listOfItems:T[];
    selectedItems:T[];
    getTag: (item: T) => string;
    createTag: (inputValue: string) => T;
    onChange:(value: T[]) => void;
}
function AutoComplete<T>({listOfItems,getTag,createTag,onChange,selectedItems,}:AutoCompleteProps<T>){
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [inputValue,setInputValue] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);

    const selectableItems = listOfItems.filter((item) =>
        getTag(item).toLowerCase().includes(inputValue.toLowerCase())
    );

    useOnMouseOutClick(containerRef,()=>{
        if(isOpen){
            setIsOpen(false);
        }
    })
    function handleSelectItem(item:T){
        const isDuplicate =selectedItems.some((i)=>{
            return getTag(i)===getTag(item);
        })
        if(!isDuplicate){  
            onChange([...selectedItems,item])
            setSelectedIndex(-1);
        }
    }
    function handleDeleteSelectedItem(itemToDelete:T){
        if(selectedItems.includes(itemToDelete)){  
            onChange(selectedItems.filter((item)=>item!==itemToDelete));
        }
    }
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setInputValue(e.target.value)
        setSelectedIndex(-1);
    }
    function handleKeyDown(e:React.KeyboardEvent){
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') {
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prevIndex) => 
                prevIndex === selectableItems.length - 1 ? 0 : prevIndex + 1
            );
        } 
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prevIndex) => 
                prevIndex <= 0 ? selectableItems.length - 1 : prevIndex - 1
            );
        } 
        else if (e.key === 'Enter') {
            e.preventDefault();
            const isDuplicate = selectedItems.some((item)=>{
                return getTag(item)===inputValue;
            })
            if (selectedIndex >= 0 && selectedIndex < selectableItems.length) {
                handleSelectItem(selectableItems[selectedIndex])
            }
            else if(inputValue&&!isDuplicate){ 
                onChange([...selectedItems,createTag(inputValue)]);
                setInputValue("");
            }
        }
       }
    return(
        <div className='container' ref={containerRef}>
            <div className='input-wrapper'>
                <div className='selected-items'>{selectedItems.map((item,index)=>{
                    return <div className='selected-item' key={index} >
                        {getTag(item)}
                        <button onClick={()=>handleDeleteSelectedItem(item)}>x</button>
                        </div>
                    })}
                    <input className='search-input' value={inputValue} type='text'onChange={(e)=>{handleInputChange(e)}} onKeyDown={handleKeyDown} onClick={()=>setIsOpen(true)} ></input>
                </div>
            </div>
            
            {isOpen&&<div className='selection-list'>
                {selectableItems.map((item,index)=>{
                    return<div className={`selection-list-item ${index === selectedIndex ? 'active' : ''}`} key={index} onClick={()=>handleSelectItem(item)}>
                        <div>{getTag(item)}</div>
                    </div> 
                })}
            </div>}
        </div>
    )   
}
export default AutoComplete