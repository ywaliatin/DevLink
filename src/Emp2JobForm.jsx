import React, { useState } from 'react';
import { db, storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


function Emp2JobForm(){
    console.log('Emp2JobForm Mounted');
        const [details, setDetails] = useState({
          title: "",
          email: "",
          description: "",
          skills: "",
          projectLength: "",
          paymentMin: "",
          paymentMax: "",
          workingHours: "",
          experienceIn: "",
          forAtLeast: ""
          
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
                const { title, email, description, skills, projectLength, paymentMin, paymentMax, workingHours, experienceIn, forAtLeast } = details;
        
                const res = await fetch("https://devlinksit313-default-rtdb.firebaseio.com/freelancejobs.json", {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        title,
                        email,
                        description,
                        skills,
                        projectLength,
                        paymentMin,
                        paymentMax,
                        workingHours, 
                        experienceIn,
                        forAtLeast,
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

        const style = {
            segment: { padding: '20px', marginLeft: '20px', backgroundColor: '#f9f9f9' },
            label: { display: 'block',  marginBottom: '5px', fontWeight: 'bold' },
            input: { width: '100%', padding: '10px',  marginLeft: '220px', marginBottom: '-10px', boxSizing: 'border-box' },
            textarea: { width: '600px', padding: '10px', marginBottom: '-10px', boxSizing: 'border-box', minHeight: '100px', resize:'vertical' },
            button: { backgroundColor: '#888', color: '#fff', padding: '10px 20px', cursor: 'pointer' },
            header: { marginBottom: '20px' },
            desc: { margin: '20px 0' },
            message: { color: 'red', marginTop: '20px' }
        };
    

        return (
            <div style={style.segment} className="job-description-section">
            <h4 style={style.header} className='desc'>Describe your job</h4>
            
             {/* Scrollable Container */}
            <div style={{maxHeight: '500px', overflowY: 'auto'}}></div>
            <div style={style.input}>
                <label style={style.label}>Your Name & Job Title</label>
                <input type='text' placeholder='Type Your Name & Job Title' 
                       onChange={(e) => setDetails({...details, title:e.target.value})} />
            </div>

            <div style={style.input}>
                <label style={style.label}>Contact Email</label>
                <input type='text' placeholder='Type Your Email'
                       onChange={(e) => setDetails({...details, email:e.target.value})} />
            </div>

            <div style={style.input}></div>
            <label style={style.label}>Job Description</label>
            <textarea 
            style={style.textarea} 
            type='text' 
            placeholder='Job Description'
            onChange={(e) => setDetails({...details, description:e.target.value})} 
            />

            <div style={style.input}></div>
            <label style={style.label}>Skills</label>
            <textarea 
            style={style.textarea} 
            type='text' 
            placeholder='e.g. HTML, React.js'
            onChange={(e) => setDetails({...details, skills:e.target.value})} 
            />
                
            
                
                
              
        
                <h4 className='desc'>Project Conditions</h4>
                <div style={style.input}>
                <label style={style.label}>Project Length</label>
                <input type='text' placeholder='e.g. 1 month'
                       onChange={(e) => setDetails({...details, projectLengthn:e.target.value})} />
            </div>

            <div style={style.input}>
                <label style={style.label}>Min Payment</label>
                <input type='text' placeholder='e.g. $100'
                       onChange={(e) => setDetails({...details, paymentMin:e.target.value})} />
            </div>
                
            <div style={style.input}>
                <label style={style.label}>Max Payment</label>
                <input type='text' placeholder='Max payment'
                       onChange={(e) => setDetails({...details, paymentMax:e.target.value})} />
            </div>
        
            <div style={style.input}>
                <label style={style.label}>Working Hours</label>
                <input type='text' placeholder='Working hours *optional'
                       onChange={(e) => setDetails({...details, workingHours:e.target.value})} />
            </div>
        
                

                <h4 style={style.desc}>Experience</h4>
            <p>This section is designed based on the type of the job.
                <span> It could be developed by conditional referencing</span>
            </p>

                

                
        
                <div style={style.input}>
                <label style={style.label}>Experience in</label>
                <input type='text' placeholder='e.g. building websites using React.js'
                       onChange={(e) => setDetails({...details, experienceIn:e.target.value})} />
            </div>
        
               <div style={style.input}>
                <label style={style.label}>For at least</label>
                <input type='text' placeholder='e.g. 2 years '
                       onChange={(e) => setDetails({...details, forAtLeast:e.target.value})} />
            </div>

            <div style={style.input}>
                <label style={style.label}>Profile Imaget</label>
                <input type="file" onChange={handleProfileImageChange} />
            </div>

            
                
            
                <button className="grey-button" onClick={PostData}>Submit</button>
                <p>{message}</p> {/* Display feedback message below the form */}
            </div>
        )
        
}


export default Emp2JobForm;
