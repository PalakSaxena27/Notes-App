import React, {useState}  from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteslice';
import { useDispatch } from "react-redux";


const Home = () =>
{
    const [title, setTitle] = useState('');
    const [value,setValue] = useState('');
    const [searchParams, setearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch('');

    function createPaste() {
        const paste = {
            title: title,
            content : value,
            _id : pasteId || Date.now().toString(36),
            createdAt : new Date().toISOString(),
        }

        if(pasteId)
        {
                dispatch(updateToPastes(paste));
        }
        else{
                dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setearchParams({});

    }


    return (
        <div>
            <div>
                <input 
                className='p-2 rounded-2xl mt-2'
                type ='text'
                placeholder='enter title here'
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
                />
            <button onClick={createPaste}>
                {
                    pasteId ? "Update Paste" : "Create Paste"
                }
               
            </button>
            </div>
            <div>
                <textarea
                    className="textarea"
                    value={value}
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />




            </div>
        </div>

    )
}
export default Home;