// import React, { useContext, useState } from 'react'
// import assets from '../assets/assets'
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';


// function ProfilePage() {

// const {authUser, updateProfile}= useContext(AuthContext)


// const [selectedImg, setselectedImg] = useState(null)
// const navigate = useNavigate();
// const [name,setName]= useState(authUser.fullName)
// const [bio, setBio] = useState(authUser.bio)

// const handleSubmit = async(e)=>{
//   e.preventDefault();
//   if(!selectedImg){
//     await updateProfile({fullName: name, bio});
//     navigate('/')
//     return;
//   }


//   const reader = new FileReader();
//   reader.readAsDataURL(selectedImg);
//   reader.onload = async ()=>{
// const base64Image = reader.result;
// await updateProfile({profilePic : base64Image, fullName: name, bio})
// navigate('/');
// return;
//   }
  
// }


//   return (
//     <div className='min-h-screen bg-cover bg-no-repeat flex items-center
//     justify-center'>
// <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
// border-gray-600 flex items-center justify-between max-sm:flex-col-reverse
// rounded-lg'>
//   <form  onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
//     <h3 className='text-lg '>Profile details</h3>
//     <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
//       <input onChange={(e)=>setselectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpeg, .jpg' hidden/>
//       <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon  } alt="" 
//       className={`w-12 h-12 ${selectedImg && `rounded-full`}`} />
//       Upload profile image
//     </label>
//     <input onChange={(e)=>setName(e.target.value)} value={name}
//      type="text" required placeholder='Your name' className='p-2 border
//     border-gray-500 rounded-md focus:outline-none focus:ring-2
//     focus:ring-violet-500'/>
//     <textarea onChange={(e)=>setBio(e.target.value)} value={bio}placeholder='Write profile bio ' required  className='p-2 border
//     border-gray-500 rounded-md focus:outline-none focus:ring-2
//     focus:ring-violet-500'> </textarea>

// <button type='submit' className='bg-gradient-to-r from-purple-400
// to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>save</button>
   
//   </form>
//   <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10  ${selectedImg && 'rounded-full'}`}
//    src={authUser?.profilePic || assets.logo_icon} alt="" />
// </div>
//     </div>
//   )
// }


// export default ProfilePage



import React, { useContext, useState, useEffect } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function ProfilePage() {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null); //  For image preview

  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const navigate = useNavigate();

  // Set initial name and bio once authUser is available
  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || '');
      setBio(authUser.bio || '');
      setPreviewImg(authUser.profilePic || null); // 👈 show current profile picture if available

    }
  }, [authUser]);

   // ⬇️ Clean up blob URL when previewImg changes or component unmounts
   useEffect(() => {
    return () => {
      if (previewImg?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImg);
      }
    };
  }, [previewImg]);

    // ⬇ Handle image input and set preview URL
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return; 

  //  File size check: prevent upload if file > 5MB
  if (file.size > 5 * 1024 * 1024) {
    toast.error("File too large. Max 5MB allowed.");
    return;
  }

        setSelectedImg(file);
        const previewURL = URL.createObjectURL(file); //  create preview URL
        setPreviewImg(previewURL); //  set preview image for immediate display
      
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
        navigate('/');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        const base64Image = reader.result;
        try {
          await updateProfile({ profilePic: base64Image, fullName: name, bio });
          navigate('/');
        } catch (err) {
          console.error('Error updating profile with image:', err);
        }
      };
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input
              onChange = {handleImageChange}              
              type="file"
              id="avatar"
              accept=".png, .jpeg, .jpg, image/*"
              hidden
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : previewImg || assets.avatar_icon}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder='Your name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder='Write profile bio'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          <button
            type='submit'
            className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'
          >
            Save
          </button>
        </form>

        <img
          className='w-44 h-44 rounded-full mx-10 max-sm:mt-10'
          src={selectedImg ? URL.createObjectURL(selectedImg) : previewImg || assets.avatar_icon}

          // src={
          //   selectedImg
          //     ? URL.createObjectURL(selectedImg)
          //     : authUser?.profilePic || assets.logo_icon || previewImg
          // }
          alt="Profile Preview"
        />
      </div>
    </div>
  );
}

export default ProfilePage;

