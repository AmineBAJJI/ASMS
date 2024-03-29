import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../data/data';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { modulesData } from '../data/coursesData';
import { elementData } from '../data/coursesData';


import api from '../api/students';


export default function UsersFiled() {
    const [sessions, setSessions] = useState([]);
    const [data, setData] = useState([]);
    const [filterInfo, setFilterInfo] = useState({
        module: '',
        element: '',
        filiere: '',
       
    });
    // return true if all filter inputs were selected
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


    const handleValidate = () => {
        window.location.reload(); // Reload the page
    }
    useEffect(() => {
        const studentsData = async () => {
            try {

                const endpoint = `/students/class/${filterInfo.filiere}/element/${filterInfo.element}`;

                const res = await api.get(endpoint);
                
                setData(res.data)
                console.log(res.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
       

        if (areFiltersComplete()) {
            studentsData();
           
        }
    }, [filterInfo]);
    

   

    return (

        <div className='w-[82%]'>
            <div className='w-[75%] mx-auto mt-8'>
                <div className=' px-10 pt-8 mt-4 grid grid-cols-2  gap-6'>


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
                            <option>GINF3</option>
                        </select>
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
                                       <th>nbr d'absences ( justifiée)</th>
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
                                            <td>{row.element_absences}({row.element_justified})</td>
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
