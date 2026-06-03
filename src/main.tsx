import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

//import App from './App'
//const tags=["react","html","css"];
// interface Adress {
//   id: string;
//   name: string;
// }
// const adresses: Adress[] = [
//   { id: "1", name: "React" },
//   { id: "2", name: "TypeScript" },
//   { id: "3", name: "CSS" },
// ];

// function App(){
//   const [selectedItems,setSelectedItems] = useState<Adress[]>(adresses);
//   useEffect(()=>{
//     console.log(selectedItems);
    
//   },[selectedItems])
//   return(
//     <>
//       <AutoComplete ListOfItems={adresses} setSelectedItems={setSelectedItems} selectedItems={selectedItems} getLabel={(item)=>item.name} createTag={(inputValue)=>{
//         return {
//           id:"4",
//           name:inputValue   
//         }
//       }}/>
//     </>
//   )
// }
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <App></App>
    
     {/* <AutoComplete ListOfItems={tags} getLabel={(item)=>item} createTag={(inputValue)=>inputValue}/> */}
  </StrictMode>,
)
