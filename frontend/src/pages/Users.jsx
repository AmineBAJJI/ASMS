import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { modulesData } from '../data/coursesData';
import { elementData } from '../data/coursesData';
import {toast} from 'react-toastify'

import api from '../api/students';


export default function Users() {
    const [sessions, setSessions] = useState([]);
    const [absList,setabsList] = useState([])
    const [data, setData] = useState([]);
    const [filterInfo, setFilterInfo] = useState({
        module: '',
        element: '',
        filiere: '',
        date: ''
    });
   
    const areFiltersComplete = () => {
        return Object.values(filterInfo).every(value => value !== '');
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCheckboxChange = (student_id, session_id, checked) => {
        if (checked) {
            const date = filterInfo.date
            setabsList(prevAbsList => [...prevAbsList, { student_id, session_id, date }]);
        } else {
            
            setabsList(prevAbsList => prevAbsList.filter(item => !(item.studentId === student_id && item.sessionId === session_id)));
        }
    };


    const handleValidate = async () => {
        try {
            const res = await api.post('/absences/add',absList);
            toast.success("L'opération a été réalisée avec succès");
            console.log('this is the res' , res);
        } catch (error) {
            console.error(error);
        }
        
    }
    useEffect(() => {
        const studentsData = async () => {
            try {

                const endpoint = `/students/class/${filterInfo.filiere}`;

                const res = await api.get(endpoint);
                
                setData(res.data)
                console.log(res.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const sessionData = async () => {
            try {
                const response = await api.get(`/sessions/date/${filterInfo.date}`)
                setSessions(response.data);
                console.log('this the response',response.data);
            } catch (error) {
                console.error(error);
            }
        }

        if (areFiltersComplete()) {
            studentsData();
            sessionData();
        }
    }, [filterInfo]);
    

   

    return (

        <div className='w-[82%]'>
            <div className='w-[75%] mx-auto mt-8'>
                <div className=' px-10 pt-8 mt-4 grid grid-cols-2  gap-6'>

                    {console.log(absList)}
                    <div>
                        <select
                            id="module"
                            name="module"
                            value={filterInfo.module}
                            onChange={handleFilterChange}
                            className='select select-ghost w-full max-w-xs border-2 border-gray-300'
                        >
                            <option value="">Select Module</option>
                            {modulesData.map((module) => (
                                <option key={module.id} value={module.id}>
                                    {module.module}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>

                        <select
                            id="element"
                            name="element"
                            value={filterInfo.element}
                            onChange={handleFilterChange}
                            className='select select-ghost w-full max-w-xs border-2 border-gray-300'
                        >
                            <option value="">Select Element</option>
                            {elementData.map((element, index) => (
                                <option key={index} value={element}>
                                    {element}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            name="filiere"
                            value={filterInfo.filiere}
                            onChange={handleFilterChange}
                            className="select select-ghost w-full max-w-xs border-2 border-gray-300"
                        >
                            <option disabled value="">Veuillez choisir une filière</option>
                            <option>GINF1</option>
                            <option>GINF2</option>
                            <option>Ginf3</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="date"
                            name="date"
                            value={filterInfo.date}
                            onChange={handleFilterChange}
                            className='p-2 px-5 border-2 border-gray-300 rounded-lg  w-full max-w-xs'
                        />
                    </div>
                </div>
            </div>
            {console.log(filterInfo)}
            {data.length!=0 ?
                <div>
                    <div className=' w-full  flex items-center justify-center mx-auto mt-12 '>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>APOGEE</th>
                                        <th>NOM</th>
                                        <th>PRENOM</th>
                                        <th>GROUPE</th>
                                        {sessions.map(session=>(
                                            <th key={session._id}>{session.start_time} - {session.end_time}</th>
                                        ))}
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={row._id}>
                                            <th>{index + 1}</th>
                                            <th>{row.apogee}</th>
                                            <td>{row.last_name}</td>
                                            <td>{row.first_name}</td>
                                            <td>{row.class}</td>
                                            {sessions.map(session => (
                                                <td key={session._id}>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-accent [--chkfg:white]"
                                                        onChange={(e) => handleCheckboxChange(row._id, session._id, e.target.checked)}
                                                    />
                                                </td>
                                            ))}
                                            <td>
                                                <Link to={"/user/" + row._id+"/class/"+row.class+"/element/"+filterInfo.element}>
                                                    <button className='bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 mr-2 text-white font-semibold'>Afficher</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <button
                        className='bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 mr-2 text-white font-semibold ml-[190px] mt-6 w-1/4 mb-10'
                        onClick={handleValidate}
                    >Valider</button>
                </div>
                :
                <div role="alert" className="alert alert-warning w-fit mx-auto mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Veuillez sélectionner tous les filtres !</span>
                </div>
            }

        </div>

    )
}
