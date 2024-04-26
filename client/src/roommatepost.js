// import React, { useState } from 'react';
// import axios from 'axios';

// function RoommatePost() {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         gender: '',
//         moveInDate: '',
//         priceRange: ''
//     });

//     const handleChange = e => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             axios.post('http://localhost:5000/roommates',formData);
//             alert('Roommate ad posted successfully!');
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 gender: '',
//                 moveInDate: '',
//                 priceRange: ''
//             });
//         } catch (err) {
//             console.error('Error posting roommate ad:', err);
//         }
//     };

//     return (
//         <div>
//             <h2>Post Roommate Ad</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
//                 <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
//                 <select name="gender" value={formData.gender} onChange={handleChange} required>
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                 </select>
//                 <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} required />
//                 <input type="number" name="priceRange" value={formData.priceRange} onChange={handleChange} placeholder="Price Range" required />
//                 <button type="submit">Post Ad</button>
//             </form>
//         </div>
//     );
// }

// export default RoommatePost;
