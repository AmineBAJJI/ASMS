import React, { useState } from 'react';
import api from '../api/students';
import { toast } from 'react-toastify'


export default function CreateUser() {
    const labelStyle = 'text-gray-400 font-semibold mt-2';
    const inputStyle = 'mt-1 p-2  border-2 rounded-md w-[70%]';

    const [studentData, setStudentData] = useState({
        last_name: '',
        first_name: '',
        cne: '',
        apogee: '',
        class_name: 'GINF1',
        has_chronic_cisease: false,
        has_disability: false // Defaulting to 'GINF 1'
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const res = await api.post('/students', studentData);
            console.log('Student added:');
            toast.success("L'étudiant(e) a été ajouté avec succès.");

            setStudentData({
                last_name: '',
                first_name: '',
                cne: '',
                apogee: '',
                class_name: 'GINF1',
                has_chronic_cisease: false,
                has_disability: false
            });
        } catch (err) {
            console.error('Error adding student:', err);
            
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (

        <div className='p-8 w-[82%]'>
            <h1 className='text-3xl font-bold'>Ajouter un(e) étudiant(e)</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 mt-5'>
                <div>
                    {console.log(studentData)}
                    <label htmlFor="last_name" className='text-gray-400 font-semibold mt-2'>Nom</label><br />
                    <input
                        type="text"
                        value={studentData.last_name}
                        onChange={handleChange}
                        id="last_name"
                        name="last_name"
                        placeholder='Nom'
                        required
                        className='mt-1 p-2  border-2 rounded-md w-[70%]'
                    />
                </div>
                <div>
                    <label htmlFor="first_name" className={labelStyle}>Prénom</label><br />
                    <input
                        type="text"
                        value={studentData.first_name}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder='Prénom'
                        id="first_name"
                        name="first_name"
                        required
                    />
                </div>
                <div>
                    <label className={labelStyle} htmlFor="cne">CNE</label><br />
                    <input
                        type="text"
                        value={studentData.cne}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder='cne'
                        id="cne"
                        name="cne"
                        required
                    />
                </div>
                <div>
                    <label className={labelStyle} htmlFor="apogee">Code APOGEE</label><br />
                    <input
                        type="text"
                        value={studentData.apogee}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder='code apogee'
                        id="apogee"
                        name="apogee"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="className" className={labelStyle}>Filière</label><br />
                    <select
                        id="className"
                        name="className"
                        value={studentData.class_name}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                    >
                        <option value="GINF1">GINF 1</option>
                        <option value="GINF2">GINF 2</option>
                        <option value="GINF3">GINF 3</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="has_chronic_cisease" className={labelStyle}>A-t-il une maladie chronique ?</label><br />
                    <select
                        id="has_chronic_cisease"
                        name="has_chronic_cisease"
                        value={studentData.has_chronic_cisease}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                    >
                        <option value={false}>Non </option>
                        <option value={true}>Oui</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="has_disability" className={labelStyle}>A-t-il un handicap ?</label><br />
                    <select
                        id="has_disability"
                        name="has_disability"
                        value={studentData.has_disability}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                    >
                        <option value={false}>Non </option>
                        <option value={true}>Oui</option>
                    </select>
                </div>
                <div></div>
                <button type="submit" className='bg-blue-700 hover:bg-blue-800 w-[200px] text-white font-semibold mt-4 p-1 text-center rounded-md'>
                    Ajouter
                </button>
            </form>

        </div>
    );
}
