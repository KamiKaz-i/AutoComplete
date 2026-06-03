import { useState } from 'react';
import AutoComplete from './AutoComplete';

interface Tag {
  tag: string;
}

const adresses: Tag[] = [
  {  tag: "React" },
  {  tag: "TypeScript" },
  {  tag: "CSS" },
];

function App(){
  const [selectedItems,setSelectedItems] = useState<Tag[]>([]);
  return(
    <>
      <AutoComplete listOfItems={adresses} onChange={(val)=>{setSelectedItems(val)}} selectedItems={selectedItems} getTag={(item)=>item.tag} createTag={(inputValue)=>{
        return {
          tag:inputValue,
        }
      }}/>
    </>
  )
}

export default App
