import React, { useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { db, storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { push, set } from 'firebase/database';

function Free2JobForm(){
    
        const [details, setDetails] = useState({
          title: "",
          description: "",
          skills: "",
          projectLength: "",
          paymentMin: "",
          paymentMax: "",
          workingHours: "",
          email: ""
          
        });

        const [message, setMessage] = useState(''); // State for feedback message
    
        const handleProfileImageChange = (e) => {
            setDetails({...details, profileImage: e.target.files[0]});
        };

        const PostData = async (e) => {
            e.preventDefault();

            let profileImageUrl;
        
        // Upload profile image
        if(details.profileImage) {
            const storageRef = ref(storage, `profileImages/${details.profileImage.name}`);
            const profileUploadTask = uploadBytesResumable(storageRef, details.profileImage);


await profileUploadTask;

profileImageUrl = await getDownloadURL(storageRef);
       }
    
            try {
                const { title, description, skills, projectLength, paymentMin, paymentMax, workingHours, email } = details;
        
                const res = await fetch("https://devlinksit313-default-rtdb.firebaseio.com/jobs.json", {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        title,
                        description,
                        skills,
                        projectLength,
                        paymentMin,
                        paymentMax,
                        workingHours, 
                        email,
                        profileImageUrl
                    })
                });
    
                if (!res.ok) {
                    const errorData = await res.json();
                    console.error('Error posting data:', errorData);
                    setMessage('Error posting job. Please try again.');
                    throw new Error('Failed to post data');
                } else {
                    setMessage('Job posted successfully!');
                }
            } catch (error) {
                console.error(error);
                // If you want a custom error message, set it here. Otherwise, the error from the server will be shown.
                setMessage(error.message);
            }
        };

        

        return (
            <div className="job-description-section">
                <h4 className='desc'>Describe your job</h4>
        
                <div >
                <label>Your Name & Job Title</label>
                <input type='text' placeholder='Type Your Name & Job Title' onChange={(e)=>
                    setDetails({...details,title:e.target.value})} />
                </div>
                
                <div >
                <label>Job Description</label>
                <textarea type='text' placeholder='Job Description' onChange={(e)=>
                    setDetails({...details,description:e.target.value})}  />
                </div>
                
                <div >
                <label>Skills</label>
                <textarea type='text' placeholder='Skills' onChange={(e)=>
                    setDetails({...details,skills:e.target.value})} />
                </div>
              
        
                <h4 className='desc'>Project Conditions</h4>
                <div >
                <label>Project Length in Days</label>
                <input type='text' placeholder='Project Length' onChange={(e)=>
                    setDetails({...details,projectLength:e.target.value})} />
                </div>
                
                <div >
                <label>Min Payment</label>
                <input type='text' placeholder='Min Payment' onChange={(e)=>
                    setDetails({...details,paymentMin:e.target.value})} />
                </div>
        
               <div >
               <label>Max Payment</label>
                <input type='text' placeholder='Max Payment' onChange={(e)=>
                    setDetails({...details,paymentMax:e.target.value})} />
               </div>
        
                <div className="form-field">
                <label>Working Hours</label>
                <input type='text' placeholder='Working Hours' onChange={(e)=>
                    setDetails({...details,workingHours:e.target.value})} />
                </div>

                <div className="form-field">
                <label>Contact email</label>
                <input type='text' placeholder='Type Your Email' onChange={(e)=>
                    setDetails({...details,email:e.target.value})} />
                </div>
        
               

            <div className="form-field">
                <label>Profile Image</label>
                <input type="file" onChange={handleProfileImageChange} />
            </div>
                
        
                <button className="grey-button" onClick={PostData}>Submit</button>
                <p>{message}</p> {/* Display feedback message below the form */}
            </div>
        )
        
}


export default Free2JobForm;
